import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserCardList from "../components/UserCardList";
import Search from "../components/Search";
import {useSelector} from "react-redux";

export default function Home() {
    const {id} = useSelector(store => store.auth);
    const {users} = useSelector(store => store.users);
    const search = useSelector(store => store.search)
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        let list = users.filter(user => user._id !== id);
        setUserList(list);
    }, [id, users])

    const searchUser = (array, filter) => {
        let result = [...array];
        Object.keys(filter).forEach(key => {
            result = result.filter(item => {
                if (filter[key]) {
                    console.log(filter[key])
                    return item[key].toLowerCase().includes(filter[key])
                }
                return true;
            })
        })
        return result;
    }

    return (
        <React.Fragment>
            <Header/>
            <Search data={userList}/>
            <UserCardList users={searchUser(userList, search)}/>
            <Footer/>
        </React.Fragment>
    );
}