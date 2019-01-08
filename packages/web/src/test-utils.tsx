import React from "react";
import { render } from "react-testing-library";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const uri =
  process.env.NODE_ENV === "production"
    ? "https://my-awesome-todos.herokuapp.com/graphql"
    : "http://localhost:5000/graphql";

const client = new ApolloClient({
  uri,
  credentials: "include"
});

const customRender = (node: any, options: any) => {
  return render(
    <ApolloProvider client={client}>{node}</ApolloProvider>,
    options
  );
};

// re-export everything
export * from "react-testing-library";

// override render method
export { customRender as render };
