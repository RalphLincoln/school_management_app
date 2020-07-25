import React from 'react'

import './student.css'

// IMPORTING FROM REACT-ROUTER-DOM
import { Link } from 'react-router-dom';

const StudentsItem = (props) => {
    return (
        <li className='list-unstyled'>
            {/* THIS WILL LINK TO A SPECIFIC PAGE SHOW DETAILED INFORMATION OF THE USER */}
            <Link className='text-decoration-none p-2 m-3 text-secondary' to={`/${props.id}/courses`}>
                <h2>{props.name}</h2>
                <h3 className='font-weight-bold'>
                    {props.courseCount} {props.courseCount === 1 ? 'Course registered' : 'Courses registered'}
                </h3>
            </Link>
        </li>
    )
}

export default StudentsItem
