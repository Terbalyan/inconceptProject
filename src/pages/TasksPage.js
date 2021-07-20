import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../app/features/tasks/tasksSlice';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Search from '../components/Search';
import { getProject } from '../app/features/projects/projectsSlice';
import { Box } from '@material-ui/core';
import TaskList from '../components/TaskList';
import Task from '../components/Task';
import SummaryTask from '../components/SummaryTask';
import TaskDialog from '../components/TaskDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 705,
    textAlign: 'center',
    padding: 5,
    color: theme.palette.text.secondary,
  },
  button: {
    float: 'right',
  },
}))

export default function TasksPage(props) {
  const [projectId] = useState(+props.match.params.id);

  const classes = useStyles();
  
  const dispatch = useDispatch();
  
  const project = useSelector(state => getProject(state, projectId));

  const addNewTask = (task) => {
    dispatch(addTask(task));
  }

  return (
    <>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' >
              <Link to='/projects'>
                <h1 style={{color: 'white'}}>Projects</h1>
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      <Box
        boxShadow={3}
        bgcolor='background.paper'
        m={1}
        p={1}
        style={{ height: '7rem', borderRadius: '15px' }}
      >
        <h2>{project?.name}</h2>
        <h3>{project?.shortSummary}</h3>
      </Box>
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs>
              <h3>Task Names</h3>
                <Paper className={classes.paper}>
                    <TaskList projectId={projectId} ItemComponent={SummaryTask} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3>Tasks</h3>
                <TaskDialog projectId={projectId} parentTaskId={null} onAdd={addNewTask} />
              </div>
              <Paper className={classes.paper}>
                  <TaskList projectId={projectId} ItemComponent={Task} />
              </Paper>
            </Grid>
            <Grid item xs>
              <h3>Search</h3>
              <Paper className={classes.paper}>
                <Search />
              </Paper>
            </Grid>
          </Grid>
        </div>
    </>
  );
}