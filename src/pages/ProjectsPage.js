import React from "react";
import ProjectList from '../components/ProjectList'
import ProjectForm from "../components/ProjectForm";
import { useDispatch, useSelector } from 'react-redux';
import { editNameShortSummary, deleteProj, editProj } from '../app/features/projects/projectsSlice';

export default function ProjectsPage() {
    const dispatch = useDispatch();

    const projects = useSelector(state => state.projects);

    const onAdd = (name, shortSummary) => {
        //TODO change
        dispatch(editNameShortSummary(name, shortSummary));
    }

    const onDelete = (deleteProject) => {
        dispatch(deleteProj(deleteProject));
    }

    const onEdit = (name, shortSummary, editProject) => {
        dispatch(editProj(name, shortSummary, editProject));
    }

    return (
        <>
            <ProjectForm onAdd={onAdd} />
            <ProjectList
                projects={projects}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        </>
    )
}

