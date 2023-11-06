import { Select, Text } from "@chakra-ui/react";
import "./Select.scss";

export interface Option {
  name: string;
  value: any;
  default?: boolean;
}

export interface SelectOption {
  name: string;
  value: string;
  options: Option[];
}

interface IProps {
  selectConfig: SelectOption;
  handleSelect: (selectedOption: { optionKey: string; value: any }) => void;
  disabled: boolean;
  defaultValue: any;
}

const Dropdown = (props: IProps) => {
  const { selectConfig, handleSelect, disabled, defaultValue } = props;

  const selectOption = (event: any) => {
    event.preventDefault();
    handleSelect({
      optionKey: selectConfig.value,
      value: event.target.value,
    });
  };

  return (
    <div className="select">
      <Text fontSize="16px">{selectConfig.name}</Text>
      <Select
        onChange={selectOption}
        borderColor="black"
        isDisabled={disabled}
        defaultValue={JSON.stringify(defaultValue)}
      >
        <option value="" disabled hidden>
          {selectConfig.name}
        </option>
        {selectConfig.options.map((option) => (
          <option value={JSON.stringify(option.value)} key={option.name}>
            {option.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
