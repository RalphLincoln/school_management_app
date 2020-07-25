import React, { useContext, useState } from 'react'

import Swal from 'sweetalert2';

import { AuthContext } from '../../Shared/Context/auth-context';

// IMPORTING SHARED BUTTON COMPONENT
import Button from '../../Shared/Components/FormElements/Button'
import Card from '../../Shared/Components/UIElement/Card';
import Modal from '../../Shared/Components/UIElement/Modal';
import Map from '../../Shared/Components/UIElement/Map';
import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner';
import ErrorModal from '../../Shared/Components/UIElement/ErrorModal';
import { useHttpClient } from '../../Shared/Hooks/http-hook'

import './PlaceItem.css';
import './NewCourse.css'

const CourseItems = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);



    const showDeleteWarningHandler = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to proceed and delete this place? Please note that it can not be undone thereafter.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                confirmDeleteHandler();
            } else {
                cancelDeleteHandler();
            }
        })
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () => {
        console.log('DELETING...............')
        setShowConfirmModal(true);
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/courses/${props.id}`,
                'DELETE',
                null,
                { Authorization: 'Bearer ' + auth.token }
            );
            props.onDelete(props.id);
        } catch (err) { }
    };
    return (
        <React.Fragment>
            <li className=" list-unstyled">
                <Card className="place-item__content course-form">
                    {isLoading && <LoadingSpinner asOverlay />}

                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        {auth.userId === props.creator && (
                            <Button to={`/courses/${props.id}`}>EDIT</Button>
                        )}

                        {auth.userId === props.creator && (
                            <Button danger onClick={showDeleteWarningHandler}>
                                DELETE
                            </Button>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default CourseItems
