import React from "react";
import Paper from "@material-ui/core/Paper";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

export default function CommentItem({user, comment}) {

    return (
        <React.Fragment>
            <CssBaseline/>
            <Paper style={{padding: "20px", marginTop: '10px'}} >
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar
                            alt={user.name[0]}
                            src={user?.avatar?.name ? `http://localhost:5000/file/${user.avatar.name}` : user.name}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <h4 style={{margin: 0}}>{user.name}</h4>
                        <p>{comment.content}</p>
                        <p style={{color: "gray"}}>{comment.createdDate.toString()}</p>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    )
}