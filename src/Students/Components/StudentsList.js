import React from 'react'
import StudentsItem from './StudentsItem'

import './student.css';

const StudentsList = (props) => {
    if (props.item.length === 0) {
        return (

            <h4 className='student-form mt-5'>No Student is registered yet</h4>
        )
    }

    return (
        <React.Fragment>
            <h1 className='font-weight-bold text-center'>List of registered students!!!!!</h1>
            <ul>
                {
                    props.item.map(data => <StudentsItem key={data.id} id={data.id} name={data.name} courseCount={data.courses.length} />)
                }
            </ul>
        </React.Fragment>
    )
}

export default StudentsList
