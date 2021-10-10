import {makeStyles} from "@material-ui/core/styles";

const styleNotification = makeStyles((theme) => ({
    notification: {
        width: '100%'
    },
    grid: {
        padding: '10px 0',
        whiteSpace: 'pre-wrap'
    },
    avatar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default styleNotification