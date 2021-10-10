import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";
import PostList from "../components/PostList";
import Footer from "../components/Footer";
import {useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";

export default function Profile() {
    const location = useLocation();
    const [user, setUser] = useState({});
    const {users} = useSelector(store => store.users);

    useEffect(() => {
        let userData = users.find(user => user._id === location.state.id);
        if(!!userData) setUser(userData);
    })

    return (
        <React.Fragment>
            <Header/>
            <ProfileInfo user={user}/>
            <PostList user={user}/>
            <Footer/>
        </React.Fragment>
    )
}