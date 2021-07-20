import { Box, IconButton, Collapse } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useState } from 'react';
import TaskList from './TaskList';

export default function SummaryTask({task}) {
    const [open, setOpen] = useState(false);

    return (
        <>
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
                <TaskList projectId={task.projectId} parentTaskId={task.id} ItemComponent={SummaryTask} />
            </Collapse>
        </>
    )
}