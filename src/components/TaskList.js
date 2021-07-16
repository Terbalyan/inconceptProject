import { useSelector } from 'react-redux';
import { getTasks } from '../app/features/tasks/tasksSlice';

export default function TaskList({projectId=null, parentTaskId=null, ItemComponent}) {

    const tasks = useSelector(state => getTasks(state, projectId, parentTaskId));

    return (
        <>
            <div>
                {
                    tasks.length ?
                        tasks.map(task => {
                            return (
                                <ItemComponent task={task} />
                            )    
                        }) 
                    : <p>Empty</p>
                }
            </div>
        </>
    )
}