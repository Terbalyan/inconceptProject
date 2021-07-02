import React from "react";
import ProjectList from '../components/ProjectList'
import ProjectForm from "../components/ProjectForm";
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, editNameShortSummary, deleteProj, editProj } from '../app/features/projects/projectsSlice';
import { getNamee } from "../app/features/names/namesSlice";



export default function ProjectsPage() {
    const dispatch = useDispatch();
    
    const projects = useSelector(getProjects);
    
    const onAdd = (name, shortSummary) => {
        dispatch(editNameShortSummary(name, shortSummary));
    }
    
    const onDelete = (deleteProject) => {
        dispatch(deleteProj(deleteProject));
    }
    
    const onEdit = (name, shortSummary, editProject) => {
        dispatch(editProj(name, shortSummary, editProject));
    }

    const getName = (name) => {
        dispatch(getNamee(name));
    }
    
    return (
        <>
            <ProjectForm onAdd={onAdd} />
            <ProjectList
                projects={projects}
                onDelete={onDelete}
                onAdd={onAdd}
                onEdit={onEdit}
                getName={getName}
            />
        </>
    )
}
