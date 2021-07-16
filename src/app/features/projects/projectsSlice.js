import nextId from "react-id-generator";
import AssignmentIcon from '@material-ui/icons/Assignment';
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
                    id: state[state.length - 1].id + 1,
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
            item.name = payload.name;
            item.shortSummary = payload.shortSummary;

            return [...state];
        default:
            return state;
    } 
}

export const initialProjets = [
    {
        id: 1,
        name: 'Project 1',
        shortSummary: 'abc',
        icon: <AssignmentIcon color='primary' />,
        creationDate: '',
    },
    {
        id: 2,
        name: 'Project 2',
        shortSummary: 'qwe',
        icon: <AssignmentIcon color='primary' />,
        creationDate: ''
    },
    {
        id: 3,
        name: 'Project 3',
        shortSummary: 'dfg',
        icon: <AssignmentIcon color='primary' />,
        creationDate: ''
    }
];

export function getProject(state, id) {
    return state.projects.find(project => project.id === id);
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