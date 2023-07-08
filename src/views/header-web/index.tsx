import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { PALETTE } from './color';
import BackTohome from '../../__utils/back.svg'
import HeaderLogo from './header-logo-turtlemint.svg'


const HeaderContainer = styled.div`
	background-color: ${props => props.theme.HEADER_BG_COLOR};
	box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.24);
	height: 60px;
	line-height: 56px;
	padding: 0 10%;
	position: fixed;
	top: 0;
	width: 100%;
	-webkit-transform: translate3d(0, 0, 0);
	-moz-transform: translate3d(0, 0, 0);
	z-index: 500;
    background: white;
`;

const HelpCentreText = styled.div`
	color: ${PALETTE.BLACK};
	display: inline-block;
	font-family: Roboto-Medium;
	font-size: 20px;
	font-weight: 500;
	margin-left: 8px;
`;

const BackToHomeText = styled.div`
	color: ${PALETTE.BLACK};
	display: inline-block;
	font-family: Roboto-Medium;
	font-size: 19px;
	font-weight: 500;
	float: right;
	padding-right: 8px;
`;

const HeaderIcon = styled.div`
	float: left;
	display: inline-block;
`;

const Header = () => {
	const dispatch = useDispatch();

	const goBack = () => {
		dispatch({
			type: 'LOGOUT'
		});
	};

	return (
		<>
			<HeaderContainer>
				<HeaderIcon>
					<img
						alt=""
						src={HeaderLogo}
						style={{ verticalAlign: 'middle' }}
					/>
				</HeaderIcon>
				<HelpCentreText>|&nbsp;&nbsp;&nbsp;Help Center</HelpCentreText>
				<img
					alt=""
					src={HeaderLogo}
					style={{ verticalAlign: 'middle' }}
				/>
				<BackToHomeText>
					<a
						href=''
					>
						<img
							alt=""
							src={BackTohome}
							style={{
								verticalAlign: 'middle',
								paddingBottom: '5px'
							}}
							onClick={goBack}
						/>
					</a>
					&nbsp;&nbsp;Back to Home
				</BackToHomeText>
			</HeaderContainer>
		</>
	);
};

export default Header;
