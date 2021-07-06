import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import TasksDialog from '../components/TasksDialog';
import { useDispatch, useSelector } from 'react-redux';
import { editNameDescription, getTasks } from '../app/features/tasks/tasksSlice';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { getProject } from '../app/features/projects/projectsSlice';
import SubTasks from '../components/SubTasks';
import moment from 'moment';
import '../pages/tasks.css'
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Avatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';


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
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))

export default function TasksPage(props) {
  const [id] = useState(+props.match.params.id);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();
  const tasks = useSelector(state => getTasks(state, id));

  const project = useSelector(state => getProject(state, id));

  const dispatch = useDispatch();

  const onAdd = (name, description) => {
    dispatch(editNameDescription(name, description, id ));
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            <Link to='/projects'>
              <h1 style={{
                color: 'white',
              }}>Projects</h1>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        boxShadow={3}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '8rem', height: '8rem', borderRadius: '15px', textAlign: 'center' }}
      >
        <h2>{project?.name}</h2>
        <h3>{project?.shortSummary}</h3>
      </Box>
      {
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs>
              <h3>Task Names</h3>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item xs={6}>
              <TasksDialog onAdd={onAdd} />
              <h3>Tasks</h3>
              <Paper className={classes.paper}>
                {
                  tasks.map((task, index) => {
                    return (
                        <div key={index}>
                          <Box
                            boxShadow={2}
                            bgcolor="background.paper"
                            m={1}
                            p={1}
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                          >
                            <SubTasks taskID={task.id} />
                            <p>
                              <strong>{task.name}</strong>
                            </p>
                            <p>{task.description}</p>
                            <p>
                              <small>
                                {task.creationDate = moment().format('MM/DD/YY')}
                              </small>
                            </p>
                            <Avatar aria-label="recipe">T</Avatar>
                              <div style={{display: 'inline-flex', flexDirection: 'column'}}>
                                <IconButton  aria-label="delete" size="small">
                                  <DeleteIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="delete" size="small">
                                  <EditIcon fontSize="inherit" />
                                </IconButton>
                              </div>
                              <IconButton
                                  className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                  })}
                                  onClick={handleExpandClick}
                                  aria-expanded={expanded}
                                  aria-label="show more"
                                >
                                  <ExpandMoreIcon />
                              </IconButton>
                              {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <p>asdas</p>
                              </Collapse> */}
                          </Box>
                        </div>
                    )
                  })
                }
              </Paper>
            </Grid>
            <Grid item xs>
              <h3>Search</h3>
              <Paper className={classes.paper}>
                <TextField id="standard-search" placeholder='Search' label="Search" type="search" />
              </Paper>
            </Grid>
          </Grid>
        </div>
      }
    </>
  );
}
