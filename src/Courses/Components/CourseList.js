import React from 'react'

import Swal from 'sweetalert2';

// IMPORTING COURSE COMPONENT
import CourseItems from './CourseItems'

import Card from '../../Shared/Components/UIElement/Card';
import Button from '../../Shared/Components/FormElements/Button';

import './NewCourse.css'

const CourseList = (props) => {
    if (props.item.length === 0) {
        return (
            <div className="center">
                <Card className="">
                    <h2>No courses found. Maybe create one?</h2>
                    <Button className='text-decoration-none' s to="/courses/new">Add Course</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul>
            {
                props.item.map(
                    data => <CourseItems
                        key={data.id}
                        id={data.id}
                        creator={data.creator}
                        title={data.title}
                        lecturer={data.lecturer}
                        description={data.description}
                        onDelete={props.onDeleteCourse}
                    />
                )
            }
        </ul>
    )
}

export default CourseList
