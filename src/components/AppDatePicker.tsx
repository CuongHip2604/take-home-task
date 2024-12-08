import { DatePicker, DatePickerProps } from "antd";

interface Props extends DatePickerProps {
  label: string;
}

const AppDatePicker = ({ label, ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <DatePicker {...rest} />
    </div>
  );
};

export { AppDatePicker };
