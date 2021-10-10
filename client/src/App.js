import React, {useEffect} from 'react';
import './App.css';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import AddPost from "./pages/AddPost";
import ChangePost from "./pages/ChangePost";
import Friends from "./pages/Friends";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AddFriends from "./pages/AddFriends";
import NotImplemented from "./pages/NotImplemented";
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {Route, Switch} from 'react-router-dom';
import UserContext from './context/userContext';
import {useDispatch, useSelector} from "react-redux";
import {LOGIN} from "./redux/reducers/authReducer";
import {LOAD} from "./redux/reducers/usersReducer";
import axios from "axios";


function App() {
    const dispatch = useDispatch();
    const userData = useSelector(store => store.auth);
    const theme = createTheme({palette: {type: 'dark'}});

    const loadUsers = async () => {
        let users = await axios.post('http://localhost:5000/user/getAllUsers');
        dispatch({type: LOAD, payload: users.data});
    }

    const signIn = async () => {
        let token = localStorage.getItem('auth-token');
        if (token) {
            let validToken = await axios.post('http://localhost:5000/auth/tokenIsValid', {token})
            if (validToken) {
                let currentUser = await axios.post('http://localhost:5000/auth/currentUser', {token})
                let {id, name} = currentUser.data;
                dispatch({
                    type: LOGIN,
                    payload: {id, token, name}
                })
            }
        }
    }

    useEffect(() => {
        signIn();
        loadUsers();
    }, [])


    return (
        <div className='App'>
            <ThemeProvider theme={theme}>
                <UserContext.Provider value={{userData}}>
                    {userData.id ? (
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/signIn' component={SignIn}/>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/profile' component={Profile}/>
                            <Route exact path='/friends' component={Friends}/>
                            <Route exact path='/addPost' component={AddPost}/>
                            <Route exact path='/changePost' component={ChangePost}/>
                            <Route exact path='/addFriends' component={AddFriends}/>
                            <Route exact path='/settings' component={Settings}/>
                            <Route exact path='/videos' component={NotImplemented}/>
                            <Route exact path='/games' component={NotImplemented}/>
                            <Route exact path='/art' component={NotImplemented}/>
                            <Route path='*' component={NotFound}/>
                        </Switch>
                    ) : (
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/signIn' component={SignIn}/>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/videos' component={NotImplemented}/>
                            <Route exact path='/games' component={NotImplemented}/>
                            <Route exact path='/art' component={NotImplemented}/>
                            <Route path='*' component={NotFound}/>
                        </Switch>
                    )}
                </UserContext.Provider>
            </ThemeProvider>
        </div>
    );
}

export default App;
