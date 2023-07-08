import React from "react";
import styled from "styled-components";
import Header from "../header-web";
import ChatBot from "../bot";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-top: 40px;
    margin-left: 80px;
`

const TechnologyMahasay: React.FC = () => {

    // function postYourAdd () {
    //     var iframe = $("#forPostyouradd");
    //     iframe.attr("src", iframe.data("src")); 
    // }



    return <>
        <Header />
        {/* <ChatWrapper onClick={postYourAdd}>Chat with us</ChatWrapper> */}
        {/* <StyledIframe id="forPostyouradd" data-src="localhost:8026" src="http://localhost:8026/chat-bot"
        title="myBook"
        ></StyledIframe> */}
        <ChatBot />

    </>
}


export default TechnologyMahasay;

const ChatWrapper = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
	margin: 80px;
    background: #4bc84b;
    padding: 8px;
    border-radius: 17px;
    overflow: hidden;
    z-index: 200;
    cursor: pointer;
`;

const StyledIframe = styled.iframe`
    position: fixed;
    bottom: 0;
    right: 0;
	margin-right: 80px;
    width: 500px; 
    height: 750px;
    background: '#fffff';
    margin-bottom: 150px;
`