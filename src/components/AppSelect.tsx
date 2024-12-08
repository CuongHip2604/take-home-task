import { Select, SelectProps, Spin } from "antd";

interface Props extends SelectProps {
  label: string;
  isFetching?: boolean;
}

const AppSelect = ({
  label,
  options,
  onPopupScroll,
  isFetching,
  ...rest
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <Select
        className="w-full"
        placeholder="Select Headquarter"
        onPopupScroll={onPopupScroll}
        {...rest}
      >
        {options?.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}

        {isFetching && (
          <Select.Option disabled={true} value="loading">
            <div className="flex justify-center items-center">
              <Spin />
            </div>
          </Select.Option>
        )}
      </Select>
    </div>
  );
};

export { AppSelect };
