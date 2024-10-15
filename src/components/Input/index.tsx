import useTodosStore from '../../store';
import './index.scss';

export default function Input() {
	const addTodo = useTodosStore((state) => state.addTodo);

	const handleInput = (event: React.KeyboardEvent) => {
		const newTodoValue = (event.target as HTMLInputElement).value;
		if (event.key === 'Enter' && newTodoValue) {
			addTodo(newTodoValue);
			(event.target as HTMLInputElement).value = '';
		}
	};
	return (
		<input
			type="text"
			onKeyDown={handleInput}
			className="todos-input"
			placeholder="What needs to be done?"
		/>
	);
}
