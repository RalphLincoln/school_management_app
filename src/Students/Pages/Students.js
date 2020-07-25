import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';

import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner';

import { useHttpClient } from '../../Shared/Hooks/http-hook';

// IMPORTING FROM THE STUDENT FOLDER
import StudentsList from '../Components/StudentsList';

const Students = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedStudent, setloadedStudent] = useState();

    useEffect(() => {
        const fetchStudents = async () => {

            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/students');

                setloadedStudent(responseData.students);
            } catch (err) { }
        };
        fetchStudents();
    }, [sendRequest])

    // const errorHandler = () => {
    //     setError(null);
    // }

    console.log(loadedStudent)


    // THIS IS THE MODAL FOR SHOWING ERROR ON COURES UPDATE
    if (error) {
        Swal.fire(error);
    }


    return (
        <React.Fragment>
            {isLoading &&
                <div className='text-center mt-5'>
                    <LoadingSpinner />
                </div>}
            {!isLoading && loadedStudent && <StudentsList item={loadedStudent} />}
        </React.Fragment>
    )
}

export default Students;

