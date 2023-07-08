import React, { useState } from "react";
import styled from "styled-components";
import { Empty, Table } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
export interface ReportTableProps {
    dataSource: any[];
    columns: any[];
    title?: string;
    action?: string;
    scroll?: any;
    loader?: any;
    totalCount?: number;
    page?: number;
    actionType?: string;
    showSizeChanger?: boolean;
    sticky?: any;
}
const ReportTable: React.FC<ReportTableProps> = ({
    dataSource,
    columns,
    scroll,
    loader,
    totalCount,
    page,
    actionType,
    showSizeChanger,
    sticky
}: ReportTableProps) => {
    const [pgSize, setPageSize] = useState<any>(10);

    const [load, setLoad] = useState<boolean>(true)
    const dispatch = useDispatch();
    useEffect(() => {
        setLoad(loader)
    }, [loader]);

    return (
        <>
            {load ? null : dataSource && dataSource.length > 0 ? (
                <StyledTable>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        size="middle"
                        scroll={scroll}
                        pagination={{
                            current: page,
                            total: totalCount,
                            defaultPageSize: 10,
                            pageSize: pgSize,
                            showSizeChanger: showSizeChanger,
                            onChange: (page, pageSize) => {
                                setPageSize(pageSize);
                                dispatch({
                                    type: actionType,
                                    payload: {
                                        page: page,
                                        pageSize: pageSize
                                    }
                                });
                            }
                        }}
                        sticky={sticky ? sticky : false}
                    />
                </StyledTable>
            ) : (
                <Empty description="No items" />
            )}
        </>
    );
};


const StyledTable = styled.div`
	table {
		font-size: 12px;	
	}
	& div {
		margin: 0px;
	}

	th {
		border: none;
		background-color: "#fafafa";
		color: "#a1a6a7";
		font-weight: 500;
	}
	td {
		border: none;
	}
	tr {
		cursor: pointer;
	}
	.ant-table-body {
		tr:hover {
			&:not(.ant-table-expanded-row) {
				> td {
					background-color: '#FFFFF';
				}
			}
		}
	}
	.ant-table-column-title {
		color: ${"#a1a6a7"};
		font-weight: 700;
	}
`;
export default ReportTable;
