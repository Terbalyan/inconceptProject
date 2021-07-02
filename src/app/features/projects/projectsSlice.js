import AssignmentIcon from '@material-ui/icons/Assignment';
import { nanoid } from 'nanoid'
export const ON_ADD = 'ON_ADD';
export const ON_DELETE = 'ON_DELETE';
export const ON_EDIT = 'ON_EDIT';

export default function projectsReducer(state=[], action) {
    const payload = action.payload;

    switch (action.type) {
        case ON_ADD:
            return [
                ...state,
                {
                    id: nanoid(),
                    name: payload.name,
                    shortSummary: payload.shortSummary,
                    icon: <AssignmentIcon color='primary' />,
                    creationDate: ''
                }
            ];
        case ON_DELETE:
            return state.filter(proj => proj.id !== payload.id);
        case ON_EDIT:
            let item = state.find(proj => proj.id === payload.id);
            item.name = payload.name
            item.shortSummary = payload.shortSummary

            return [...state];
        default:
            return state;
    } 
}

export const initialProjets = [
    {
        id: nanoid(),
        name: 'Project 1',
        shortSummary: 'abc',
        icon: <AssignmentIcon color='primary' />,
        creationDate: ''
    },
    {
        id: nanoid(),
        name: 'Project 2',
        shortSummary: 'qwe',
        icon: <AssignmentIcon color='primary' />,
        creationDate: ''
    },
    {
        id: nanoid(),
        name : 'Project 3',
        shortSummary: 'dfg',
        icon: <AssignmentIcon color='primary' />,
        creationDate: ''
    }
];

export function getProjects(state) {
    return state.projects;
}

export function editNameShortSummary(newName, newShortSummary) {
    return {
        type: ON_ADD,
        payload: {
            name: newName,
            shortSummary: newShortSummary
        }
    }
}

export function deleteProj(newDelProj) {
    return {
        type: ON_DELETE,
        payload: {
          id: newDelProj.id
        }
    }
}

export function editProj(newName, newShortSummary, newEditProj) {
    return {
        type: ON_EDIT,
        payload: {
            name: newName,
            shortSummary: newShortSummary,
            id: newEditProj.id,
        }
    }
}