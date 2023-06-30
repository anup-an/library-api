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
  handleSelect: (selectedOption: {optionKey: string, value: any}) => void;
}

const Select = (props: IProps) => {
  const { selectConfig, handleSelect } = props;

  const selectOption = (event: any) => {
    event.preventDefault()
    handleSelect({
          optionKey: selectConfig.value,
          value: event.target.value
        })
  }
  return (
    <div className="select">
      <select
        onChange={selectOption}
        name={selectConfig.name}
      >
        {selectConfig.options.map((option) => (
          <option value={JSON.stringify(option.value)} key={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
