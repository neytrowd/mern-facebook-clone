import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import React, {useState} from "react";
import Copyright from "../components/Copyright";
import Box from "@material-ui/core/Box";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleAuth from "../components/GoogleAuth";
import {makeStyles} from '@material-ui/core/styles';
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {LOGIN} from "../redux/reducers/authReducer";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    paper: {
        textAlign: 'center',
        marginTop: theme.spacing(12)
    },
    avatar: {
        margin: 'auto',
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    register: {
        color: '#fff'
    }
}));

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [form, setForm] = useState({email: '', password: ''});

    const changeHandler = (event) => {
        setForm((prev) => {
            return {...prev, [event.target.name]: event.target.value}
        })
    }

    const login = async (event) => {
        event.preventDefault();

        try {
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
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">
                    Sign in
                </Typography>

                <form noValidate>
                    <TextField
                        variant="outlined" margin="normal" required fullWidth
                        name="email" label="Email Address" autoComplete="email" autoFocus
                        onChange={changeHandler}
                    />
                    <TextField
                        variant="outlined" margin="normal" required fullWidth
                        name="password" label="Password" type="password"
                        onChange={changeHandler}
                    />
                    <Box marginTop={3} className={classes.box} display={'flex'} justifyContent="center">
                        <ReCAPTCHA
                            sitekey='6LcEsBMcAAAAAMoKjW_C9LEEqXMKImFZpMdUSjZA'
                            onChange={() => setDisabled(false)} theme='dark'
                        />
                    </Box>
                    <Box marginTop={3}>
                        <Button
                            type="submit" fullWidth variant="contained" color="primary"
                            onClick={login} disabled={disabled}
                        >
                            Sign In
                        </Button>
                    </Box>
                </form>

            </div>
            <Box marginTop={3} display={'flex'} justifyContent={'center'}>
                <GoogleAuth/>
            </Box>
            <Box marginTop={3} textAlign='center'>
                <NavLink to='/register' className={classes.register}>Not a user ? Register</NavLink>
            </Box>
            <Box marginTop={3}>
                <Copyright/>
            </Box>
        </Container>
    );
}