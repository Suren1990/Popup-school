import { useState, useEffect } from 'react';
import './App.css';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';
import Tabs from './components/Tabs/Tabs';
import { ITodo } from './models/ITodo';

function App() {
  const tabList = ['all', 'active', 'completed'];

  const [activeTab, setActiveTab] = useState('all');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const todosStorage = JSON.parse(localStorage.getItem("Todos") || JSON.stringify(todos));

  const addTodo = (title: string) => {
    const newTodo: ITodo = {
      id: String(Math.random()),
      title,
      isCompleted: false,
    };

    setTodos((prev) => {
      if (title) {
        const newTodoList = [...prev, newTodo];
        localStorage.setItem("Todos", JSON.stringify(newTodoList));
        return newTodoList;
      }
      return prev;
    })
  }

  const completeTodo = (todo: ITodo) => {
    setTodos((prev) => {
      const newTodoList = prev.map((currentTodo) => {
        if (currentTodo.id === todo.id) {
          return todo;
        }
        return currentTodo;
      });
      localStorage.setItem("Todos", JSON.stringify(newTodoList));
      return newTodoList;
    })
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => {
      const newTodoList = prev.filter((todo) => todo.id !== id);
      localStorage.setItem("Todos", JSON.stringify(newTodoList));
      return newTodoList;
    })
  }

  const deleteAllCompleted = () => {
    setTodos((prev) => {
      const newTodoList = prev.filter((todo) => !todo.isCompleted);
      localStorage.setItem("Todos", JSON.stringify(newTodoList));
      return newTodoList;
    })
  }

  useEffect(() => {
    if (todosStorage) {
      setTodos(todosStorage);
    }
  }, [])

  return (
    <div className="todo">
      <h1 className='todo__main_title'>#todo</h1>
      <Tabs
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <AddTodo addTodo={addTodo} />
      <TodoList
        todos={todos}
        activeTab={activeTab}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
        deleteAllCompleted={deleteAllCompleted}
      />
    </div>
  );
}

export default App;
