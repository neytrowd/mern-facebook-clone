import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import UserCardList from "../components/UserCardList";
import Footer from "../components/Footer";
import {useSelector} from "react-redux";

export default function Friends() {
    const {id} = useSelector(store => store.auth);
    const {users} = useSelector(store => store.users);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        let user = users.find(user => user._id === id);
        let list = users.filter(user => user._id !== id);

        if (user) {
            let friends = [];
            user.friends.forEach(friend => {
                let candidate = list.find(user => friend.recipient === user._id && friend.status === 3);
                if(candidate) friends.push(candidate);
            })
            setUserList(friends);
        }

    }, [id, users])

    return (
        <React.Fragment>
            <Header/>
            <UserCardList users={userList}/>
            <Footer/>
        </React.Fragment>
    )
}