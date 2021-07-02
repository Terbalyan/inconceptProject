import ProjectItem from './ProjectItem';
import '../styles/ProjectList.css';

export default function ProjectList({projects, onDelete, onEdit, getName}) {
    return (
        <div className='projectsPosition'>
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
                                getName={getName}
                            />
                        );
                })) : <p>No projects!</p>
            }
        </div>
    );
};