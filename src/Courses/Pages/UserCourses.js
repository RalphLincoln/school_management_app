import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';

// IMPORTING FROM REACT ROUTER DOM
import { useParams } from 'react-router-dom'

// IMPORTING THE COURSE COMPONENT
import CourseList from '../Components/CourseList';

import { useHttpClient } from '../../Shared/Hooks/http-hook';
import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner';

import './NewCourse.css';




const UserCourses = () => {
    const [loadedCourses, setLoadedCourses] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId = useParams().uid;

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/courses/user/${userId}`);
                setLoadedCourses(responseData.courses);
            } catch (err) { }
        };
        fetchCourses();
    }, [sendRequest, userId]);

    const courseDeletedHandler = (deletedCourseId) => {
        setLoadedCourses(prevCourses => prevCourses.filter(course => course.id !== deletedCourseId))
    }


    // THIS IS THE MODAL FOR SHOWING ERROR ON COURES UPDATE
    if (error) {
        Swal.fire(error);
    }


    return (
        <React.Fragment className="course-form">
            {isLoading && (
                <div className='text-center mt-5'>
                    <LoadingSpinner />
                </div>)}
            {!isLoading && loadedCourses &&
                <CourseList onDeleteCourse={courseDeletedHandler} item={loadedCourses} />}
            {!isLoading && (loadedCourses === 0) &&
                <h2>You have no registered courses, please do register!!!</h2>
            }
        </React.Fragment>)
}



export default UserCourses
