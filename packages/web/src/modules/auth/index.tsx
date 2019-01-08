import React, { memo } from "react";
import { Mutation } from "react-apollo";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { LOGIN, REGISTER, ME } from "../../graphql/queries";
import {
  LoginVariables,
  Login,
  RegisterVariables,
  Register
} from "../../graphql/types";

const Auth = () => {
  return (
    <AuthBoard>
      <Mutation<Login, LoginVariables>
        mutation={LOGIN}
        update={(cache, { data }) => {
          cache.writeQuery({
            query: ME,
            data: { me: data!.login }
          });
        }}
      >
        {login => (
          <Mutation<Register, RegisterVariables>
            mutation={REGISTER}
            update={(cache, { data }) => {
              cache.writeQuery({
                query: ME,
                data: { me: data!.register }
              });
            }}
          >
            {register => (
              <LoginForm
                handleRegister={(user: any) =>
                  register({ variables: { ...user } })
                }
                handleLogin={(user: any) => login({ variables: { ...user } })}
              />
            )}
          </Mutation>
        )}
      </Mutation>
    </AuthBoard>
  );
};

export default memo(Auth);

const AuthBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  max-width: 600px;
  padding: ${props => props.theme.paddingLarge};
  background-color: ${props => props.theme.colorBoard};
  border-radius: ${props => props.theme.borderRadius};
`;
