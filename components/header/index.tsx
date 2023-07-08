import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	background: #033824;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 20px 0;
	width: 100%;
	position: fixed;
	top: 0;
	box-shadow: 0 2px 10px 0 rgba(102, 143, 211, 0.33);
	color: #FFFFFF;
	z-index: 3;
	height: 80px;
`;

const HeaderWrapper = styled.div`
	margin: 0 20px;
`;

const AppHeader: React.FC = () => {
	return (
		<Wrapper>
			<HeaderWrapper>
				<p style={{ fontSize: 24, margin: 0, paddingLeft: 50 }}>Campaign Mangement</p>
			</HeaderWrapper>
		</Wrapper>
	);
};


export default AppHeader;
