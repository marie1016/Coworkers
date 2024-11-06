export enum FrequencyType {
  ONCE = "ONCE",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export const getFrequencyLabel = (value: FrequencyType) => {
  switch (value) {
    case FrequencyType.ONCE:
      return "한 번";
    case FrequencyType.DAILY:
      return "매일";
    case FrequencyType.WEEKLY:
      return "주 반복";
    case FrequencyType.MONTHLY:
      return "월 반복";
    default:
      return "반복 안함";
  }
};
