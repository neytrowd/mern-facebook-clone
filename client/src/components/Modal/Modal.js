import React from "react";
import Modal from '@material-ui/core/Modal';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styleModal from "./StyleModal";


export default function ModalWin({open, handleClose, children}) {
    const classes = styleModal()

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500}}
        >
            <Fade in={open}>
                <div className={classes.modalPaper}>
                    {children}
                </div>
            </Fade>
        </Modal>
    )
}