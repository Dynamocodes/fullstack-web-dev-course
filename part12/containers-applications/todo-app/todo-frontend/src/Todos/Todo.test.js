import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Todo from './Todo';

describe('<Todo/>', () => {
  let deleteTodoMock;
  let completeTodoMock;

  beforeEach(() => {
    deleteTodoMock = jest.fn();
    completeTodoMock = jest.fn();
  });

  test('The title and the completion status are displayed', () => {
    const todo = {
      text: 'first todo',
      done: false,
    };

    render(
      <Todo
        todo={todo}
        deleteTodo={deleteTodoMock}
        completeTodo={completeTodoMock}
      />
    );

    const todoTitle = screen.getByText('first todo');
    const status = screen.getByText('This todo is not done');
    const div = screen.getByTestId('todo');
    expect(todoTitle).toBeDefined();
    expect(status).toBeDefined();
    expect(div).toBeDefined();
    expect(div).toHaveTextContent('first todo');
    expect(div).toHaveTextContent('This todo is not done');
  });
});
