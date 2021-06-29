import { Link } from 'react-router-dom';
import '../styles/ProjectList.css';
import ProjectItem from './ProjectItem';


export default function ProjectList({projects, onDelete, onEdit}) {
    return (
        <>
            <div className='projectsPosition'>
            <Link to='/'>Projects</Link>

                <h3>PROJECT LIST</h3>
                {
                    (projects.length) ? (
                        projects.map((project, index) => {
                            return (
                                <ProjectItem 
                                    key={index} 
                                    project={project} 
                                    onDelete={onDelete}
                                    onEdit={onEdit}
                                />
                            );
                    })) : <p>No projects!</p>
                }
            </div>
        </>
    );
};