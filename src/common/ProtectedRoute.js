import React from 'react';
import {useCookies} from 'react-cookie';
import {Route, Redirect} from 'react-router-dom';
import {typeUtils} from './type-utils';


function useIsPhoneValidated() {
    const [cookies, setCookies] = useCookies(['_sessionId']);
    const cookieValue = cookies['_sessionId'];
    return !typeUtils.isNullOrUndefined(cookieValue) && cookieValue.length > 0;
};

export const ProtectedRoute = ({component: Component, phoneNumber, ...rest}) => {
    const isUserAuthenticated = useIsPhoneValidated();

    return <Route
        {...rest}
        render=
            {
            props => isUserAuthenticated ? (<Component {...rest} />) :
                (
                    <Redirect to={{
                            pathname: '/auth',
                            state: {from: props.location}
                        }}
                    />
                )
            }
    />
};
