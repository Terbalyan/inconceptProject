import FormDialog from './FormDialog';
// import TasksDialog from './FormDialog';

export default function ProjectForm({onAdd}) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
        }}>
            <FormDialog onAdd={onAdd} />
        </form>
    );
};