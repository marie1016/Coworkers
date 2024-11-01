import moment from "moment";
import "moment/locale/ko";

export const formattedDate = (date: Date | string) =>
  moment(date).format("YYYY년 MM월 DD일");

export const formattedShortDate = (date: string) =>
  moment(date).format("YYYY.MM.DD");
