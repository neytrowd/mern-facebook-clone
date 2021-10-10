import {makeStyles} from "@material-ui/core/styles";
import backImage from "../../assets/images/background.jpg";

const styleProfileInfo = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(5)
    },
    info: {
        padding: '40px'
    },
    nav: {
        '& a': {
            display: 'inline-block',
            textDecoration: 'none',
            color: 'inherit',
            width: '100%',
            height: '100%'
        }
    },
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
    }
}))

export default styleProfileInfo;