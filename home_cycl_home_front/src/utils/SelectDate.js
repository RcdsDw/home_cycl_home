import { DatePicker, message } from "antd";
import dayjs from "dayjs";

export default function SelectDate({ form, selectedTypeIntervention }) {
  const handleChange = (value) => {
    if (!value || !selectedTypeIntervention) {
      message.error(
        "Veuillez selectionner le type d'intervention avant de choisir la date.",
      );
      return;
    }

    const durationInMinutes = selectedTypeIntervention?.duration / 60;
    const selectedEnd = value.add(durationInMinutes, "minute");

    form.setFieldsValue({
      start_date: value.format("YYYY-MM-DD HH:mm"),
      end_date: selectedEnd.format("YYYY-MM-DD HH:mm"),
    });
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const disabledTime = () => ({
    disabledHours: () => {
      const hours = [];
      for (let i = 0; i < 24; i++) {
        if (i < 8 || i >= 18) {
          hours.push(i);
        }
      }
      return hours;
    },
  });

  return (
    <DatePicker
      showTime={{ format: "HH" }}
      format="DD/MM/YYYY HH:mm"
      onChange={handleChange}
      disabled={!selectedTypeIntervention}
      disabledDate={disabledDate}
      disabledTime={disabledTime}
      style={{ width: "100%" }}
      placeholder="Date de début"
    />
  );
}
