import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import PersonIcon from '@material-ui/icons/Person';
import School from "@material-ui/icons/School";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import styleProfileInfo from "./StyleProfileInfo";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import EmailIcon from '@material-ui/icons/Email';
import SettingsIcon from '@material-ui/icons/Settings';
import MessageIcon from '@material-ui/icons/Message';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import {NavLink} from "react-router-dom";
import {Tooltip} from "@material-ui/core";
import {useSelector} from "react-redux";
import UserAvatar from '../../assets/images/user.png';

export default function ProfileInfo({user}) {
    const classes = styleProfileInfo();
    const {id} = useSelector(store => store.auth);

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth='md' className={classes.container}>
                <Card>
                    <Box className={classes.poster} minHeight={280} marginBottom={3}>
                        <Box position='relative' className={classes.cover}>
                            <Box
                                component="img"
                                width="170px" height='170px'
                                borderRadius="50%" className={classes.userPhoto}
                                src={user?.avatar?.name ? `http://localhost:5000/file/${user.avatar?.name}` : UserAvatar}
                            />
                        </Box>
                    </Box>

                    <Box component={CardContent} paddingTop="0!important" marginTop={5}>

                        {/* Actions*/}
                        {Boolean(user?._id === id) ? (
                            <Box textAlign='center' maxWidth='300px' margin='80px auto' marginBottom='2rem'>
                                <Grid container spacing={1}>
                                    <Grid item sm={6} md={6}>
                                        <Tooltip title='Change settings'>
                                            <Button variant="contained" color="primary" fullWidth
                                                    startIcon={<SettingsIcon/>} className={classes.nav}
                                                    component={NavLink} to='/settings'
                                            >
                                                Change
                                            </Button>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item sm={6} md={6}>
                                        <Tooltip title='Create new post'>
                                            <Button variant="outlined" color="primary"
                                                    fullWidth startIcon={<PersonPinIcon/>} className={classes.nav}
                                                    component={NavLink} to='/addPost'
                                            >
                                                Add post
                                            </Button>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Box>
                        ) : (
                            <Box textAlign='center' maxWidth='300px' margin='80px auto' marginBottom='2rem'>
                                <Grid container spacing={1}>
                                    <Grid item sm={6} md={6}>
                                        {Boolean(true) ? (
                                            <Tooltip title='Add user to friends'>
                                                <Button variant="contained" color="primary"
                                                        fullWidth startIcon={<PersonAddIcon/>}
                                                >
                                                    Add Friend
                                                </Button>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title='Remove user from friends'>
                                                <Button variant="contained" color="primary"
                                                        fullWidth startIcon={<PersonAddDisabledIcon/>}
                                                >
                                                    Unfriend
                                                </Button>
                                            </Tooltip>
                                        )}


                                    </Grid>
                                    <Grid item sm={6} md={6}>
                                        <Tooltip title='Send a message to the user'>
                                            <Button variant="outlined" color="primary"
                                                    fullWidth startIcon={<MessageIcon/>}
                                            >
                                                Send
                                            </Button>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}


                        {/* Info*/}
                        <Box textAlign="center">
                            <Typography variant="h6">
                                <PersonIcon fontSize={"medium"}
                                            style={{position: 'relative', top: '4px', left: '-10px'}}/>
                                {user?.name} {user?.surname}
                            </Typography>

                            <Typography variant="h6">
                                <EmailIcon fontSize={"small"}
                                           style={{position: 'relative', top: '4px', left: '-10px'}}/>
                                {user?.email}
                            </Typography>

                            {user.country && user.city && (
                                <Typography variant='h6'>
                                    <LocationOn fontSize={"small"}
                                                style={{position: 'relative', top: '3px', left: '-10px'}}/>
                                    {user.city} {user.country} {user?.address}
                                </Typography>
                            )}

                            {user.university && (
                                <Typography variant='h6'>
                                    <School fontSize={"small"}
                                            style={{position: 'relative', top: '3px', left: '-10px'}}/>
                                    {user.university}
                                    <Box component="span" fontWeight="300">, {user?.concentration}</Box>
                                </Typography>
                            )}

                            <Box component={Divider} marginTop="2rem!important" marginBottom="1.5rem!important"/>
                            <Box component="p" lineHeight="1.7" marginBottom="1rem" fontSize="14px">
                                {user?.about}
                            </Box>
                        </Box>

                    </Box>
                </Card>
            </Container>
        </React.Fragment>
    )
}