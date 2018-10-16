import React from 'react'
import AsyncSelect, { components } from 'react-select'

import Operators from './Operators'
import {
  Group,
  GroupBadge,
  Option as StyledOption,
  ValueWrapper as StyledValue,
} from './styles'

const { MultiValueContainer: RSContainer, Option: RSOption } = components

const formatGroupLabel = ({ description, options }) => (
  <Group>
    <span>{description}</span>
    <GroupBadge>{options.length}</GroupBadge>
  </Group>
)

const styles = {
  valueContainer: base => ({
    ...base,
    overflow: 'visible',
  }),
  option: base => ({
    ...base,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
}

const onChangeBoolean = (
  { data, selectProps: { value = [] }, setValue },
  { value: operator }
) =>
  setValue(
    value.map(
      o =>
        o.value === data.value
          ? {
              ...data,
              operator,
            }
          : o
    )
  )

const onClickOption = ({ value, hasValue, setValue, getValue }) =>
  setValue([
    ...getValue(),
    {
      num: value,
      operator: hasValue && 'OR',
      value,
    },
  ])

const MultiValueContainer = props => (
  <StyledValue>
    {props.data.operator && (
      <Operators onChange={e => onChangeBoolean(props, e)} {...props} />
    )}
    <RSContainer {...props} />
  </StyledValue>
)

const Option = ({
  innerProps: { onClick, onMouseOver },
  data: { info = [] },
  isSelected,
  value,
  ...props
}) => (
  <StyledOption onMouseOver={onMouseOver}>
    <input
      type="checkbox"
      checked={isSelected}
      onChange={() => (isSelected ? onClick() : onClickOption(props))}
    />
    <RSOption {...props}>
      {value} - {info.join('; ')}
    </RSOption>
  </StyledOption>
)

const getNum = ({ num }) => num

export default props => (
  <AsyncSelect
    isMulti
    cacheOptions
    closeMenuOnSelect={false}
    hideSelectedOptions={false}
    components={{ MultiValueContainer, Option }}
    formatGroupLabel={formatGroupLabel}
    getOptionLabel={getNum}
    getOptionValue={getNum}
    styles={styles}
    {...props}
  />
)
