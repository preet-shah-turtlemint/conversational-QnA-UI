import React, { useEffect, useState } from "react";
import { Button, Card, Space, Upload } from 'antd';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createCohort, resetCohort } from "../../views/cohort-creation/reducer";
import { useSelector } from "react-redux";
import CohortCreationSelector from "../../views/cohort-creation/selector";
import { useNavigate } from "react-router-dom";

const UploadContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-item: flex-start;
    flex-direction: column;
    width: 100%;
    .ant-upload-list-item{
        width:fit-content;
    }

`

interface UploadCohortProps {
    value: string
}


const UploadCohort: React.FC<UploadCohortProps> = ({ value }: UploadCohortProps) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { cohortSuccess } = useSelector(CohortCreationSelector)
    const navigate = useNavigate();

    const props: UploadProps = {
        multiple: false,
        accept: '.csv',
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
		onChange(info: any) {
			let fileList = [...info.fileList];
			fileList = fileList.slice(-1);
			fileList = fileList.map(file => {
				if (file.response) {
					file.url = file.response.url;
				}
				return file;
			});
            return fileList
		},
        fileList,
    };

    const handleUpload = () => {
        const payload = new FormData();
        fileList.forEach((file) => {
            payload.append("file", file as RcFile);
        });
        payload.append("name", value)
        dispatch(createCohort(payload))
        setUploading(true);
    }

    useEffect(()=>{
        if(cohortSuccess){
            dispatch(resetCohort())
            navigate('/')
        }
    }, [cohortSuccess, navigate, dispatch])


    return (<UploadContainer>
        <Space direction="vertical" size={16}>
            <Card title="Upload CSV" style={{ width: 300 }}>

                <Upload {...props} style={{ width: '200px' }}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
            </Card>
        </Space>
        <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            style={{ marginTop: 16, width: '200px' }}
        >
            {uploading ? 'Creating Cohort' : 'Creating Cohort'}
        </Button>
    </UploadContainer>)

}

export default UploadCohort;