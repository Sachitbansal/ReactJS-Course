import { TodoCard } from "./TodoCard.jsx";

export function TodoList(props) {
    const { todos, selectedTab, handleCompleteTodo } = props;
    const filterTodosList = selectedTab === "All" ? todos : selectedTab === "Compelted" ? todos.filter(val => val.completed) : todos.filter(val => !val.completed);

    return (
        <>
            {filterTodosList.map((todo, todoIndex) => {
                return (
                    <TodoCard
                        key={todoIndex}
                        handleCompleteTodo={handleCompleteTodo}
                        todoIndex={todos.findIndex(val => val.input == todo.input)}
                        {...props}
                        todo={todo} />
                )
            })}

        </>
    )
}