import React, { useState } from "react";
import UploadCohort from "../../components/upload-cohort";
import { Input } from "antd";
import { Container } from "../../components/common-styles/page-style";
import styled from "styled-components";

const StyledInput = styled(Input as any)`
    width: 300px;
    margin-bottom: 20px;
`
const CohortCreation: React.FC = () => {

    const [value, setValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return <Container>
        <span style={{ fontWeight: 600 }}>Cohort Name</span>
        <StyledInput placeholder="Enter Cohort Name" value={value} onChange={handleChange} />
        <UploadCohort value={value} />
    </Container>
}

export default CohortCreation