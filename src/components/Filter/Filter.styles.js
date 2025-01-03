import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
`;

export const FilterTitleHeader = styled.div`
  font-size: 35px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  color: #405880; // 네이비로 변경
`;

export const LocationSection = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const SelectBox = styled.div`
  padding: 8px 16px;
  border: 1px solid #2B4570; // 네이비로 변경
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2B4570; // 네이비로 변경
  cursor: pointer;
  background: white;
  min-width: 160px;

  svg {
    color: #E97132; // 오렌지로 변경
  }

  &:hover {
    background: #f5f5f5;
  }
`;

export const RefreshButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFCF9D; // 세이지 그린으로 변경

  &:hover {
    color: #FFCF9D;
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 32px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

// 응급실, 중환자실, 장비 색상
export const FilterTitle = styled.div`
  padding: 8px 20px;
  background: #405880; // 네이비로 변경
  color: white;
  border-radius: 8px;
  font-weight: 500;
`;

// 필터링 검색 페이지 '전체선택 버튼'
export const SelectAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #E97132; 
  border-radius: 8px;
  background: white;
  color: #E97132; 
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: auto;

  &:hover {
    background: #f5b695;
  }
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  padding: 10px;
`;

export const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 8px;
  border-bottom: 1px solid #E2E8F0;
  gap: 8px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
  cursor: pointer;
  accent-color: #E97132; // 세이지 그린으로 변경
`;

export const Label = styled.label`
  font-size: 14px;
  color: #2B4570; // 네이비로 변경
  cursor: pointer;
  display: flex;
  align-items: center;
`;

// 검색 버튼
export const SearchButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #405880; // 메인 오렌지로 변경
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #2B4570;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const LocationIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #E97132; // 오렌지로 변경

  &::before {
    content: "📍";
  }
`;

export const RefreshIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #7EB09B; // 세이지 그린으로 변경
  background-image: url('/images/refresh.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #2B4570;
  border-radius: 8px;
  margin-top: 4px;
  z-index: 1000;
`;

export const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  color: #2B4570;

  &:hover {
    background: #f5f5f5;
  }
`;

export const SelectBoxContainer = styled.div`
  position: relative;  // 드롭다운 포지셔닝을 위해 필요
  z-index: 1000;      // 다른 요소들 위에 표시되도록
`;