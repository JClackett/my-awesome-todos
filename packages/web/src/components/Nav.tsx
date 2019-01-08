import React, { PureComponent } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";

import { AppContext } from "../application/context";
import Button from "./Button";
import { LOGOUT } from "../graphql/queries";

export default class Nav extends PureComponent {
  render() {
    return (
      <AppContext.Consumer>
        {(context: any) => (
          <NavContainer>
            <NavHeader>My amazing todo list</NavHeader>
            {context.user && (
              <Mutation mutation={LOGOUT} onCompleted={context.handleLogout}>
                {logout => <Button onClick={logout} text="logout" />}
              </Mutation>
            )}
          </NavContainer>
        )}
      </AppContext.Consumer>
    );
  }
}

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  padding: ${props => props.theme.paddingMedium};
`;

const NavHeader = styled.h1`
  color: ${props => props.theme.colorPrimary};
`;
