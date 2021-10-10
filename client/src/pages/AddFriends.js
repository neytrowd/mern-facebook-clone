import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Header from "../components/Header";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from "@material-ui/core/Avatar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Footer from "../components/Footer";
import CardHeader from "@material-ui/core/CardHeader";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {CHANGE} from "../redux/reducers/usersReducer";


export default function AddFriends() {
    const dispatch = useDispatch();
    const {id} = useSelector(store => store.auth);
    const {users} = useSelector(store => store.users);
    const [friendList, setFriendList] = useState([]);
    const [candidateList, setCandidateList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [keyValueToClear, setKeyValueToClear] = useState('');

    useEffect(() => {
        let currentUser = users.find(user => user._id === id);
        if (currentUser) {
            let friends = [];
            let candidates = [];
            users.forEach(user => {
                if (currentUser._id !== user._id) {
                    let friend = currentUser.friends.find(friend => friend.recipient === user._id);
                    if (friend) {
                        friends.push({...user, status: friend.status})
                    } else {
                        candidates.push({...user});
                    }
                }
            })
            setFriendList(friends);
            setCandidateList(candidates)
        }
    }, [id, users])


    const deleteFriend = async (userId, status) => {
        await axios.post('http://localhost:5000/friend/delete', {
            requesterId: id,
            recipientId: userId,
            friendStatus: status
        })
        let userData = await axios.post('http://localhost:5000/user/getUser', {id});
        let friendData = await axios.post('http://localhost:5000/user/getUser', {id: userId});
        dispatch({type: CHANGE, payload: userData.data});
        dispatch({type: CHANGE, payload: friendData.data});
    }

    const addFriend = async () => {
        if (id && selectedUser) {
            await axios.post('http://localhost:5000/friend/add', {
                requesterId: id,
                recipientId: selectedUser._id
            })
            let userData = await axios.post('http://localhost:5000/user/getUser', {id});
            let friendData = await axios.post('http://localhost:5000/user/getUser', {id: selectedUser._id});
            dispatch({type: CHANGE, payload: userData.data});
            dispatch({type: CHANGE, payload: friendData.data});
            setSelectedUser(null);
            setKeyValueToClear(Math.random())
        }
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <Container maxWidth="md" component={Box} marginTop={5} marginBottom={5}>
                <Card>
                    <CardContent>

                        <Box component={Typography} variant="h5" fontSize="16px" marginBottom="20px">
                            User friends
                        </Box>
                        <Box>
                            <List>
                                {friendList.map(user => (
                                    <React.Fragment key={user._id}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar
                                                            src={user?.avatar?.name ? `http://localhost:5000/file/${user.avatar.name}` : user.name}
                                                        />
                                                    }
                                                    title={user.name}
                                                    subheader={user.email}
                                                />
                                            </ListItemAvatar>
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge="end" onClick={() => deleteFriend(user._id, user.status)}
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider/>
                                    </React.Fragment>
                                ))}
                            </List>

                            <Box marginTop='20px'>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={9}>
                                        <Autocomplete
                                            freeSolo
                                            key={keyValueToClear}
                                            disableClearable
                                            options={candidateList}
                                            getOptionLabel={option => option.name}
                                            onChange={(event, value) => {
                                                setSelectedUser(value);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder='People name'
                                                    margin="none"
                                                    variant="outlined"
                                                    InputProps={{...params.InputProps, type: 'search'}}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} lg={3}>
                                        <Box paddingTop={1}>
                                            <Button variant="contained" color="primary"
                                                    fullWidth onClick={addFriend}
                                            >
                                                Add new member
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>

                        {/* Save*/}
                        {/*<Box marginTop={5} textAlign='right'>*/}
                        {/*    <Button variant="contained" color="primary">*/}
                        {/*        Save Changes*/}
                        {/*    </Button>*/}
                        {/*</Box>*/}
                    </CardContent>
                </Card>
            </Container>
            <Footer/>
        </React.Fragment>
    )
}