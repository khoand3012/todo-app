import { useEffect, useState } from 'react';
import './App.scss';
import Input from './components/Input';
import { ITodo } from './models';
import useTodosStore from './store';
import Todo from './components/Todo';
import { compress } from 'lz-string';

function App() {
	const { todos, removeCompletedTodos } = useTodosStore();

	const [filter, setFilter] = useState('');
	const [displayedTodos, setDisplayedTodos] = useState<ITodo[]>([]);

	useEffect(() => {
		let newDisplayedTodos;
		switch (filter) {
			case 'completed':
				newDisplayedTodos = todos.filter((todo) => todo.completed);
				setDisplayedTodos(newDisplayedTodos);
				break;
			case 'incompleted':
				newDisplayedTodos = todos.filter((todo) => !todo.completed);
				setDisplayedTodos(newDisplayedTodos);
				break;
			default:
				setDisplayedTodos(todos);
				return;
		}
	}, [todos, filter]);

	useEffect(() => {
		const savedData = compress(JSON.stringify(todos));
		localStorage.setItem('todos', savedData);
	}, [todos]);

	return (
		<>
			<h1 className="todos-title">Todos App</h1>
			<Input />
			<div className="todos-list">
				{displayedTodos.length > 0 ? (
					displayedTodos.map((displayedTodo) => (
						<Todo {...displayedTodo} key={displayedTodo.id} />
					))
				) : (
					<span className="todos-placeholder">Nothing to show here...</span>
				)}
			</div>
			<div className="todos-filters">
				<button className="todo-filter-all" onClick={() => setFilter('')}>
					Show All
				</button>
				<button className="todo-filter-completed" onClick={() => setFilter('completed')}>
					Show Completed
				</button>
				<button className="todo-filter-completed" onClick={() => setFilter('incompleted')}>
					Show Incompleted
				</button>
				<button className="todo-filter-completed" onClick={() => removeCompletedTodos()}>
					Clear Completed
				</button>
			</div>
		</>
	);
}

export default App;
