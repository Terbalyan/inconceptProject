import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { getName } from '../app/features/names/namesSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 705,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function TasksPage() {
    const classes = useStyles();

    const name = useSelector(getName);
    console.log(name);

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs>
                <Paper className={classes.paper}>
                    <div>{name}</div>
                </Paper>
                </Grid>
                <Grid item xs={5}>
                <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs>
                <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
            </Grid>
        </div>
    );
}
