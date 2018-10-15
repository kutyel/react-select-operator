import React, { Component } from "react";
import AsyncSelect, { components } from "react-select";

import Booleans from "./Booleans";
import { Group, GroupBadge, Option, ValueWrapper as VWrapper } from "./styles";

const { MultiValueContainer } = components;

const formatGroupLabel = ({ description, options, ...props }) => (
  <Group>
    <span>{description}</span>
    <GroupBadge>{options.length}</GroupBadge>
  </Group>
);

const styles = {
  valueContainer: base => ({
    ...base,
    overflow: "visible"
  }),
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
        num: value,
        operator: hasValue ? "OR" : null,
        value: value
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
    data: { info },
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
        {props.value} - {info.join("; ")}
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
          getOptionLabel={option => option.num}
          getOptionValue={option => option.num}
          hideSelectedOptions={false}
          isMulti
          styles={styles}
          {...this.props}
        />
      </div>
    );
  }
}
