import { combineReducers, createStore } from 'redux';
import NamesReducer, { initialName } from './features/names/namesSlice';
import projectsReducer, { initialProjets } from './features/projects/projectsSlice';


const store = createStore(combineReducers({
    projects: projectsReducer,
    names: NamesReducer
}), {
    projects: initialProjets,
    names: initialName
});

export default store;