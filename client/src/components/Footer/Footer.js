import React from 'react';
import Copyright from "../Copyright";
import useStyles from "./StyleFooter";
import Box from "@material-ui/core/Box";
import CssBaseline from '@material-ui/core/CssBaseline';

export default function Footer() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline/>
            <footer className={classes.footer}>
                <Box className={classes.footerBox}>
                    <Copyright/>
                </Box>
            </footer>
        </React.Fragment>
    );
}