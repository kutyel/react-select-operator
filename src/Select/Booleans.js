import React from "react";
import Select, { components } from "react-select";

const operators = [
  { value: "OR", label: "⚪ OR" },
  { value: "AND", label: "🔵 AND" },
  { value: "NOT", label: "🔴 NOT" }
];

const styles = {
  control: () => ({
    border: "1px solid grey",
    borderRadius: "50px",
    display: "flex",
    fontSize: "10px",
    height: "23px",
    width: 100
  }),
  singleValue: () => ({
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    width: "100%"
  })
};

const SingleValue = ({ data: { value }, ...props }) => (
  <components.SingleValue {...props}>{value}</components.SingleValue>
);

const CustomOption = ({
  innerProps: { onClick, onMouseOver },
  data: { info, value },
  ...props
}) => <components.Option {...props} />;

const IndicatorSeparator = false;

export default props => (
  <Select
    defaultValue={operators[0]}
    components={{ SingleValue, IndicatorSeparator }}
    isClearable={false}
    isSearchable={false}
    options={operators}
    styles={styles}
    {...props}
  />
);
