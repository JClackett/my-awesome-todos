import React from 'react';
import { render } from '../../../test-utils';
import TodosList from '../TodosList';

test('should render todos', () => {
	const todos = [
		{ id: '1', text: 'test', completed: true },
		{ id: '2', text: 'test2', completed: true },
	];
	const { getByTestId } = render(<TodosList todos={todos} />);

	const todoList = getByTestId('todo-list');

	expect(todoList.children.length).toBe(2);
});

test('should render message if no todos', () => {
	const todos = [];
	const { getByText } = render(<TodosList todos={todos} />);
	const message = getByText('No todos yet, get doing!');
	expect(message).toBeDefined();
});
