import React, { PureComponent } from "react";
import TodoItem from "./TodoItem";
import styled from "styled-components";
import { GetTodos } from "../../graphql/types";

export default class TodosList extends PureComponent<GetTodos> {
  render() {
    const { todos } = this.props;
    return (
      <TodosContainer>
        <Header>My Todos</Header>
        <TodoListWrapper data-testid="todo-list">
          {!todos ? (
            <StyledText>loading ...</StyledText>
          ) : todos && todos.length > 0 ? (
            todos.map((todo: any) => {
              return <TodoItem key={todo.id} todo={todo} />;
            })
          ) : (
            <StyledText as="h4">No todos yet, get doing!</StyledText>
          )}
        </TodoListWrapper>
      </TodosContainer>
    );
  }
}

const TodosContainer = styled.div`
  width: 100%;
`;

const TodoListWrapper = styled.div`
  width: 100%;
`;

const Header = styled.h3`
  color: ${props => props.theme.colorSecondary};
`;

const StyledText = styled.p`
  text-align: center;
  color: ${props => props.theme.colorAccent};
`;
