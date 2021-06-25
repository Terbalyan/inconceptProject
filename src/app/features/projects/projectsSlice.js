import AssignmentIcon from '@material-ui/icons/Assignment';

export default function projectsReducer(state=[], action) {
    if(action.type === 'onAdd') {
        // ...
    }

    return state;
}

export const initialProjets = [
    {
        id: Math.random(),
        name: 'dasd',
        shortSummary: 'asdasdasd',
        icon: <AssignmentIcon color='primary' />,
        creationDate: ''
    },
    {
        id: Math.random(),
        name: 'dasd',
        shortSummary: 'asdasdasd',
        icon: <AssignmentIcon color='primary' />,
        creationDate: ''
    },
    {
        id: Math.random(),
        name: 'dasd',
        shortSummary: 'asdasdasd',
        icon: <AssignmentIcon color='primary' />,
        creationDate: ''
    }
];