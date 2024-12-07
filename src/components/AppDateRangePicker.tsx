import { DatePicker } from "antd";

type Props = {
  label: string;
};

const AppDateRangePicker = ({ label }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <DatePicker.RangePicker />
    </div>
  );
};

export { AppDateRangePicker };
