import React, { useState, memo } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { CREATE_TODOS, GET_TODOS } from "../../graphql/queries";
import { CreateTodoVariables, CreateTodo } from "../../graphql/types";

function TodoForm() {
  const [text, setText] = useState("");
  return (
    <Mutation<CreateTodo, CreateTodoVariables>
      mutation={CREATE_TODOS}
      update={(cache, { data }) => {
        const { todos }: any = cache.readQuery({ query: GET_TODOS });
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: [data!.createTodo, ...todos] }
        });
      }}
    >
      {createTodo => (
        <StyledForm>
          <form
            onSubmit={e => {
              e.preventDefault();
              createTodo({ variables: { text } });
              setText("");
            }}
          >
            <Input
              onChange={e => setText(e.target.value)}
              value={text}
              placeholder="add a new todo"
            />
          </form>
        </StyledForm>
      )}
    </Mutation>
  );
}

export default memo(TodoForm);

const StyledForm = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  margin: 0;
  font-family: inherit;
  outline: none;
  font-size: 1.4rem;
  background-color: ${props => props.theme.colorBackground};
  color: ${props => props.theme.colorAccent};
  border-radius: ${props => props.theme.borderRadius};
  border: 2px solid ${props => props.theme.colorBackground};
  padding: ${props => props.theme.paddingMedium};

  &::placeholder {
    font-size: 1.4rem;
  }
`;
