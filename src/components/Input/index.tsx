import './index.scss';

export default function Input() {
	const handleInput = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			console.log((event.target as HTMLInputElement).value);
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
