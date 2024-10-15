import { create } from 'zustand';
import { ITodo } from '../models';

interface ITodosState {
	todos: ITodo[];
	addTodo: (label: string) => void;
	removeTodo: (id: string) => void;
	renameTodo: (id: string, newLabel: string) => void;
	removeCompletedTodos: () => void;
    toggleCompleteTodo: (id: string) => void;
}

const initialTodosString = localStorage.getItem('todos');
let initialTodos: ITodo[] = [];
if (initialTodosString) {
	try {
		initialTodos = JSON.parse(initialTodosString);
	} catch (e) {
		console.error(e);
		initialTodos = [];
	}
}

const useTodosStore = create<ITodosState>()((set) => ({
	todos: initialTodos,
	addTodo: (label: string) => {
		set((state) => {
			const newTodo: ITodo = {
				id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
				label,
				completed: false,
			};
			return { todos: [...state.todos, newTodo] };
		});
	},
	renameTodo: (id: string, newLabel: string) => {
		set((state) => {
			const updatedTodos = state.todos.map((todo) =>
				todo.id === id ? { ...todo, label: newLabel } : todo
			);
			return { todos: updatedTodos };
		});
	},
	removeTodo: (id: string) => {
		set((state) => ({
			todos: state.todos.filter((todo) => todo.id !== id),
		}));
	},
	removeCompletedTodos: () => {
		set((state) => ({
			todos: state.todos.filter((todo) => !todo.completed),
		}));
	},
	toggleCompleteTodo: (id: string) => {
		set((state) => {
			const updatedTodos = state.todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			);
			return { todos: updatedTodos };
		});
	},
}));

export default useTodosStore;
