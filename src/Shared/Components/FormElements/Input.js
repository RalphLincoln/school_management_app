import React, { useReducer, useEffect } from 'react'

import './Input.css';

// IMPORTING FROM THE UTILS FOLDER
import { validate } from '../../Util/validators';


const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            }
        }
        default:
            return state;
    }
}

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, { value: props.initialValue || '', isValid: props.initialValid || false, isTouched: false });

    const changeHandler = (e) => {
        dispatch({ type: 'CHANGE', val: e.target.value, validators: props.validators });
    };

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput])

    const touchHandler = (e) => {
        dispatch({ type: 'TOUCH' })
    }


    const element = props.element === 'input' ? <input id={props.id} value={inputState.value} type={props.type} onBlur={touchHandler} onChange={changeHandler} placeholder={props.placeholder} /> :
        <textarea id={props.id} value={inputState.value} onChange={changeHandler} onBlur={touchHandler} row={props.rows || 3} />
    return (
        <div className={`form-controls ${!inputState.isValid && inputState.isTouched && 'form-controls--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )
}

export default Input
