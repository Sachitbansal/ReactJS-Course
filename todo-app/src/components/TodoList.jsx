import { TodoCard } from "./TodoCard.jsx";

export function TodoList(props) {
    const { todos, selectedTab } = props;
    const filterTodosList = selectedTab === "All" ? todos : selectedTab === "Compelted" ? todos.filter(val => val.completed) : todos.filter(val => !val.completed);

    return (
        <>
            {filterTodosList.map((todo, todoIndex) => {
                return (
                    <TodoCard
                        key={todoIndex}
                        todo={todo} />
                )
            })}

        </>
    )
}