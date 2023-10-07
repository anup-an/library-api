import { Select } from "@chakra-ui/react";
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
}

const Dropdown = (props: IProps) => {
  const { selectConfig, handleSelect } = props;

  const selectOption = (event: any) => {
    event.preventDefault();
    handleSelect({
      optionKey: selectConfig.value,
      value: event.target.value,
    });
  };
  return (
    <div className="select">
      <Select onChange={selectOption} name={selectConfig.name} borderColor="black">
        <option value="" selected disabled hidden>Select an option</option>
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
