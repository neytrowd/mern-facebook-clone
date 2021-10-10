import React, {useEffect, useState} from "react";
import Tooltip from "@material-ui/core/Tooltip";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Autocomplete from "@material-ui/lab/Autocomplete";
import styleSearch from "./StyleSearch";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {FILTER} from "../../redux/reducers/searchReducer";

export default function Search({data}) {
    const classes = styleSearch()
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [form, setForm] = useState({
        name: '', surname: '', university: '', country: '', city: '',
    });


    useEffect(() => {
        // const close = document.getElementsByClassName(
        //     "MuiAutocomplete-clearIndicator"
        // )[0];
        // close.addEventListener("click", () => {
        //     alert("Really, clear the input");
        // });
    })

    const filterHandler = () => {
        dispatch({type: FILTER, payload: form})
        handleClose();
    }

    const nameHandler = (value) => {
        dispatch({
            type: FILTER, payload: {...form, name: value.toLowerCase()}
        })
    }

    const formHandler = (event) => {
        setForm((prev) => ({
            ...prev, [event.target.name]: event.target.value.toLowerCase()
        }))
    }

    const resetHandler = () => {
        let res = {};
        Object.keys(form).forEach(key => res[key] = '')
        dispatch({type: FILTER, payload: res})
        setForm(prevState => ({...prevState, ...res}));
        handleClose();
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth={'md'}>
                <Box marginTop={5}>
                    <Paper component="form" className={classes.paper}>
                        <Tooltip title='Advanced Search'>
                            <IconButton onClick={handleOpen}>
                                <MenuIcon/>
                            </IconButton>
                        </Tooltip>
                        <Autocomplete
                            // freeSolo
                            disableClearable
                            className={classes.textField}
                            options={data.map((option) => option.name)}
                            onChange={(e, v) => nameHandler(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    value={form.name}
                                    name='name'
                                    onChange={formHandler}
                                    placeholder='Search people'
                                    className={classes.searchField}
                                    InputProps={{...params.InputProps, type: 'search'}}
                                />
                            )}
                        />
                    </Paper>
                </Box>

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
                            <h2>Advanced search</h2>
                            <Box marginBottom='30px'>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Name" variant="outlined"
                                            fullWidth name='name'
                                            value={form.name} onChange={formHandler}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Surname" variant="outlined" fullWidth name='surname'
                                            value={form.surname} onChange={formHandler}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <TextField
                                            label="City" variant="outlined" fullWidth
                                            name='city' onChange={formHandler} value={form.city}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <TextField
                                            label="Country" variant="outlined" fullWidth
                                            name='country' onChange={formHandler} value={form.country}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <TextField
                                            label="University" variant="outlined" fullWidth
                                            name='university' onChange={formHandler} value={form.university}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box display='flex' justifyContent='flex-end'>
                                <Box textAlign='left' maxWidth='180px' paddingRight='10px'>
                                    <Grid container spacing={1}>
                                        <Grid item sm={6} md={6}>
                                            <Button variant="contained" color="primary" onClick={resetHandler}>
                                                Reset
                                            </Button>
                                        </Grid>
                                        <Grid item sm={6} md={6}>
                                            <Button variant="contained" color="primary" onClick={filterHandler}>
                                                Search
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </div>
                    </Fade>
                </Modal>
            </Container>
        </React.Fragment>
    )
}