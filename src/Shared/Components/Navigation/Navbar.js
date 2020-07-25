import React, { useContext } from 'react'

// IMPORTING FROM REACT-ROUTER-DOM
import { Link } from 'react-router-dom';

// IMPORTING ICON FROM REACT-ICON
import { FaAlignRight } from 'react-icons/fa';

// IMPORTING CONTEXT
import { AuthContext } from '../../Context/auth-context';

const Navbar = () => {

    const auth = useContext(AuthContext)
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link className='text-decoration-none' to='/'>
                <h1 className="font-weight-bold text-secondary">MySChOOL</h1>
            </Link>
            <button style={{ borderStyle: 'none !important' }} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <FaAlignRight className='links' />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav pl-3 pr-3 font-weight-bold ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link links text-uppercase pr-5" to='/'>
                            Home
                        </Link>
                    </li>

                    {!auth.isLoggedIn &&
                        (<li className="nav-item">
                            <Link className="nav-link links text-uppercase pr-5" to='/auth'>
                                Login
                        </Link>
                        </li>)
                    }

                    {auth.isLoggedIn &&
                        (<li className="nav-item">
                            <Link className="nav-link links text-uppercase pr-5" to={`/${auth.userId}/courses`}>
                                My Courses
                        </Link>
                        </li>)
                    }

                    {auth.isLoggedIn &&
                        (<li className="nav-item">
                            <Link className="nav-link links text-uppercase pr-5" to='/courses/new'>
                                Add Course
                        </Link>
                        </li>)
                    }
                </ul>
                {auth.isLoggedIn &&
                    <li className='text-decoration-none list-unstyled'>
                        <button className='btn font-weight-bold text-secondary' onClick={auth.logout} >LOGOUT</button>
                    </li>
                }
            </div>
        </nav>
    )
}

export default Navbar
