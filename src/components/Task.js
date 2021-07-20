import { Box, Avatar, IconButton, Collapse} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useState } from 'react';
import TaskList from './TaskList';
import moment from 'moment';
import {  addTask, deleteTask, editTask } from '../app/features/tasks/tasksSlice';
import { useDispatch } from 'react-redux';
import EditTaskDialog from './EditTaskDialog';
import TaskDialog from './TaskDialog';
import { useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react'

export default function Task({task, move, dropTask}) {
    
    const [{ isDragging }, drag] = useDrag({
        type: 'Task',
        item: task,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ handlerId }, drop] = useDrop({
        accept: 'Task',
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = task.index;
        
            if (dragIndex === hoverIndex) {
                return;
            }
        
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset()
        
            const hoverClientY = (clientOffset).y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
    
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
    
            move(item, task);
        },
        drop() {
            dropTask();
        }
    });
    
    const opacity = isDragging ? 0 : 1
    
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
    
    const ref = useRef(null)

    drag(drop(ref))

    return (
        <>
            <Box
                boxShadow={2}
                bgcolor='background.paper'
                m={1}
                p={1}
                style={{ display: 'flex', justifyContent: 'space-between', opacity: opacity }}
                ref={ref} data-handler-id={handlerId}
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
                timeout='auto' 
                unmountOnExit 
                style={{marginLeft: '10px'}}
            >
                <TaskList projectId={task.projectId} parentTaskId={task.id} ItemComponent={Task}/>
            </Collapse>
        </>
    )
}