import React, { useState, useEffect, useCallback } from 'react';
import * as S from './HospitalCard.styles';
import HospitalCardItem from './HospitalCardItem';
import { useGeoLocation } from '../GeoLocation/GeoLocation';
import { useLocation, useNavigate } from 'react-router-dom';

const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: false,
    timeout: 1000 * 15,
    maximumAge: 1000 * 60 * 5 * 10
};

const API_BASE_URL = 'http://localhost:8080';

const HospitalCard = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { location: geoLocation, error: locationError } = useGeoLocation(GEOLOCATION_OPTIONS);
    const location = useLocation();
    const navigate = useNavigate();

    console.log("받은 hospitalData:", location.state?.hospitalData);
    
    const getAuthHeaders = useCallback(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('인증 토큰이 없습니다.');
        }
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }, []);

    const handleApiError = useCallback((error) => {
        console.error('API Error:', error);
        if (error.message.includes('인증')) {
            localStorage.removeItem('accessToken');
            navigate('/login', { state: { from: location } });
        }
        setError(error.message);
        setLoading(false);
    }, [navigate, location]);

    const fetchHospitals = useCallback(async (lat, lon) => {
        try {
            setLoading(true);
            const response = await fetch(
                `${API_BASE_URL}/hospital/distance?lat=${lat}&lon=${lon}&range=50`,
                {
                    method: 'POST',
                    headers: getAuthHeaders()
                }
            );

            const data = await response.json();
            
            if (data.status === 200 && Array.isArray(data.result)) {
                setHospitals(data.result);
            } else {
                throw new Error(data.message || '병원 정보를 가져오는데 실패했습니다');
            }
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }, [getAuthHeaders, handleApiError]);

    const getCurrentPatient = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/reservation`, {
                method: 'GET',
                headers: getAuthHeaders()
            });
    
            const data = await response.json();
            console.log("환자 정보 전체 응답:", data);
            console.log("환자 정보 result:", data.result);
            console.log("환자 정보 result 타입:", typeof data.result);
            
            if (!response.ok || data.status !== 200) {
                throw new Error(data.message || '환자 정보를 가져오는데 실패했습니다');
            }
    
            if (Array.isArray(data.result)) {
                if (data.result.length > 0) {
                    return data.result[0].patientconditionid;
                }
                throw new Error('환자 정보가 없습니다');
            }
            
            if (data.result && typeof data.result === 'object') {
                return data.result.patientconditionid || data.result.patientConditionId;
            }
    
            throw new Error('환자 정보 형식이 올바르지 않습니다');
        } catch (error) {
            console.error("환자 정보 조회 중 에러:", error);
            handleApiError(error);
            throw error;
        }
    }, [getAuthHeaders, handleApiError]);
    
    const handleReservation = useCallback(async (hospitalId) => {
        try {
            const patientConditionId = await getCurrentPatient();
            console.log("받아온 환자 상태 ID:", patientConditionId);
            
            if (!patientConditionId) {
                throw new Error('환자 상태 ID를 가져올 수 없습니다');
            }
            
            const response = await fetch(`${API_BASE_URL}/hospital/reserve`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    patientconditionId: patientConditionId,
                    hospitalId: hospitalId
                })
            });
    
            const data = await response.json();
            console.log("예약 응답:", data);
            
            if (!response.ok || data.status !== 200) {
                throw new Error(data.message || '예약 처리 중 오류가 발생했습니다');
            }
    
            return { success: true };
    
        } catch (error) {
            console.error("예약 처리 중 에러:", error);
            handleApiError(error);
            throw error;
        }
    }, [getAuthHeaders, handleApiError, getCurrentPatient]);

    useEffect(() => {
        // hospitalData가 있으면 hospitals state를 업데이트하지 않음
        if (location.state?.hospitalData) {
            setLoading(false);
            return;
        }

        // 기존 로직
        if (location.state?.hospitals) {
            setHospitals(Array.isArray(location.state.hospitals) ? location.state.hospitals : []);
            setLoading(false);
        } else if (geoLocation) {
            fetchHospitals(geoLocation.latitude, geoLocation.longitude);
        }
    }, [geoLocation, location.state, fetchHospitals]);

    if (locationError) {
        return <div>위치 정보를 가져오는데 실패했습니다: {locationError}</div>;
    }

    if (!geoLocation && !location?.state?.hospitals && !location?.state?.hospitalData) {
        return <div>위치 정보를 가져오는 중...</div>;
    }

    if (loading) {
        return <div>병원 정보를 불러오는 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // hospitalData가 있으면 단일 병원 카드만 렌더링
    if (location.state?.hospitalData) {
        const hospitalData = location.state.hospitalData;
        return (
            <S.CardsContainer>
                <HospitalCardItem
                    key={hospitalData.hospitalId}
                    hospitalData={hospitalData}
                    onReservation={() => handleReservation(hospitalData.hospitalId)}
                />
            </S.CardsContainer>
        );
    }

    // 그 외의 경우 hospitals 배열을 렌더링
    return (
        <S.CardsContainer>
            {hospitals.map((hospital, index) => (
                <HospitalCardItem
                    key={hospital.hospitalId || index}
                    hospitalData={hospital}
                    onReservation={() => handleReservation(hospital.hospitalId)}
                />
            ))}
        </S.CardsContainer>
    );
};

export default HospitalCard;