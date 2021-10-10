import React from "react";
import {CssBaseline} from "@material-ui/core";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";


export default function NotImplemented() {

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <Box paddingTop='150px' textAlign='center'>
                <Typography variant='h4'>
                    This functionality has not been implemented yet))
                </Typography>
                <Typography variant='h5'>
                    <Link to='/'>Go back</Link>
                </Typography>
            </Box>
            <Footer/>
        </React.Fragment>
    )
}