import React, {useEffect, useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from '@material-ui/icons/ThumbUp';
import Box from "@material-ui/core/Box";
import useStyles from "./StylePost";
import Button from "@material-ui/core/Button";
import CommentItem from "../CommentItem";
import TextField from "@material-ui/core/TextField";
import {useDispatch, useSelector} from "react-redux";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ModalWin from "../Modal";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {CHANGE} from "../../redux/reducers/usersReducer";

export default function Post({post, user}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {id} = useSelector(store => store.auth);
    const {users} = useSelector(store => store.users);
    const [showModal, setShowModal] = useState(false);
    const [createdDate, setCreatedDate] = useState('');
    const [commentValue, setCommentValue] = useState('');
    const [showComments, setShowComments] = useState(false);
    const toggleModal = () => setShowModal((prev) => !prev);
    const toggleComments = () => setShowComments((prev) => !prev);

    const genCreatedDate = (date) => {
        let createdDate = new Date(date)
        let day = createdDate.getDate();
        let month = createdDate.getMonth();
        let year = createdDate.getFullYear();
        day = day < 10 ? `0${day}` : day;
        month = month < 10 ? `0${month}` : month;
        return `${day}-${month}-${year}`;
    }

    const getUser = async () => {
        let userData = await axios.post('http://localhost:5000/user/getUser', {id: user._id});
        dispatch({type: CHANGE, payload: userData.data});
    }

    const deletePost = async () => {
        toggleModal();
        await axios.post('http://localhost:5000/post/deletePost', {
            userId: id,
            postId: post._id
        })
        // await axios.delete(`http://localhost:5000/file/${form.avatar._id}`);
        let userData = await axios.post('http://localhost:5000/user/getUser', {id});
        dispatch({type: CHANGE, payload: userData.data});
    }

    const addComment = async () => {
        await axios.post('http://localhost:5000/post/addComment', {
            userId: id,
            postId: post._id,
            content: commentValue
        })
        await getUser();
        setCommentValue('');
    }

    const addLike = async () => {
        let {like, dislike} = post;
        let existingIdIndex = like.findIndex(value => value === id);

        if (existingIdIndex === -1) like.push(id)
        else like.splice(existingIdIndex, 1);

        dislike = dislike.filter(value => value !== id);
        await axios.post('http://localhost:5000/post/changeLikes', {
            postId: post._id, like, dislike
        })
        await getUser();
    }

    const addDislike = async () => {
        let {like, dislike} = post;
        let existingIdIndex = dislike.findIndex(value => value === id);

        if (existingIdIndex === -1) dislike.push(id)
        else dislike.splice(existingIdIndex, 1);

        like = like.filter(value => value !== id);
        await axios.post('http://localhost:5000/post/changeLikes', {
            postId: post._id, like, dislike
        })
        await getUser();
    }

    useEffect(() => {
        let date = genCreatedDate(post.createdDate);
        setCreatedDate(date);
    }, [])

    return (
        <React.Fragment>
            <CssBaseline/>
            <Grid item xs={12} sm={6} md={9}>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar
                                className={classes.avatar} alt={user.name[0]}
                                src={user?.avatar?.name ? `http://localhost:5000/file/${user.avatar.name}` : user.name}
                            />
                        }
                        title={post.title}
                        subheader={createdDate}
                    />

                    {post.media.contentType === 'photo' ? (
                        <Box
                            component="img"
                            src={`http://localhost:5000/file/${post.media.name}`}
                            width='100%'
                            maxHeight={400}
                        />
                    ) : (
                        <Box
                            component="video"
                            src={`http://localhost:5000/file/${post.media.name}`}
                            width='100%'
                            controls
                            maxHeight={400}
                        />
                    )}

                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {post.description}
                        </Typography>
                    </CardContent>

                    {user._id === id ? (
                        <CardActions>
                            <Button
                                color="default" className={classes.button} startIcon={<SettingsIcon/>}
                                component={NavLink} to={{pathname: '/changePost', state: {id: post._id}}}
                            >
                                Change
                            </Button>
                            <Button
                                color="default" className={classes.button} startIcon={<DeleteForeverIcon/>}
                                onClick={toggleModal}
                            >
                                Delete
                            </Button>
                        </CardActions>
                    ) : (
                        <CardActions>
                            <Button
                                className={classes.button} startIcon={<ThumbUp/>} onClick={addLike}
                                color={Boolean(post.like.find(value => value === id)) ? 'primary' : 'default'}
                            >
                                {post.like.length}
                            </Button>
                            <Button
                                className={classes.button} startIcon={<ThumbDown/>} onClick={addDislike}
                                color={Boolean(post.dislike.find(value => value === id)) ? 'primary' : 'default'}
                            >
                                {post.dislike.length}
                            </Button>
                            <Button color="default" className={classes.commentButton} onClick={toggleComments}>
                                {post.comments.length} comments
                            </Button>
                        </CardActions>
                    )}
                </Card>

                <ModalWin open={showModal} handleClose={toggleModal}>
                    <h4>Are you sure delete this post ?</h4>
                    <Box display='flex' justifyContent='flex-end'>
                        <Box component='span' marginRight='10px'>
                            <Button variant="contained" color="primary" onClick={toggleModal}>
                                No
                            </Button>
                        </Box>
                        <Box component='span'>
                            <Button variant="contained" color="primary" onClick={deletePost}>
                                Yes
                            </Button>
                        </Box>
                    </Box>
                </ModalWin>

                {showComments && (
                    <React.Fragment>
                        <Box marginTop={2}>
                            {post.comments.map(comment => {
                                let user = users.find(user => user._id === comment.userId);
                                return <CommentItem key={comment._id} user={user} comment={comment}/>
                            })}
                        </Box>
                        <Box marginTop={2}>
                            <TextField
                                variant="outlined" multiline value={commentValue}
                                rows={5} fullWidth placeholder={'Add comment'}
                                onChange={(e) => setCommentValue(e.target.value)}
                            />
                            <Box marginTop={2} textAlign='right'>
                                <Button variant="contained" color="primary" onClick={addComment}>
                                    Add
                                </Button>
                            </Box>
                        </Box>
                    </React.Fragment>
                )}
            </Grid>
        </React.Fragment>
    )
}