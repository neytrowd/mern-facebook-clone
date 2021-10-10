import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";
import React from "react";


export default function Message({callback, message}) {
    const [showMessage, setShowMessage] = React.useState(false);

    const handleShow = () => {
        setShowMessage(true);
    };

    const handleClose = () => {
        setShowMessage(false);
    };

    return (
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={showMessage}
            onClose={handleClose}
            message="I love snacks"
        >
            <Alert onClose={handleClose} severity="info">
                This is a success message!
            </Alert>
        </Snackbar>
    )
}