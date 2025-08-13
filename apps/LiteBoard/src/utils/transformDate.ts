// 날짜 변환 유틸리티 함수
export const transformDate = (isoString: string): Date => {
  try {
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
