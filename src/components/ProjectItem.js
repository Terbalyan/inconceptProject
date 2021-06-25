import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';

export default function ProjectItem({project, onDelete}) {
    return (
        <div key={project.id} className='inlineDisplay'>
            <div className='headerPossition'>
                <p>{project.icon}</p>
                <h3 id='b'>{project.name}</h3>
            </div>
            <div className='middlePossition'>
                <h3>{project.shortSummary}</h3>
                <hr/>
                <span className='date'>
                    {project.creationDate = moment().format('MM/DD/YY')}
                </span>
            </div>
            <div className='possition'>
                <Button 
                    size='small' 
                    onClick={() => onDelete(project)}
                >
                    <DeleteIcon
                        color='primary' 
                    />Delete
                </Button>
                <div>
                    <Button
                        size='small' 
                        onClick={() => {
                            // setButtonProp(true);
                            // setName(project.name);
                            // setShortSummary(project.shortSummary);
                        }}
                    >
                        Edit<EditIcon color='primary' />
                    </Button>
                </div>
            </div>
        </div>
    );
};