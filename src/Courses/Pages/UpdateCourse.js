import React, { useEffect, useState, useContext } from 'react';

// IMPORTING FROM REACT ROUTER DOM
import { useParams, useHistory } from 'react-router-dom';



// IMPORTING FROM UTILS FROM SHARED
import Input from '../../Shared/Components/FormElements/Input';
import Button from '../../Shared/Components/FormElements/Button';
import Card from '../../Shared/Components/UIElement/Card';
import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner';
import ErrorModal from '../../Shared/Components/UIElement/ErrorModal';


// IMPORTING HOOKS FROM SHARED FOLDER
import { useForm } from '../../Shared/Hooks/form-hook';

// IMPORTING FROM VALIDATORS
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../Shared/Util/validators';

import { useHttpClient } from '../../Shared/Hooks/http-hook';
import { AuthContext } from '../../Shared/Context/auth-context'

import './NewCourse.css'
import Swal from 'sweetalert2';



const UpdateCourse = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const courseId = useParams().courseId;
    const history = useHistory();


    const [formState, inputHandler, setFormData] = useForm({
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
    }, false);

    console.log(courseId)

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/courses/${courseId}`
                );
                setLoadedPlace(responseData.course);
                setFormData(
                    {
                        title: {
                            value: responseData.course.title,
                            isValid: true
                        },
                        lecturer: {
                            value: responseData.course.lecturer,
                            isValid: true
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true
                        }
                    },
                    true
                );

            } catch (err) { }
        };
        fetchCourse();
    }, [sendRequest, courseId, setFormData])


    const courseUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/courses/${courseId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    lecturer: formState.inputs.lecturer.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push('/' + auth.userId + '/places');
        } catch (err) { }
    };




    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <LoadingSpinner />
            </div>
        );
    }


    // THIS IS THE MODAL FOR SHOWING ERROR ON COURES UPDATE
    if (error) {
        Swal.fire(error);
    }


    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find course!</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            {!isLoading && loadedPlace && (
                <form onSubmit={courseUpdateSubmitHandler} className='course-form' action="">
                    <Input
                        id='title'
                        element='input'
                        errorText='Please enter a valid title.'
                        onInput={inputHandler}
                        initialValue={loadedPlace.title}
                        initialValid={true}
                        type='text'
                        label='Title'
                        validators={[VALIDATOR_REQUIRE()]} />


                    <Input
                        id='lecturer'
                        element='input'
                        errorText='Please enter the course lecturer name.'
                        onInput={inputHandler}
                        initialValue={loadedPlace.lecturer}
                        initialValid={true}
                        type='text'
                        label='Lecturer'
                        validators={[VALIDATOR_REQUIRE()]} />


                    <Input
                        id='description'
                        element='textarea'
                        errorText='Please enter a valid description (min 5 characters).'
                        onInput={inputHandler}
                        initialValue={loadedPlace.description}
                        initialValid={true}
                        type='text'
                        label='Description'
                        validators={[VALIDATOR_MINLENGTH(5)]} />


                    <Button type='submit' disabled={!formState.isValid}>UPDATE COURSE</Button>
                </form>
            )}
        </React.Fragment>
    )
}
export default UpdateCourse
