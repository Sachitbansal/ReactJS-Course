export function Header(props) {
    const {todos} = props;
    const todosLength = todos.length

    const isTasksPular = todosLength === 1 ? 'task' : 'tasks';
    return (
        <header>
            <h1 className="text-gradient">You have {todosLength} open {isTasksPular}</h1>
        </header>
    )
}