import { gql } from "apollo-server-express";

export const typeDefs = gql`
	type Todo {
		id: ID!
		text: String!
		completed: Boolean!
	}
	type User {
		id: ID!
		name: String!
		password: String!
	}

	type Query {
		todos: [Todo]
		me: User
	}

	type Mutation {
		createTodo(text: String!): Todo
		updateTodo(id: String!, text: String, completed: Boolean): Todo
		destroyTodo(id: String!): Todo
		register(name: String!, password: String!): User
		login(name: String!, password: String!): User
		me: User
		logout: Boolean
		updateUser(name: String): User
	}
`;
