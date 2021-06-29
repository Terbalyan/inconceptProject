import FormDialog from './FormDialog';

export default function ProjectForm({onAdd}) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
        }}>
            <FormDialog onAdd={onAdd} /> 
        </form>
    );
};