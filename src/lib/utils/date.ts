import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export const formatDate = (date: Date | string, format = "YYYY년 MM월 DD일") =>
  dayjs(date).format(format);

export const timeForToday = (date: Date | string) => {
  const today = new Date();
  const dateValue = new Date(date);

  const betweenTime = Math.floor(
    (today.getTime() - dateValue.getTime()) / 1000 / 60,
  );
  if (betweenTime < 1) return "방금 전";
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeHour < 7) {
    return `${betweenTimeDay}일 전`;
  }
  return formatDate(dateValue, "YYYY.MM.DD");
};

export const formatTime = (date: string) => {
  const newDate = new Date(date);
  let hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  const period = hours >= 12 ? "오후" : "오전";
  hours = hours % 12 || 12;

  return `${period} ${hours}시 ${minutes}분`;
};
