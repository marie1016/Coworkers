import moment from "moment";
import "moment/locale/ko";

export const formattedDate = (date: Date | string) =>
  moment(date).format("YYYY년 MM월 DD일");

export const formattedShortDate = (date: string) =>
  moment(date).format("YYYY.MM.DD");

export const formattedTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? "오후" : "오전";
  hours = hours % 12 || 12;

  return `${period} ${hours}시 ${minutes}분`;
};
