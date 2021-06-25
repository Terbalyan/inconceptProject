import '../styles/ProjectList.css';
import ProjectItem from './ProjectItem';


export default function ProjectList({projects, onDelete}) {
    return (
        <>
            <div className='projectsPosition' onClick={() => {
                // console.log('asd');
            }}>
                <h3>PROJECT LIST</h3>
                {
                    (projects.length) ? (
                        projects.map((project) => {
                            return (
                                <ProjectItem 
                                    key={project.id} 
                                    project={project} 
                                    onDelete={onDelete}
                                />
                            );
                    })) : <p>No projects!</p>
                }
            </div>
        </>
    );
};