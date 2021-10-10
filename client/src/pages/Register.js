import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Box from "@material-ui/core/Box";
import React, {useState} from "react";
import Copyright from "../components/Copyright";
import {NavLink, useHistory} from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";
import GoogleAuth from "../components/GoogleAuth";
import {useDispatch} from "react-redux";
import {LOGIN} from "../redux/reducers/authReducer";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    signIn: {
        color: '#fff'
    }
}));

export default function Register() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [form, setForm] = useState({
        name: '', email: '', password: '', confirmPassword: ''
    });

    const changeHandler = (event) => {
        setForm((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const register = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/auth/register', form);
            let login = await axios.post('http://localhost:5000/auth/login', {
                email: form.email,
                password: form.password
            })

            let {token, userId} = login.data;
            dispatch({
                type: LOGIN,
                payload: {id: userId, token}
            })

            localStorage.setItem('auth-token', login.data.token);
            history.push('/');
        } catch (err) {
            console.log(err.message)
        }
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}><LockOutlinedIcon/></Avatar>
                <Typography component="h1" variant="h5">Register</Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined" required fullWidth label="Name" size={"small"}
                        name="name" autoComplete="email" autoFocus margin="normal"
                        onChange={changeHandler}
                    />
                    <TextField
                        variant="outlined" required fullWidth label="Email Address"
                        name="email" margin="normal" size={"small"}
                        onChange={changeHandler}
                    />
                    <TextField
                        variant="outlined" required fullWidth label="Password"
                        name="password" type="password" margin="normal" size={"small"}
                        onChange={changeHandler}
                    />
                    <TextField
                        variant="outlined" required fullWidth label="Confirm Password"
                        name="confirmPassword" type="password" margin="normal" size={"small"}
                        onChange={changeHandler}
                    />
                    <Box marginTop={2} className={classes.box} display={'flex'} justifyContent="center">
                        <ReCAPTCHA
                            sitekey='6LcEsBMcAAAAAMoKjW_C9LEEqXMKImFZpMdUSjZA'
                            onChange={() => setDisabled(false)} theme='dark'
                        />
                    </Box>
                    <Box marginTop={3} marginBottom={2}>
                        <Button
                            type="submit" fullWidth variant="contained" color="primary"
                            onClick={register} disabled={disabled}
                        >
                            Register
                        </Button>
                    </Box>
                    <Box marginTop={3} display={'flex'} justifyContent={'center'}>
                        <GoogleAuth/>
                    </Box>
                </form>
            </div>
            <Box marginTop={3} textAlign='center'>
                <NavLink to='/signIn' className={classes.signIn}>Already have an account ? Log in</NavLink>
            </Box>
            <Box className={classes.box} marginTop={2}>
                <Copyright/>
            </Box>
        </Container>
    );
}