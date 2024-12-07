import { DatePicker } from "antd";

type Props = {
  label: string;
};

const AppDatePicker = ({ label }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <DatePicker />
    </div>
  );
};

export { AppDatePicker };
