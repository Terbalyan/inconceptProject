import ProjectItem from './ProjectItem';
import '../styles/ProjectList.css';

export default function ProjectList({projects, onDelete, onEdit}) {
    return (
        <div className='projectsPosition'>
            <h3>PROJECTS</h3>
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
    );
};