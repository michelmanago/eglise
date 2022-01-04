import {useState} from 'react';

export default function Checkbox({className, value, pjId, updateParent}) {
    const [checkValue, setCheckValue] = useState(value ? value : false);
    const handleCheck = event => {
        //event.preventDefault();
        if (updateParent) updateParent(event.target.checked, pjId);
        setCheckValue(event.target.checked);
    };
    return (
        <input
            className={className ? className : ''}
            type="checkbox"
            onChange={handleCheck}
            defaultChecked={checkValue}
        />
    );
}
