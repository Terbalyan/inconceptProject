import { combineReducers, createStore } from 'redux';
import projectsReducer, { initialProjets } from './features/projects/projectsSlice';
import tasksReducer, { initialTasks } from './features/tasks/tasksSlice';


const store = createStore(combineReducers({
    projects: projectsReducer,
    tasks: tasksReducer
}), {
    projects: initialProjets,
    tasks: initialTasks
});

export default store;