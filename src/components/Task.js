import { Box, Avatar, IconButton, Collapse} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import TaskList from './TaskList';
import moment from 'moment';
import {  addTask, deleteTask, editTask } from '../app/features/tasks/tasksSlice';
import { useDispatch } from 'react-redux';
import EditTaskDialog from './EditTaskDialog';
import TaskDialog from './TaskDialog';

export default function Task({task}) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const addSubTask = (subTask) => {
        dispatch(addTask(subTask));
    }

    const $delete = (taskId) => {
        dispatch(deleteTask(taskId));
    }

    const edit = (task) => {
        dispatch(editTask(task));
    }

    return (
        <>
            <Draggable 
                key={task.id} 
                draggableId={task.id.toString()} 
                index={task.index}
            >
                {provided => {
                    return <div 
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
                        <TaskDialog 
                            projectId={task.projectId}
                            parentTaskId={task.id}
                            onAdd={addSubTask}
                        />
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
                        <div>
                            <IconButton
                                aria-label='delete'
                                size='small' 
                                onClick={() => {
                                    $delete(task.id);
                                }}
                            >
                                <DeleteIcon fontSize='inherit' />
                            </IconButton>
                            <EditTaskDialog 
                                task={task}
                                onEdit={edit}
                            />
                        </div>

                        <div>
                            <IconButton size='small' onClick={() => setOpen(!open)}>
                                {
                                    open ? 
                                    <KeyboardArrowUpIcon fontSize='inherit' /> : 
                                    <KeyboardArrowDownIcon fontSize='inherit' />
                                }
                            </IconButton> 
                            
                        </div>

                    </Box>
                    <Collapse
                        in={open}
                        timeout='auto' unmountOnExit style={{marginLeft: '10px'}}
                    >
                        <TaskList projectId={task.projectId} parentTaskId={task.id} ItemComponent={Task}/>
                    </Collapse>
                </div>
                }}
            </Draggable>
        </>
    )
}