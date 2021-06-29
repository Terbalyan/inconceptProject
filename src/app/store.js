import { combineReducers, createStore } from 'redux';
import projectsReducer, { initialProjets } from './features/projects/projectsSlice';


const store = createStore(combineReducers({
    projects: projectsReducer,
}), {
    projects: initialProjets,
});

export default store;