import React, { SFC, memo, ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: string;
}

const Button: SFC<ButtonProps> = props => {
	return <StyledButton type="submit" {...props} />;
};

export default memo(Button);

const StyledButton = styled("button")<{ variant?: string }>`
	outline: 0;
	cursor: pointer;
	font-family: inherit;
	min-width: 180px;
	font-size: 1.2rem;
	border: 0;
	color: ${p =>
		p.variant === "primary" ? p.theme.colorBackground : p.theme.colorPrimary};
	background-color: ${p =>
		p.variant === "primary" ? p.theme.colorPrimary : "transparent"};
	border: 2px solid ${p => p.theme.colorPrimary};
	border-radius: ${p => p.theme.borderRadius};
	padding: ${p => p.theme.paddingSmall};
`;
