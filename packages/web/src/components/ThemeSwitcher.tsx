import React, { memo, useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import { AppContext } from "../application/context";

const ThemeSwitcher = () => {
	const context = useContext(AppContext);
	return (
		<ButtonContainer>
			<Button
				variant={context.theme == "dark" ? "primary" : "default"}
				onClick={() =>
					context.toggleTheme(context.theme == "dark" ? "light" : "dark")
				}
			>
				{context.theme == "dark" ? "🌚 toggle theme" : "🌝 toggle theme"}
			</Button>
		</ButtonContainer>
	);
};

export default memo(ThemeSwitcher);

const ButtonContainer = styled.div`
	position: absolute;
	bottom: ${props => props.theme.paddingLarge};
	left: ${props => props.theme.paddingLarge};
`;
