import React, { PureComponent } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { UPDATE_TODO, DESTROY_TODO, GET_TODOS } from "../../graphql/queries";
import {
  UpdateTodo_updateTodo,
  DestroyTodoVariables,
  DestroyTodo,
  UpdateTodoVariables,
  UpdateTodo
} from "../../graphql/types";

interface TodoItemProps {
  todo: UpdateTodo_updateTodo;
  key: string;
}
interface TodoItemState {
  text: string;
  completed: boolean;
}

export default class TodoItem extends PureComponent<
  TodoItemProps,
  TodoItemState
> {
  state = {
    text: this.props.todo.text,
    completed: this.props.todo.completed
  };
  render() {
    const { todo } = this.props;
    const { text, completed } = this.state;
    return (
      <TodoWrapper>
        <Mutation<DestroyTodo, DestroyTodoVariables>
          mutation={DESTROY_TODO}
          key={todo.id}
          update={(cache, { data }) => {
            const { todos }: any = cache.readQuery({
              query: GET_TODOS
            });
            const newTodos = todos.filter(
              (todo: UpdateTodo_updateTodo) => todo.id !== data!.destroyTodo!.id
            );
            cache.writeQuery({
              query: GET_TODOS,
              data: { todos: newTodos }
            });
          }}
        >
          {destroyTodo => (
            <Mutation<UpdateTodo, UpdateTodoVariables>
              mutation={UPDATE_TODO}
              key={todo.id}
            >
              {updateTodo => {
                return (
                  <TodoContainer>
                    <Input
                      value={text}
                      onBlur={() =>
                        updateTodo({
                          variables: { id: todo.id, text }
                        })
                      }
                      onChange={e => this.setState({ text: e.target.value })}
                    />

                    <Actions>
                      <CheckboxInput
                        onClick={() => {
                          this.setState({ completed: !this.state.completed });
                          updateTodo({
                            variables: {
                              id: todo.id,
                              completed: !todo.completed
                            }
                          });
                        }}
                      >
                        {completed ? (
                          <i className="far fa-check-square" />
                        ) : (
                          <i className="far fa-square" />
                        )}
                      </CheckboxInput>
                      <CheckboxInput
                        as="div"
                        onClick={() =>
                          destroyTodo({
                            variables: { id: todo.id }
                          })
                        }
                      >
                        🗑
                      </CheckboxInput>
                    </Actions>
                  </TodoContainer>
                );
              }}
            </Mutation>
          )}
        </Mutation>
      </TodoWrapper>
    );
  }
}

const TodoWrapper = styled.div`
  width: 100%;
`;

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  outline: 0;
  border: 0;
  font-size: 1.2rem;
  font-family: inherit;
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.paddingSmall};
  color: ${props => props.theme.colorText};

  &:focus {
    box-shadow: inset 0 0 0 2px ${props => props.theme.colorBackground};
  }
`;

const Actions = styled.div`
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: ${props => props.theme.paddingSmall};
`;

const CheckboxInput = styled.div`
  cursor: pointer;
  font-size: 1.4rem;

  i {
    color: ${props => props.theme.colorAccent};
  }
`;
