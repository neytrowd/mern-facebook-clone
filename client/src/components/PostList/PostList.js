import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Post from "../Post";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

export default function PostList({user}) {

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth={"md"}>
                <Box marginTop={5} marginBottom={5}>
                    <Grid container spacing={5} justifyContent='center'>
                        {user?.posts && user.posts.map(post => (
                            <Post key={post._id} post={post} user={user}/>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    )
}