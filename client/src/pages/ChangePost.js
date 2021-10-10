import React, {useEffect, useMemo, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {useDropzone} from "react-dropzone";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import List from '@material-ui/core/List';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {CHANGE} from "../redux/reducers/usersReducer";
import {useHistory, useLocation} from 'react-router-dom';

const baseStyle = {
    borderWidth: 2,
    borderRadius: 2,
    color: '#bdbdbd',
    textAlign: 'center',
    padding: '40px 20px',
    borderStyle: 'dashed',
    borderColor: 'rgb(133, 133, 133)',
};


export default function ChangePost() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const {id} = useSelector(store => store.auth);
    const {users} = useSelector(store => store.users);
    const [form, setForm] = useState({title: '', description: ''});
    const formHandler = (event) => setForm(prev => ({...prev, [event.target.name]: event.target.value}));
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({accept: ['image/*', 'video/*']});
    const style = useMemo(() => ({...baseStyle}), [isDragActive]);


    const changeHandler = async () => {
        if(form.title && form.description && location?.state?.id){
            let formData = new FormData();
            formData.append('postId', location.state.id);
            Object.keys(form).forEach(key => formData.append(`${key}`, form[key]));

            if(acceptedFiles[0]){
                formData.append('newMedia', acceptedFiles[0]);
            }

            await axios.post('http://localhost:5000/post/changePost', formData);
            let userData = await axios.post('http://localhost:5000/user/getUser', {id});
            dispatch({type: CHANGE, payload: userData.data});
            history.push({pathname: '/profile', state: {id}});
        }
    }

    useEffect(() => {
        let userData = users.find(user => user._id === id);
        if(userData) {
            let post = userData.posts.find(post => post._id === location?.state?.id);
            if(post){
                setForm((prev) => ({...prev, title: post.title}));
                setForm((prev) => ({...prev, description: post.description}));
            }
        }
    }, [users, id])

    return (
        <React.Fragment>
            <Header/>
            <Container maxWidth='md'>
                <Box marginBottom={5}>
                    <Box marginBottom={2}>
                        <Typography variant='h5'>
                            Change post
                        </Typography>
                    </Box>
                    <Box marginBottom={3}>
                        <TextField
                            fullWidth variant="outlined" placeholder='Post title'
                            value={form.title} name='title' onChange={formHandler}
                        />
                    </Box>
                    <Box marginBottom={3}>
                        <TextField
                            variant="outlined" multiline rows={5} value={form.description}
                            fullWidth placeholder='Post description'
                            name='description' onChange={formHandler}
                        />
                    </Box>
                    <Box marginBottom={3}>
                        <Box>
                            <div {...getRootProps({style})}>
                                <input {...getInputProps()}/>
                                <p>Drag & drop some files here, or click to select files</p>
                            </div>
                            <Box minHeight='60px'>
                                <List>
                                    {acceptedFiles.map(file => (
                                        <ListItem key={file.path}>
                                            Uploaded file: {file.path} - {file.size} bytes
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                    </Box>
                    <Box textAlign='right'>
                        <Button variant="contained" color="primary" onClick={changeHandler}>
                            Change post
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Footer/>
        </React.Fragment>
    )
}
