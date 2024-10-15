import { useState, memo } from 'react';
import { ITodo } from '../../models';
import useTodosStore from '../../store';
import './index.scss';
import TrashDelete from '../../assets/TrashDelete.svg';
import Edit from '../../assets/Edit.svg';
import CheckTick from '../../assets/CheckTick.svg';

const Todo = memo(({ completed, id, label }: ITodo) => {
	const toggleCompleteTodo = useTodosStore((state) => state.toggleCompleteTodo);
	const renameTodo = useTodosStore((state) => state.renameTodo);
	const removeTodo = useTodosStore((state) => state.removeTodo);

	const [isEditing, setIsEditing] = useState(false);
	const [currentLabel, setCurrentLabel] = useState(label);

	const handleRename = (value: string) => {
		renameTodo(id, value);
		setIsEditing(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleRename((e.target as HTMLInputElement).value);
		}
	};

	const handleBlur = (e: React.FocusEvent) => {
		handleRename((e.target as HTMLInputElement).value);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentLabel(e.target.value);
	};

	return (
		<div className="todos-todo">
			<button
				className={`todos-change-btn ${completed ? 'todos-change-btn--completed' : ''}`}
				onClick={() => toggleCompleteTodo(id)}
			>
				{completed && <img src={CheckTick} alt="Completed" />}
			</button>

			{isEditing ? (
				<input
					className="todos-change-input"
					type="text"
					value={currentLabel}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					onBlur={handleBlur}
				/>
			) : (
				<span className={`todos-label ${completed ? 'todos-label--completed' : ''}`}>
					{label}
				</span>
			)}

			<div className="todos-options">
				<button className="todos-edit" onClick={() => setIsEditing(true)}>
					<img src={Edit} alt="Edit" />
				</button>
				<button className="todos-delete" onClick={() => removeTodo(id)}>
					<img src={TrashDelete} alt="Delete" />
				</button>
			</div>
		</div>
	);
});

export default Todo;
