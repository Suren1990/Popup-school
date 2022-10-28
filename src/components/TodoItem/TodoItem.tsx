import { ChangeEvent } from 'react';
import { ITodo } from '../../models/ITodo';
import styles from './TodoItem.module.scss';

interface TodoItemProps {
    todo: ITodo;
    activeTab: string;
    completeTodo: (todo: ITodo) => void;
    deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, activeTab, deleteTodo, completeTodo }) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {        
        completeTodo({
            ...todo,
            isCompleted: e.target.checked,
        })
    }

    return (
        <div className={styles.todoitem}>
            <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={onChange}
            />
            <h4
                className={`${styles.todoitem__title} ${todo.isCompleted ? styles.todoitem__title_completed : ""}`}
            >{todo.title}</h4>
            {
                activeTab === "completed" && (
                    <button
                        className={styles.todoitem__delete}
                        onClick={() => deleteTodo(todo.id)}>
                        &#128465;</button>
                )}
        </div>
    );
};

export default TodoItem;
