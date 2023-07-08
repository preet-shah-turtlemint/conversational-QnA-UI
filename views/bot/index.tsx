import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from '@turtlemint/mint-ui';
import { AudioOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import ChatResponseSelector from "./selector";
import { useDispatch } from "react-redux";
import { askBot, chatWithAudio, pushMessage } from "./reducer";
import BotIcon from './bot.svg';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: white;
    margin-top: 30px;
    heigth: 10$;
`
const ContainerTwo = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: white;
`
const ChatContainer = styled.div`
    height: 75vh;
    height: 100%;
    width: 80%;
    background: white;
    overflow: scroll;
`


const ChatBot = () => {

    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<any>(null);
    const mimeType = "audio/webm";
    const mediaRecorder = useRef<any>(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const dispatch = useDispatch();

    const {botChatMessage} = useSelector(ChatResponseSelector);
    const [text, setText ] = useState<any>('')

    const handleChange = (e: any) => {
        setText(e.target.value)
    }

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const payload = new FormData()
            const audioUrl = URL.createObjectURL(audioBlob);
            payload.append("audio", audioBlob);
            dispatch(chatWithAudio(payload))
            setAudio(audioUrl)
            setAudioChunks([]);
        };
    };


    useEffect(() => {
        navigator.mediaDevices.getUserMedia()
    }, [])

    const handleClick = () => {
        console.log("handle click - 1")
        const payload = {
            "text": text
        }
        dispatch(askBot(payload))
        dispatch(pushMessage(text))
        setText('')
    }

    console.log(botChatMessage, "response")
    console.log(text, "text - 1")
    return <ContainerTwo> 
        <ChatContainer>
        {
            botChatMessage.map((item, index)=>{
                console.log(item, "item - 1")
                if(index%2!= 0){
                    return <StyledRightMessage key={index}>{ item}</StyledRightMessage>
                }else{
                    return <StyledBotMessage>
                    <img src={BotIcon} style={{width: '40px', height: '40px'}} />
                    <StyledLeftMessage key={index}>{ item }</StyledLeftMessage>
                    </StyledBotMessage>

                }
            })
        }
        </ChatContainer>
        <Container>
        <StyledInput type=" " onChange={handleChange} value={text} />
        <Button
            className="send-button"
            btnStyle="primary"
            btnType="solid"
            icon="send"
            style={{ marginTop: '20px', marginBottom: '30px' }}
            onClick={handleClick}
        />
        {!permission ? (
            <AudioOutlined style={{ fontSize: '25px', color: '#08c', marginBottom: '12px', marginLeft: '10px' }} onClick={getMicrophonePermission} />
        ) : null}
        {permission && recordingStatus === "inactive" ? (
            <StyledRecord>
                <AudioOutlined style={{ fontSize: '25px', color: '#08c', marginBottom: '10px', marginLeft: '10px' }} onClick={startRecording} />
                <div onClick={startRecording}
                    style={{ color: 'green', marginBottom: '0px', marginLeft: '10px' }}
                >
                    Record
                </div>
            </StyledRecord>
        ) : null}
        {recordingStatus === "recording" ? (
            <StyledRecord>
            <AudioOutlined style={{ fontSize: '25px', color: '#08c', marginBottom: '10px', marginLeft: '10px' }} onClick={stopRecording} />
            <div onClick={stopRecording}
                style={{ color: 'green', marginBottom: '0px', marginLeft: '10px' }}
            >
                Stop
            </div>
        </StyledRecord>
        ) : null}
        {audio ? (
            <div className="audio-container">
                <audio src={audio} controls></audio>
                <a download href={audio}>
                    Download Recording
                </a>
            </div>
        ) : null}

    </Container>
    </ContainerTwo>
}


export default ChatBot;

const StyledInput = styled.input`
    height: 45px;
    margin: 20px;
    padding: 10px;
    border: 1px solid green;
    border-radius: 20px;
    width: 80%;
    background: white;
    padding-left: 30px;
`
const StyledRecord = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: white;
`
const StyledLeftMessage = styled.div`
    padding: 10px;
    border: 1px solid white;
    width: 500px;
    background-color: white;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background: white;
    word-wrap: break-word;
`

const StyledRightMessage = styled.div`
    margin-left: auto;
    order: 2;
    background: #00a465;
    padding: 10px;
    border: 1px solid #00a465;
    border-radius: 20px;
    width: 400px;
    color: white;
    margin-bottom: 50px;
    margin-top: 80px;
    word-wrap: break-word;
`

const StyledBotMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 50px;
    float: left;
    margin-left: 120px;
`