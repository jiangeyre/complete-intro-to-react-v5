import React, { useState, FunctionComponent } from 'react';

const useDropDownPrac = (label: string, defaultState: string, options: string[]) => {
    const [state, updateState] = useState(defaultState);
    const id = `use-dropdown-prac-${label.replace(" ", "").toLowerCase()}`;
    const DropdownPrac: FunctionComponent = () => {
        <label htmlFor={id}>
            {label}
            <select
                id={id}
                value={state}
                onChange={e => updateState(e.target.value)}
                onBlur={e => updateState(e.target.value)}
                disabled={options.length === 0}
                >
                <option>All</option>
                {options.map(item => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </label>
    };

    return [state, DropdownPrac, updateState];
}

export default useDropDownPrac;