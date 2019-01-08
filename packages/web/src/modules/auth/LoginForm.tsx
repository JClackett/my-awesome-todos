import React, { useState, memo } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { LoginVariables } from "../../graphql/types";

interface UserProps {
  handleLogin: (user: LoginVariables) => void;
  handleRegister: (user: LoginVariables) => void;
}

function LoginForm(props: UserProps) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [error, setError] = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !password) return;
    const user = { name, password };
    try {
      if (register) {
        await props.handleRegister(user);
      } else {
        await props.handleLogin(user);
      }
    } catch (error) {
      setError(error.graphQLErrors);
    }
  };

  const handleToggleForm = () => {
    setName("");
    setPassword("");
    setRegister(!register);
    setError([]);
  };

  return (
    <StyledForm>
      <Header>{register ? "Register" : "Login"}</Header>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          placeholder="name"
          value={name}
          onChange={e => {
            e.preventDefault();
            setName(e.target.value);
          }}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={e => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <Seperator />
        <FormButtons>
          <Button text="submit" primary />
          <Button
            id="loginButton"
            onClick={handleToggleForm}
            text={register ? "login" : "register"}
          />
        </FormButtons>
        {error &&
          error.map(({ message }: any, i: number) => (
            <Error key={i}>{message}</Error>
          ))}
      </form>
    </StyledForm>
  );
}
export default memo(LoginForm);

const StyledForm = styled.div`
  width: 100%;
`;

const Header = styled.h2`
  margin-top: 0;
  color: ${props => props.theme.colorSecondary};
`;

const Seperator = styled.div`
  margin: ${props => props.theme.paddingMedium};
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

const FormButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Error = styled.p`
  width: 100%;
  color: ${props => props.theme.colorAccent};
`;
