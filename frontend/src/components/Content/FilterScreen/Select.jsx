import * as React from 'react';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import { BsFillCircleFill } from "react-icons/bs";
const StyledButton = styled('button')`
    font-size: 0.875rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    min-width: 100%;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    text-align: left;
    line-height: 1.5;
    color: #000;

    &.${selectUnstyledClasses.focusVisible} {
        outline: 4px solid rgba(100, 100, 100, 0.3);
    }

    &.${selectUnstyledClasses.expanded} {
        border-radius: 2px;

        &::after {
        content: '▴';
        }
    }

    &::after {
        content: '▾';
        float: right;
    }
    `;

const StyledListbox = styled('ul')`
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background-color: #fff;
  min-width: 300px;
  border: 1px solid #ccc;
  border-top: none;
  color: #000;
`;

const StyledOption = styled(OptionUnstyled)`
  list-style: none;
  padding: 4px 10px;
  margin: 0;
  border-bottom: 1px solid #ddd;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.disabled} {
    color: #888;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: rgba(25, 118, 210, 0.08);
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: #16d;
    color: #fff;
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: #05e;
    color: #fff;
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: #39e;
  }
`;

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

export default function Select({options, setValue, defaultValue}) {
  const handleValueChange = (e) => {
    setValue(e)
  }
    return (
        <CustomSelect value={defaultValue}  onChange={handleValueChange}>
            {options.map((option) => (
                <StyledOption key={option} value={option} > <BsFillCircleFill style={{color: option}}/> {option}</StyledOption>
            ))}
        </CustomSelect>
    );
}