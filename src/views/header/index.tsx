import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PALETTE } from '../header-web/color';



const HeaderContainer = styled.div`
	background-color: ${props => props.theme.HEADER_BG_COLOR};
	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.24);
	height: 56px;
	line-height: 56px;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 100;
`;

const BackButtonContainer = styled.div`
	display: inline;
	margin-left: 16px;
`;

const HeaderText = styled.div`
	color: ${PALETTE.BLACK};
	display: inline;
	font-family: Roboto;
	font-size: 18px;
	font-weight: 500;
	margin-left: 16px;
`;

declare global {
	interface Window {
		mpIsApp: boolean;
		mpFeatures: mpFeatures;
	}

	interface mpFeatures {
		download: boolean;
	}
}

const Header = () => {
	const [header, setHeader] = useState('Help Center');


	return (
		<HeaderContainer>
			<BackButtonContainer>
			</BackButtonContainer>
			<HeaderText>{header}</HeaderText>
		</HeaderContainer>
	);
};

export default Header;
