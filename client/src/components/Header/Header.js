import React, {useContext, useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Notifications from '@material-ui/icons/Notifications'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import useStyles from "./StyleHeader";
import Logo from '../../assets/images/logo192.png'
import HouseIcon from '@material-ui/icons/House';
import GroupIcon from '@material-ui/icons/Group';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import PaletteIcon from '@material-ui/icons/Palette';
import PeopleIcon from '@material-ui/icons/People';
import AddIcon from '@material-ui/icons/Add';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Notification from "../Notification";
import UserContext from '../../context/userContext';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LOGOUT} from "../../redux/reducers/authReducer";
import {useHistory} from 'react-router-dom';

export default function Header() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const {users} = useSelector(store => store.users);
    const [userInfo, setUserInfo] = useState({});
    const {userData} = useContext(UserContext);
    const [openSettings, setOpenSettings] = useState(null);
    const [openNotifications, setOpenNotifications] = useState(null);
    const handleClose = () => setOpenSettings(null);
    const handleNotClose = () => setOpenNotifications(null);
    const handleClick = (event) => setOpenSettings(event.currentTarget);
    const handleNotClick = (event) => setOpenNotifications(event.currentTarget);
    const logout = () => {
        localStorage.removeItem('auth-token');
        dispatch({type: LOGOUT});
        history.push('/');
    }

    useEffect(() => {
        let user = users.find(user => user._id === userData.id);
        if (user) setUserInfo(user);
    }, [userData, users])

    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Container>
                    <Toolbar className={classes.toolbar}>
                        {/*Logo*/}
                        <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                            <NavLink to='/'>
                                <img src={Logo} alt="logo" className={classes.logo}/>
                            </NavLink>
                        </Typography>

                        {/*Pages*/}
                        <Toolbar component="nav" variant="dense" className={classes.nav}>
                            <NavLink exact to={'/'}>
                                <Tooltip title="Main page">
                                    <HouseIcon/>
                                </Tooltip>
                            </NavLink>
                            {Boolean(userData.id) && (
                                <NavLink exact to={'/friends'}>
                                    <Tooltip title='Friends'>
                                        <GroupIcon/>
                                    </Tooltip>
                                </NavLink>
                            )}
                            <NavLink exact to={'/videos'}>
                                <Tooltip title='Videos'>
                                    <LiveTvIcon/>
                                </Tooltip>
                            </NavLink>
                            <NavLink exact to={'/games'}>
                                <Tooltip title='Games'>
                                    <VideogameAssetIcon/>
                                </Tooltip>
                            </NavLink>
                            <NavLink exact to={'/art'}>
                                <Tooltip title='Art'>
                                    <PaletteIcon/>
                                </Tooltip>
                            </NavLink>
                        </Toolbar>

                        {/*Actions*/}
                        {Boolean(userData.id) ? (
                                <Box className={classes.actions}>
                                    <CardHeader
                                        avatar={<Avatar
                                            className={classes.avatar}>{userInfo?.name ? userInfo?.name[0] : ''}</Avatar>}
                                        title={userInfo?.name}
                                    />
                                    <Avatar>
                                        <NavLink to='/addPost'>
                                            <Tooltip title='Create new post'>
                                                <IconButton>
                                                    <AddIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </NavLink>
                                    </Avatar>

                                    {/* notifications*/}
                                    <div className={classes.menu}>
                                        <Badge badgeContent={userInfo?.notifications && userInfo?.notifications.length} color="primary">
                                            <Tooltip title='Notifications'>
                                                <Avatar>
                                                    <IconButton onClick={handleNotClick}>
                                                        <Notifications/>
                                                    </IconButton>
                                                </Avatar>
                                            </Tooltip>
                                        </Badge>
                                        <Menu
                                            keepMounted
                                            onClose={handleNotClose}
                                            anchorEl={openNotifications}
                                            open={Boolean(openNotifications)}
                                        >
                                            <Box className={classes.notification}>
                                                {
                                                    userInfo?.notifications  && userInfo.notifications?.length > 0
                                                    ? userInfo.notifications.map((mes) => {
                                                        let sendedBy = users.find(user => user._id === mes.recipient);
                                                        return  <Notification key={mes._id} message={mes} user={sendedBy}/>
                                                    })
                                                    : (<Box paddingLeft='20px'> No Items </Box>)
                                                }
                                            </Box>
                                        </Menu>
                                    </div>

                                    <div className={classes.menu}>
                                        <Avatar>
                                            <Tooltip title='Actions'>
                                                <IconButton onClick={handleClick}>
                                                    <MoreVertIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </Avatar>
                                        <Menu
                                            anchorEl={openSettings}
                                            keepMounted
                                            open={Boolean(openSettings)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <NavLink to={{
                                                    pathname: '/profile',
                                                    state: {id: userData.id}
                                                }}
                                                         className={classes.menuItem}
                                                >
                                                    <PersonIcon fontSize={"medium"}
                                                                style={{position: 'relative', top: '-1px', left: '-5px'}}/>
                                                    My profile
                                                </NavLink>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <NavLink to='/settings' className={classes.menuItem}>
                                                    <SettingsIcon fontSize={"medium"}
                                                                  style={{
                                                                      position: 'relative',
                                                                      top: '-1px',
                                                                      left: '-5px'
                                                                  }}/>
                                                    Settings
                                                </NavLink>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <NavLink to='/addFriends' className={classes.menuItem}>
                                                    <PeopleIcon fontSize={"medium"}
                                                                style={{position: 'relative', top: '-1px', left: '-5px'}}/>
                                                    Friends
                                                </NavLink>
                                            </MenuItem>
                                            <MenuItem onClick={logout}>
                                                <ExitToAppIcon fontSize={"medium"}
                                                               style={{position: 'relative', top: '-1px', left: '-5px'}}/>
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </Box>
                            )
                            : (
                                <ButtonGroup size="medium" color="primary" className={classes.link}>
                                    <Button component={NavLink} to='/signIn'>Login</Button>
                                    <Button component={NavLink} to='/register'>Register</Button>
                                </ButtonGroup>
                            )}
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    )
}