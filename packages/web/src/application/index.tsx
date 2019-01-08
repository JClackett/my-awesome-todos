import React, { memo, useState, useEffect } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import styled, { ThemeProvider } from "styled-components";

import { darkTheme, lightTheme } from "./themes";
import { AppContext } from "./context";

import Nav from "../components/Nav";
import ThemeSwitcher from "./../components/ThemeSwitcher";

import Auth from "../modules/auth";
import Todos from "../modules/todos";

interface AppI {
	client: any;
}
function Application(props: AppI) {
	const [theme, setTheme] = useState("dark");

	useEffect(() => {
		const theme = localStorage.getItem("theme");
		if (!theme) return;
		setTheme(theme);
	}, []);

	const toggleTheme = (theme: string) => {
		setTheme(theme);
		localStorage.setItem("theme", theme);
	};

	const handleLogout = () => {
		props.client.resetStore();
	};

	return (
		<Query query={ME}>
			{({ loading, data, error }) => {
				const user = data && data.me;
				return (
					<AppContext.Provider
						value={{
							user,
							handleLogout,
							theme,
							toggleTheme,
						}}
					>
						<ThemeProvider theme={theme == "dark" ? darkTheme : lightTheme}>
							<Wrapper>
								<Nav />
								{loading ? null : error || !user ? <Auth /> : <Todos />}
								<ThemeSwitcher />
							</Wrapper>
						</ThemeProvider>
					</AppContext.Provider>
				);
			}}
		</Query>
	);
}

export default memo(Application);

const ME = gql`
	query Me {
		me {
			id
			name
		}
	}
`;

const Wrapper = styled.div`
	width: 100vw;
	min-height: 100vh;
	padding: 0 ${props => props.theme.paddingLarge};
	padding-bottom: ${props => props.theme.paddingLarge};
	background-color: ${props => props.theme.colorBackground};
	position: relative;
`;
