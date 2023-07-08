import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cohortPageInfo, cohortSummary } from "./reducer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CohortSummarySelector from "./selector";
import ReportTable from "../../components/table/ReportTable";
import moment from "moment";
import { ROUTES } from "../../__utils/routes";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-top: 40px;
    margin-left: 80px;
`

const CohorSummary: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cohortSummarySucces, pageInfo } = useSelector(CohortSummarySelector)
    const [dataSource, setDataSource] = useState<any>([])
    const [totalCount, setTotalCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)


    useEffect(() => {
        setPage(pageInfo.page)
        setLimit(pageInfo.pageSize)
    }, [pageInfo.page, pageInfo.pageSize, pageInfo])

    useEffect(() => {
        const payload = {
            'pageNo': page,
            'limit': limit,
            'broker': 'turtlemint'
        }
        dispatch(cohortSummary(payload))
    }, [page, limit, dispatch])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'DP Count',
            dataIndex: 'dpCount',
            key: 'dpCount',
        },
        {
            title: 'Date Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 'max-content'
        },
    ];

    const filterData = (entries: any[]) => {
        const mappedEntries: any[] = [];
        entries.forEach((entry, idx) => {
            const mapper = {
                key: idx,
                name: entry.name,
                dpCount: entry.dpCount,
                createdAt: moment(entry.createdAt)
                    .format("DD-MMM-YYYY"),
            };
            mappedEntries.push(mapper);
        });
        return mappedEntries;
    };

    useEffect(() => {
        if (cohortSummarySucces) {
            setDataSource(filterData(cohortSummarySucces.cohorts))
            setTotalCount(cohortSummarySucces.totalCount)
        }

    }, [cohortSummarySucces])

    const handleClick = () => {
        navigate(ROUTES.COHORT_CREATION)
    }

    return <Container>
        <Button onClick={handleClick} type="primary"
            size="large"
            style={{ width: '150px', marginBottom: '10px' }}>New Cohort</Button>
        <StyledCard>
            <TitleWrapper>
                <h3>Cohort Summary</h3>
            </TitleWrapper>
            <ReportTable
                dataSource={dataSource}
                columns={columns}
                totalCount={totalCount}
                showSizeChanger={true}
                actionType={cohortPageInfo.type}
                page={page}
                sticky={{ offsetHeader: 80 }}
            />
        </StyledCard>
    </Container>
}


export default CohorSummary;

const TitleWrapper = styled.div`
	padding: 0 20px;
`;

const StyledCard = styled(Card as any)`
	margin-top: 30px;
	> div:first-child {
		padding: 0px;
	}
`;