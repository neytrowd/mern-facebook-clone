import {makeStyles} from "@material-ui/core/styles";

const styleSearch = makeStyles((theme) => ({
    textField: {
        width: 'calc(100% - 50px)'
    },
    paper: {
        display: 'flex',
        alignItems: 'center'
    },
    searchField: {
        '& label.Mui-focused': {
            color: 'transparent',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'transparent',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',
            },
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        width: '700px',
        // height: '450px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        backgroundColor: theme.palette.background.paper,
    },
}))

export default styleSearch;