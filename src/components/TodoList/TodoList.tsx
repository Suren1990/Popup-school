import { ITodo } from '../../models/ITodo';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';

interface TodoListProps {
    todos: ITodo[];
    activeTab: string;
    completeTodo: (todo: ITodo) => void;
    deleteTodo: (id: string) => void;
    deleteAllCompleted: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, activeTab, deleteTodo, completeTodo, deleteAllCompleted }) => {
    let todosByTab = todos;

    if (activeTab === 'active') {
        todosByTab = todos.filter((todo) => !todo.isCompleted);
    }

    if (activeTab === 'completed') {
        todosByTab = todos.filter((todo) => todo.isCompleted);
    }

    return (
        <div className={styles.todolist}>
            {
                !!todosByTab.length ? (
                    <>
                        <div className={styles.todolist__content}>
                            {
                                todosByTab.map((todo) => (
                                    <TodoItem
                                        todo={todo}
                                        activeTab={activeTab}
                                        key={todo.id}
                                        completeTodo={completeTodo}
                                        deleteTodo={deleteTodo}
                                    />
                                ))
                            }
                        </div>
                        {
                            activeTab === 'completed' && (
                                <button
                                    className={styles.todolist__btn_delete}
                                    onClick={deleteAllCompleted}
                                ><span>&#128465;</span> delete all</button>
                            )}
                    </>
                ) : (
                    <h2 className={styles.todolist__notodo}>No Items in the {activeTab}!</h2>
                )
            }
        </div>
    );
};

export default TodoList;
