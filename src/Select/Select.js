import React, { Component } from "react";
import AsyncSelect, { components } from "react-select";

import Booleans from "./Booleans";
import { Group, GroupBadge, Option, ValueWrapper as VWrapper } from "./styles";
import { groupedOptions } from "./data";

const { MultiValueContainer } = components;

const formatGroupLabel = ({ label, options }) => (
  <Group>
    <span>{label}</span>
    <GroupBadge>{options.length}</GroupBadge>
  </Group>
);

const styles = {
  option: base => ({
    ...base,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  })
};

export default class extends Component {
  onChangeBoolean = bl => ({ data, selectProps }) =>
    this.setValue(
      selectProps.value.map(
        opt =>
          opt.value === data.value
            ? {
                ...data,
                operator: bl.value
              }
            : opt
      )
    );

  onClickOption = ({ value, hasValue, setValue, getValue }) => {
    this.setValue = setValue;
    setValue([
      ...getValue(),
      {
        value: value,
        label: value,
        type: "option",
        operator: hasValue ? "or" : null
      }
    ]);
  };

  ValueWrapper = props => (
    <VWrapper>
      {props.data.operator && (
        <Booleans onChange={e => this.onChangeBoolean(e)(props)} {...props} />
      )}
      <MultiValueContainer {...props} />
    </VWrapper>
  );

  CustomOption = ({
    innerProps: { onClick, onMouseOver },
    data: { info, value },
    ...props
  }) => (
    <Option onMouseOver={onMouseOver}>
      <input
        checked={props.isSelected}
        onChange={() =>
          props.isSelected ? onClick() : this.onClickOption(props)
        }
        type="checkbox"
      />
      <components.Option {...props}>
        {value} - {info.join("; ")}
      </components.Option>
    </Option>
  );

  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          closeMenuOnSelect={false}
          components={{
            MultiValueContainer: this.ValueWrapper,
            Option: this.CustomOption
          }}
          formatGroupLabel={formatGroupLabel}
          hideSelectedOptions={false}
          isMulti
          onChange={this.onChange}
          options={groupedOptions}
          styles={styles}
          {...this.props}
        />
      </div>
    );
  }
}
