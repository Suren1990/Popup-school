import { useRef, ChangeEvent } from 'react';
import styles from './AddTodo.module.scss';

interface AddTodoProps {
    addTodo: (title: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = inputRef.current?.value;

        if (title) {
            addTodo(title);
            inputRef.current.value = "";
        }
        
        return;        
    }

    return (
        <form
            className={styles.addtodo}
            onSubmit={onSubmit}
        >
            <input
                type="text"
                className={styles.addtodo__input}
                ref={inputRef}
                placeholder='add details'
            />
            <button className={styles.addtodo__btn_add}>Add</button>
        </form>
    );
};

export default AddTodo;
