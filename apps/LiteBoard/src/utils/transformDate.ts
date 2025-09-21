// 날짜 변환 유틸리티 함수
export const transformDate = (isoString: string): Date => {
  try {
    // YYYY-MM-DD 형식을 로컬 시간대로 정확히 파싱
    if (/^\d{4}-\d{2}-\d{2}$/.test(isoString)) {
      const [year, month, day] = isoString.split('-').map(Number) as [number, number, number];
      // 명시적으로 로컬 시간대 정오(12:00)로 설정하여 시간대 변환 문제 방지
      return new Date(year, month - 1, day, 12, 0, 0, 0);
    }

    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date string: ${isoString}`);
    }

    return date;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to parse ISO date string: ${isoString}`);
  }
};
