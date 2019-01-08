import { gql } from "apollo-boost";

export const ME = gql`
  query Me {
    me {
      id
      name
    }
  }
`;

export const LOGIN = gql`
  mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      id
      name
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const REGISTER = gql`
  mutation Register($name: String!, $password: String!) {
    register(name: $name, password: $password) {
      id
      name
    }
  }
`;

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      completed
    }
  }
`;

export const CREATE_TODOS = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

export const DESTROY_TODO = gql`
  mutation DestroyTodo($id: String!) {
    destroyTodo(id: $id) {
      id
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $text: String, $completed: Boolean) {
    updateTodo(id: $id, text: $text, completed: $completed) {
      id
      text
      completed
    }
  }
`;
