import {makeStyles} from "@material-ui/core/styles";

const styleHeader = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        marginBottom: theme.spacing(5),
        minHeight: '72px'
    },
    toolbar: {
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    logo: {
        display: 'block',
        width: '40px',
        height: "auto"
    },
    nav: {
        marginLeft: '200px',
        '& a': {
            display: 'block',
            margin: '0 2rem',
            color: '#9e9fa0',
        },
        '& a.active': {
            color: '#2196f3',
        },
        '& svg': {
            fontSize: '35px',
        }
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 0,
        margin: theme.spacing(1, 1.5)
    },
    avatar: {
        color: '#fff'
    },
    menu: {
        marginLeft: theme.spacing(1.5)
    },
    menuItem: {
        textDecoration: "none",
        color: '#fff',
        display: "flex",
        alignItems: 'center'
    },
    notification: {
        width: '470px'
    }
}));

export default styleHeader