import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import styleNotification from "./StyleNotification";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem'
import UserAvatar from '../../assets/images/user.png';
import axios from "axios";
import {CHANGE} from "../../redux/reducers/usersReducer";
import {useDispatch} from "react-redux";

export default function Notification({message, user}) {
    const dispatch = useDispatch();
    const classes = styleNotification();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => setAnchorEl(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const setConfirmation = async (accepted) => {
        handleClose();
        let data = {
            requesterId: message.requester,
            recipientId: message.recipient,
        }

        if (accepted) await axios.post('http://localhost:5000/friend/changeStatus', data);
        else await axios.post('http://localhost:5000/friend/delete', data);

        let userData = await axios.post('http://localhost:5000/user/getUser', {
            id: message.requester
        });
        dispatch({type: CHANGE, payload: userData.data});
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Box className={classes.notification}>
                <Grid container spacing={1} className={classes.grid}>
                    <Grid item lg={2} className={classes.avatar}>
                        <Avatar
                            src={user?.avatar?.name ? `http://localhost:5000/file/${user.avatar?.name}` : UserAvatar}
                            title=''/>
                    </Grid>
                    <Grid item lg={8}>
                        <Typography variant='caption' display='block'>{user.name}</Typography>
                        <Typography variant='caption' display='block'>
                            {message.content}
                        </Typography>
                    </Grid>
                    <Grid item lg={2} className={classes.avatar}>
                        <IconButton onClick={handleClick}>
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
                            <MenuItem onClick={() => setConfirmation(true)}>Accept</MenuItem>
                            <MenuItem onClick={() => setConfirmation(false)}>Dismiss</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
                <Divider/>
            </Box>
        </React.Fragment>
    )
}