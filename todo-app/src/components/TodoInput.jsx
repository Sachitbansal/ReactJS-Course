import { useState } from 'react'


export function TodoInput(props) {

    const { handleAddTodo } = props;
    const [inputValue, setInputValue] = useState('');

    return (
        <div className="input-container">
            <input value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} placeholder="Add Task" />
            <button onClick={() => {
                if (!inputValue) { return }
                handleAddTodo(inputValue);
                setInputValue(''); // Clear input after adding
            }}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}