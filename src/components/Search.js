import { Box, TextField } from '@material-ui/core';
import { useState } from 'react';

export default function Search({tasks}) {
    const [filtredTasks, setFiltredTasks] = useState([]);

    const handleFilter = (e) => {
        const newFilter = tasks.filter((task) => {
            return task.name.toLowerCase().includes(e.target.value.toLowerCase());
        });

        if(e.target.value === '') {
            setFiltredTasks([]);
        } else {
            setFiltredTasks(newFilter);
        }
    }

    return (
        <>
            <TextField
                placeholder='Search' 
                label='Search' 
                type='search'
                onChange={handleFilter}
            />
            {filtredTasks.length !== 0 && (
                filtredTasks.map(task => {
                    return (
                        <Box
                            key={task.id}
                            boxShadow={5}
                            bgcolor='background.paper'
                            m={1}
                            p={1}
                        >
                            <p>
                                <strong>{task.name}</strong>
                            </p>
                        </Box>
                    )
                })
            )}
        </>
    )
}