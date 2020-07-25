import React, { useContext } from 'react'

import Swal from 'sweetalert2';

import { useHistory } from 'react-router-dom';

// IMPORTING CSS
import './NewCourse.css';

// IMPORTING INPUT COMPONENT FROM SHARED FOLDER
import Input from '../../Shared/Components/FormElements/Input';
import Button from '../../Shared/Components/FormElements/Button';

import ErrorModel from '../../Shared/Components/UIElement/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner'

import { useHttpClient } from '../../Shared/Hooks/http-hook'

import { AuthContext } from '../../Shared/Context/auth-context';

// IMPORTING FROM THE UTILS FOLDER
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../Shared/Util/validators'

// IMPORTING HOOKS
import { useForm } from '../../Shared/Hooks/form-hook';


const NewCourse = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        lecturer: {
            value: '',
            isValid: false
        }
    }, false)

    const history = useHistory();


    const placeSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(formState.inputs); // send this to the backend!
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + '/courses', 'POST', JSON.stringify({
                title: formState.inputs.title.value,
                lecturer: formState.inputs.lecturer.value,
                description: formState.inputs.description.value,
                creator: auth.userId   //ljjjjjjjjjjjjjjjjj
            }),
                { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token }
            )
            console.log(auth.userId);
            history.push('/');
        } catch (err) { }
    }


    // THIS IS THE MODAL FOR SHOWING ERROR ON COURES UPDATE
    if (error) {
        Swal.fire(error);
    }


    return (
        <React.Fragment>
            <form className="course-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                />

                <Input
                    id="lecturer"
                    element="input"
                    type="text"
                    label="Lecturer"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter the course lecturer's name."
                    onInput={inputHandler}
                />

                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (at least 5 characters)."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD COURSE
            </Button>
            </form>
        </React.Fragment>
    )
}

export default NewCourse
