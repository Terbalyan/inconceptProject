import React, { useState, useEffect } from 'react';
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
import SubTasks from '../components/SubTasks';
import Search from '../components/Search';
import { getProject } from '../app/features/projects/projectsSlice';
import moment from 'moment';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Avatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
  const [id] = useState(+props.match.params.id);

  const classes = useStyles();

  const dispatch = useDispatch();

  const project = useSelector(state => getProject(state, id));

  const tasks = useSelector(state => getTasks(state, id));
  const [task, setTask] = useState(tasks);
  const [open, setOpen] = useState(false);

  const onAdd = (name, description) => {
    dispatch(editNameDescription(name, description, id ));
  }

  function handleOnDragEnd(result) {
    if(!result.destination) return;
    const items = Array.from(task);
    const [reordredItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordredItem);

    setTask(items);
  }

  const [taskss] = useState(tasks);
  const [filtered, setFiltered] = useState([]);

  useEffect(
    _ => {
      setFiltered(taskss);
    },
    [taskss]
  );

  const search = val => {
    let currentTasks = [], newList = [];
    if (val !== '') {
      console.log(val);
      currentTasks = taskss;
      newList = currentTasks.filter(task => {
        console.log(task);
        const lc = task.name.toLowerCase();
        const filter = val.toLowerCase();
        
        return lc.includes(filter);
      });
    } else {
      newList = taskss;
    }
    setFiltered(newList);
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' >
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
        bgcolor='background.paper'
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
              <Paper className={classes.paper}>
                {
                  tasks.map((task, index) => {
                    return (
                      <div key={index}>
                        <Box
                          boxShadow={2}
                          bgcolor='background.paper'
                          m={1}
                          p={1}
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                          <p>
                            <strong>{task.name}</strong>
                          </p>
                        </Box>
                      </div>
                    )
                  })
                }
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TasksDialog onAdd={onAdd} />
              <h3>Tasks</h3>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='tasks'>
                  {provided => {
                    <Paper 
                      className={classes.paper} 
                      {...provided.droppableProps} 
                      ref={provided.innerRef}
                    >
                      {
                        tasks.map((task, index) => {
                          return (
                            <Draggable 
                              key={task.id} 
                              draggableId={task.id} 
                              index={index}
                            >
                              {provided => {
                                <div 
                                  {...provided.draggableProps} 
                                  {...provided.dragHandleProps} 
                                  ref={provided.innerRef}
                                >
                                  <Box
                                    boxShadow={2}
                                    bgcolor='background.paper'
                                    m={1}
                                    p={1}
                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                  >
                                  <p>
                                    <strong>{task.name}</strong>
                                  </p>
                                  <p>{task.description}</p>
                                  <p>
                                    <small>
                                      {task.creationDate = moment().format('MM/DD/YY')}
                                    </small>
                                  </p>
                                    <Avatar aria-label='recipe'>T</Avatar>
                                      <div style={{display: 'inline-flex', flexDirection: 'column'}}>
                                        <IconButton  aria-label='delete' size='small'>
                                          <DeleteIcon fontSize='inherit' />
                                        </IconButton>
                                        <IconButton aria-label='delete' size='small'>
                                          <EditIcon fontSize='inherit' />
                                        </IconButton>
                                      </div>
                                      <div>
                                        <IconButton size='small' onClick={() => setOpen(!open)}>
                                          {open ? <KeyboardArrowUpIcon fontSize='inherit' /> : <KeyboardArrowDownIcon fontSize='inherit' />}
                                        </IconButton>
                                      </div>
                                  </Box>
                                  <SubTasks open={open} taskID={task.id} />
                                </div>
                              }}
                            </Draggable>
                          )
                        })
                      }
                      {provided.placeholder}
                    </Paper>
                  }}
                </Droppable>
              </DragDropContext>
            </Grid>
            <Grid item xs>
              <h3>Search</h3>
              <Paper className={classes.paper}>
                <Search search={search}  />
                  <div>
                  {filtered.map(task => (
                    <div key={task.id}>
                      {task.name}
                    </div>
                  ))}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      }
    </>
  );
}
