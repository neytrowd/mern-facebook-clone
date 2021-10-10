import React from 'react';
import GoogleLogin from "react-google-login";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {LOGIN} from "../../redux/reducers/authReducer";

export default function GoogleAuth() {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogin = async (googleData) => {
        const login = await axios.post('http://localhost:5000/auth/google', {
            token: googleData.tokenId
        })

        let {token, userId} = login.data;

        dispatch({
            type: LOGIN,
            payload: {id: userId, token}
        })
        localStorage.setItem('auth-token', token);
        history.push('/');
    }

    return (
        <React.Fragment>
            <GoogleLogin
                clientId='472326574840-etec695v5dub7o5ro2bpc8egq3jf9bct.apps.googleusercontent.com'
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
            />
        </React.Fragment>
    )
}