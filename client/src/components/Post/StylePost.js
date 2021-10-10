import {makeStyles} from "@material-ui/core/styles";

const stylePost = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
    },
    avatar: {
        color: '#fff',
        backgroundColor: '#3f51b5',
    },
    commentButton: {
        display: 'inline-block',
        marginLeft: 'auto!important',
    }
}));

export default stylePost;