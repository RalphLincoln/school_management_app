import React, { useState, useCallback, useEffect } from 'react';
import './App.css';

// IMPORTING REACT ROUTER DOM
import { Route, Switch, Redirect } from 'react-router-dom';

// IMPORTING FROM SHARED COMPONENTS
import Navbar from './Shared/Components/Navigation/Navbar';

// IMPORTING PAGES FROM STUDENTS
import Students from './Students/Pages/Students';
import Authenticate from './Students/Pages/Authenticate';

// IMPORTING PAGES FROM COURSES
import UserCourses from './Courses/Pages/UserCourses';
import UpdateCourse from './Courses/Pages/UpdateCourse';
import NewCourse from './Courses/Pages/NewCourse';

// IMPORTING CONTEXT
import { AuthContext } from './Shared/Context/auth-context';


let logOutTime;


function App() {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);



  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid)
    const tokenExpirationDate = expirationDate || new Date(new Date.getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem(
      'userData',
      JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationDate.toISOString() })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null);
    setTokenExpirationDate(null);
    // TO ENSURE WE STAY LOGGED OUT WHEN WE LOG OUT
    localStorage.removeItem('userData')
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date.getTime();
      logOutTime = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logOutTime)
    }
  }, [token, logout, tokenExpirationDate])

  // ENSURING USER STAYS LOGGED IN AFTER PAGE RELOAD
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);


  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/" component={Students} />
        <Route exact path="/:uid/courses" component={UserCourses} />
        <Route exact path="/courses/new" component={NewCourse} />
        <Route exact path="/courses/:courseId" component={UpdateCourse} />
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Students} />
        <Route exact path="/:uid/courses" component={UserCourses} />
        <Route exact path='/auth' component={Authenticate} />
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <div className="App text-secondary">
      <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }} >
        <Navbar />
        {routes}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
