import React, {useEffect, useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Tooltip from '@material-ui/core/Tooltip';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';
import useStyles from "./StyleUserCard";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {NavLink} from "react-router-dom";
import UserAvatar from "../../assets/images/userPhoto.jpg";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {CHANGE} from "../../redux/reducers/usersReducer";

export default function UserCard({user}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [friendStatus, setFriendStatus] = useState(1);
    const [isfriend, setIsFriend] = useState(false);
    const {id} = useSelector(store => store.auth);
    const {users} = useSelector(store => store.users)

    useEffect(() => {
        let currentUser = users.find(user => user._id === id);
        if (currentUser) {
            let friend = currentUser.friends.find(friend => friend.recipient === user._id);
            if (friend) setFriendStatus(friend.status);
            setIsFriend(!!friend);
        }
    }, [users])

    const addFriend = async () => {
        if (id) {
            await axios.post('http://localhost:5000/friend/add', {
                requesterId: id,
                recipientId: user._id
            })
            let userData = await axios.post('http://localhost:5000/user/getUser', {id});
            let friendData = await axios.post('http://localhost:5000/user/getUser', {id: user._id});
            dispatch({type: CHANGE, payload: userData.data});
            dispatch({type: CHANGE, payload: friendData.data});
        }
    }

    const deleteFriend = async () => {
        await axios.post('http://localhost:5000/friend/delete', {
            requesterId: id,
            recipientId: user._id,
            friendStatus,
        })

        let userData = await axios.post('http://localhost:5000/user/getUser', {id});
        let friendData = await axios.post('http://localhost:5000/user/getUser', {id: user._id});
        dispatch({type: CHANGE, payload: userData.data});
        dispatch({type: CHANGE, payload: friendData.data});
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                    <CardHeader
                        title={`${user.name}`}
                        subheader={`${user.email}`}
                        avatar={
                            <Avatar
                                className={classes.avatar} alt={user.name[0]}
                                src={user?.avatar?.name ? `http://localhost:5000/file/${user.avatar.name}` : user.name}
                            />
                        }
                    />
                    <Box
                        width='100%'
                        component="img"
                        minHeight='150px'
                        height='250px'
                        src={user?.avatar?.name ? `http://localhost:5000/file/${user.avatar?.name}` : UserAvatar}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {user.about}
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Grid container spacing={1} className={classes.grid}>
                            <Grid item sm={6} md={6}>
                                <Tooltip title='Add to friend'>

                                    {(isfriend) ? (
                                            <Button
                                                variant="contained" color="primary" fullWidth
                                                startIcon={<DeleteForeverIcon/>} onClick={deleteFriend}
                                            >
                                                Unfriend
                                            </Button>
                                        )
                                        : (
                                            <Button
                                                variant="contained" color="primary" fullWidth
                                                startIcon={<PersonAddIcon/>} onClick={addFriend}
                                            >
                                                Add
                                            </Button>
                                        )}

                                </Tooltip>
                            </Grid>
                            <Grid item sm={6} md={6}>
                                <Tooltip title='View user profile'>
                                    <Button
                                        variant="outlined"
                                        color="primary" fullWidth
                                        startIcon={<PersonPinIcon/>}
                                        component={NavLink}
                                        to={{pathname: '/profile', state: {id: user._id}}}
                                    >
                                        View
                                    </Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </React.Fragment>
    )
}