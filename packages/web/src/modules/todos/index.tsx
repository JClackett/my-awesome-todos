import React, { memo } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import TodosList from "./TodosList";
import TodoForm from "./TodoForm";
import { GET_TODOS } from "../../graphql/queries";

function Todos() {
	return (
		<Query query={GET_TODOS}>
			{({ loading, error, data }) => {
				if (loading) return null;
				if (error) {
					return (
						<pre>
							{error.graphQLErrors.map(({ message }, i) => (
								<Error key={i}>{message}</Error>
							))}
						</pre>
					);
				}
				return (
					<TodosBoard>
						<TodoForm />
						{data && data.todos && <TodosList todos={data.todos} />}
					</TodosBoard>
				);
			}}
		</Query>
	);
}

export default memo(Todos);

const Error = styled.div`
	color: ${props => props.theme.colorAccent};
	font-size: 1.6rem;
`;
const TodosBoard = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: 0 auto;
	width: 98%;
	max-width: 600px;
	padding: ${props => props.theme.paddingLarge};
	background-color: ${props => props.theme.colorBoard};
	border-radius: ${props => props.theme.borderRadius};
`;
