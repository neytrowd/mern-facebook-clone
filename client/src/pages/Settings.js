import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
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
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Footer from "../components/Footer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import backImage from '../assets/images/background.jpg'
import {useSelector, useDispatch} from "react-redux";
import UserAvatar from '../assets/images/user.png';
import {useHistory} from 'react-router-dom'
import axios from "axios";
import {CHANGE} from "../redux/reducers/usersReducer";

const styleSettings = makeStyles(() => ({
    poster: {
        background: `url(${backImage})`
    },
    cover: {
        width: '170px',
        margin: '0 auto'
    },
    userPhoto: {
        display: 'block',
        margin: 'auto',
        border: '5px solid gray',
        transform: 'translateY(80%)',
    },
    changePhoto: {
        background: 'grey',
        transform: 'translate(220%, 200%)'
    }
}))

export default function Settings() {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = styleSettings();
    const {id} = useSelector(store => store.auth);
    const {users} = useSelector(store => store.users);
    const [userPhoto, setUserPhoto] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        name: '', surname: '', email: '', password: '', birthday: new Date(),
        language: '', address: '', city: '', country: '', phoneNumber: '',
        university: '', concentration: '', aboutMe: '', gender: '', avatar: '',
    });

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const formHandler = (event) => {
        if (!event.target) {
            setForm((prev) => ({
                ...prev, birthday: event
            }))
            return;
        }
        setForm((prev) => ({
            ...prev, [event.target.name]: event.target.value
        }))
    }

    const imageHandler = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = function () {
            setUserPhoto(reader.result);
        }
        setForm(prev => ({
            ...prev, photo: event.target.files[0]
        }))
    }

    const changePermissions = async () => {
        // if(form.avatar) await axios.delete(`http://localhost:5000/file/${form.avatar._id}`);
        let formData = new FormData();
        formData.append('id', id);
        formData.append('avatar[id]', form.avatar.id);
        formData.append('avatar[name]', form.avatar.name);
        Object.keys(form).forEach(key => formData.append(`${key}`, form[key]));

        await axios.post('http://localhost:5000/user/changePermissions', formData);
        let userData = await axios.post('http://localhost:5000/user/getUser', {id});
        dispatch({type: CHANGE, payload: userData.data});
        history.push({pathname: '/'});
    }

    useEffect(() => {
        let data = {};
        let userData = users.find(user => user._id === id);
        if (!!userData) {
            Object.keys(form).forEach(key => {
                data = {...data, [key]: userData[key]}
            })
            data.password = '';
        }
        setForm((prev) => ({
            ...prev, ...data
        }))
    }, [users])

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <Container maxWidth="md" component={Box} marginTop={5} marginBottom={5}>
                <Card>
                    <Box className={classes.poster} minHeight={280} marginBottom={5}>
                        <Box position='relative' className={classes.cover}>
                            <Box
                                component="img"
                                src={userPhoto ? userPhoto : form.avatar?.id ? `http://localhost:5000/file/${form.avatar?.name}` : UserAvatar}
                                width="170px" height='170px'
                                left="50%" borderRadius="50%" className={classes.userPhoto}
                            />
                            <IconButton
                                component="label"
                                variant="contained"
                                className={classes.changePhoto}
                            >
                                <PhotoCameraIcon/>
                                <input type="file" hidden onChange={imageHandler}/>
                            </IconButton>
                        </Box>
                    </Box>

                    <CardContent>

                        {/* Basic info*/}
                        <Box component={Typography} variant="h6" fontSize="16px" marginBottom="20px">
                            Basic Information
                        </Box>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Box marginBottom='30px'>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <TextField label="Name" variant="outlined"
                                                   fullWidth name='name'
                                                   value={form.name} onChange={formHandler}/>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField label="Surname" variant="outlined"
                                                   fullWidth name='surname'
                                                   value={form.surname} onChange={formHandler}/>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField label="Email" variant="outlined"
                                                   fullWidth disabled name='email'
                                                   value={form.email} onChange={formHandler}/>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel htmlFor="password">Password</InputLabel>
                                            <OutlinedInput
                                                id="password" label='Password'
                                                type={showPassword ? 'text' : 'password'}
                                                value={form.password}
                                                name='password'
                                                onChange={formHandler}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleShowPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <Visibility/> :
                                                                <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} lg={4}>
                                        <DatePicker inputVariant='outlined' views={["year"]} label="Year"
                                                    fullWidth name='birthday' value={form.birthday}
                                                    onChange={formHandler}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <DatePicker inputVariant='outlined' views={["month"]} label="Month"
                                                    value={form.birthday} fullWidth name='birthday'
                                                    onChange={formHandler}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <DatePicker inputVariant='outlined' views={["date"]} label="Day"
                                                    value={form.birthday} fullWidth name='birthday'
                                                    onChange={formHandler}
                                        />
                                    </Grid>

                                    <Grid item xs={12} lg={6}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="gender">Gender</InputLabel>
                                            <Select labelId="gender" label="Gender" fullWidth defaultValue=""
                                                    name='gender' onChange={formHandler} value={form.gender}
                                            >
                                                <MenuItem selected value={'Male'}>Male</MenuItem>
                                                <MenuItem value={'Female'}>Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField label="Language" variant="outlined" fullWidth
                                                   name='language' onChange={formHandler} value={form.language}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </MuiPickersUtilsProvider>


                        {/* Contact info*/}
                        <Box component={Divider} marginBottom="1.5rem!important" marginTop="1.5rem!important"/>
                        <Box component={Typography} variant="h6" fontSize="16px" marginBottom="20px">
                            Contact Information
                        </Box>
                        <Box marginBottom='30px'>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField label="Address" variant="outlined" fullWidth
                                               name='address' onChange={formHandler} value={form.address}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <TextField label="City" variant="outlined" fullWidth
                                               name='city' onChange={formHandler} value={form.city}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <TextField label="Country" variant="outlined" fullWidth
                                               name='country' onChange={formHandler} value={form.country}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <TextField label="Phone number" variant="outlined" fullWidth
                                               name='phoneNumber' onChange={formHandler} value={form.phoneNumber}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Education info*/}
                        <Box component={Divider} marginBottom="1.5rem!important" marginTop="1.5rem!important"/>
                        <Box component={Typography} variant="h6" fontSize="16px" marginBottom="20px">
                            Education Information
                        </Box>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={6}>
                                    <TextField label="University" variant="outlined" fullWidth
                                               name='university' onChange={formHandler} value={form.university}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField label="Concentration" variant="outlined" fullWidth
                                               name='concentration' onChange={formHandler} value={form.concentration}
                                    />
                                </Grid>
                            </Grid>
                        </Box>


                        {/* About me*/}
                        <Box component={Divider} marginBottom="1.5rem!important" marginTop="1.5rem!important"/>
                        <Box component={Typography} variant="h6" fontSize="16px" marginBottom="20px">
                            About me
                        </Box>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField variant="outlined" multiline rows={5} fullWidth
                                               name='aboutMe' onChange={formHandler} value={form.aboutMe}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Save*/}
                        <Box marginTop={5} textAlign='right'>
                            <Button variant="contained" color="primary" onClick={changePermissions}>
                                Save Changes
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
            <Footer/>
        </React.Fragment>
    )
}