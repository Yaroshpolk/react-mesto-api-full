import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';


const ProtectedRoute = ({ component: Component, ...props }) => {
    const data = React.useContext(AppContext);

    return (
        <Route>
            {() =>
                data.loggedIn ? <Component {...props} /> : <Redirect to='/login' />
            }
        </Route>
    );
};

export default ProtectedRoute;