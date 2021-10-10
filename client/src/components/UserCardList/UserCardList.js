import Grid from "@material-ui/core/Grid";
import React, {useEffect, useState} from "react";
import UserCard from "../UserCard";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./StyleUserCardList";
import Pagination from "@material-ui/lab/Pagination";
import Box from "@material-ui/core/Box";
import {useSelector} from "react-redux";

export default function UserCardList({users}) {
    const perPage = 3;
    const classes = useStyles();
    const search = useSelector(store => store.search);
    const [pageCount, setPageCount] = useState();
    const [pageData, setPageData] = useState([]);

    const loadData = (page) => {
        let indexOfLast = page * perPage;
        let indexOfFirst = indexOfLast - perPage;
        let data = users.slice(indexOfFirst, indexOfLast);
        setPageData(data);
    }

    const changePage = (event, page) => {
        loadData(page);
    }

    useEffect(() => {
        setPageCount(Math.ceil(users.length / perPage));
        loadData(1);
    }, [users.length, search])

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="md" component="main" className={classes.cardContent}>
                {users.length > 0 && (
                    <React.Fragment>
                        <Grid container spacing={4}>
                            {pageData.map(user => (
                                <UserCard key={user._id} user={user}/>
                            ))}
                        </Grid>
                        <Box marginTop={5} display='flex' justifyContent='center'>
                            <Pagination
                                count={pageCount} variant="outlined"
                                shape="rounded" onChange={changePage}
                            />
                        </Box>
                    </React.Fragment>
                )}
            </Container>
        </React.Fragment>
    )
}