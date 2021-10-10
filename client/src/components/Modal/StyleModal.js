import {makeStyles} from "@material-ui/core/styles";

const styleModal = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        width: '500px',
        minHeight: '150px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '5px',
        backgroundColor: theme.palette.background.paper,
    },
}))

export default styleModal;