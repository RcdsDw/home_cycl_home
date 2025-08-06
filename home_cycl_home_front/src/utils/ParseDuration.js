import { Tag } from "antd";

export function DurationDisplay({ seconds }) {
  if (typeof seconds !== "number" || isNaN(seconds)) return <span>—</span>;

  const totalMinutes = Math.floor(seconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = Math.floor(totalDays / 30);
  const totalYears = Math.floor(totalMonths / 12);

  const years = totalYears;
  const months = totalMonths % 12;
  const weeks = totalWeeks % 4;
  const days = totalDays % 7;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  const parts = [];

  if (years > 0) parts.push(`${years} années`);
  if (months > 0) parts.push(`${months} mois`);
  if (weeks > 0) parts.push(`${weeks} sem`);
  if (days > 0) parts.push(`${days}j`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes} min`);

  const display = parts.length > 0 ? parts.join(" ") : "0 min";

  return <Tag color="green">{display}</Tag>;
}
