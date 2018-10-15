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
    overflow: "visible",
    width: 100
  }),
  singleValue: base => ({
    ...base,
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
