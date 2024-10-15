import { useEffect, useState, memo } from 'react';
import { ITodo } from '../../models';
import useTodosStore from '../../store';

const Todo = memo(({ completed, id, label }: ITodo) => {
	useEffect(() => {
		console.log('Render ', id);
	}, []);
	const toggleCompleteTodo = useTodosStore((state) => state.toggleCompleteTodo);
	const renameTodo = useTodosStore((state) => state.renameTodo);
	const removeTodo = useTodosStore((state) => state.removeTodo);

	const [isEditing, setIsEditing] = useState(false);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			renameTodo(id, (e.target as HTMLInputElement).value);
			setIsEditing(false);
		}
	};

	return (
		<div className="todos-todo" key={id}>
			<button className="todos-change-btn" onClick={() => toggleCompleteTodo(id)}>
				{completed ? <></> : <></>}
			</button>
			{isEditing ? (
				<input type="text" value={label} onKeyDown={handleKeyDown} />
			) : (
				<span className="todos-label">{label}</span>
			)}
			<button className="todos-edit" onClick={() => setIsEditing(true)}>
				Edit
			</button>
			<button className="todos-delete" onClick={() => removeTodo(id)}>
				Delete
			</button>
		</div>
	);
});

export default Todo;
