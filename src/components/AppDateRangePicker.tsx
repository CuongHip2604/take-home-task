import { DatePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";

interface Props extends RangePickerProps {
  label: string;
}

const AppDateRangePicker = ({ label, ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <DatePicker.RangePicker {...rest} />
    </div>
  );
};

export { AppDateRangePicker };
