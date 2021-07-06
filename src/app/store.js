import { combineReducers, createStore } from 'redux';
import projectsReducer, { initialProjets } from './features/projects/projectsSlice';
import subTasksReducer, { initialSubTasks } from './features/tasks/subTasksSlice';
import tasksReducer, { initialTasks } from './features/tasks/tasksSlice';


const store = createStore(combineReducers({
    projects: projectsReducer,
    tasks: tasksReducer,
    subTasks: subTasksReducer
}), {
    projects: initialProjets,
    tasks: initialTasks,
    subTasks: initialSubTasks,
});

export default store;