import {makeStyles} from "@material-ui/core/styles";

const styleFooter = makeStyles((theme) => ({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        background: '#1a1a1a',
        marginTop: theme.spacing(8),
        borderTop: `1px solid ${theme.palette.divider}`,
    },
    footerBox: {
        padding: theme.spacing(4)
    }
}))

export default styleFooter;