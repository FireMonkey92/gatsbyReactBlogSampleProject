import React from 'react'
import { useStaticQuery, graphql } from "gatsby";
import moment from 'moment';
import { Layout, Table, DatePicker } from 'antd';

const AntDataTableExample = () => {

    const { Header, Sider, Content } = Layout;
    const { dataJson } = useStaticQuery(graphql`
    {
        dataJson {
            data {
            id
            location
            poured
            sold
            variance
            date
            tickitId
            linecleaning
            isAnalysed
          }
        }
    }`);
    const DataSource = dataJson.data;
    console.log(DataSource);


    const columns = [
        {
            dataIndex: "id",
            key: "id"
        },
        {
            title: 'Location Name',
            dataIndex: 'location',
            key: 'location',
            sorter: (a, b) => a.location.length - b.location.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Poured',
            dataIndex: 'poured',
            key: 'poured',

        },
        {
            title: 'Variance',
            dataIndex: 'variance',
            key: 'variance',
            sorter: (a, b) => a.variance.length - b.variance.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Sold',
            dataIndex: 'sold',
            key: 'sold',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Tickit Id',
            dataIndex: 'tickitId',
            key: 'tickitId',
        },
        {
            title: 'Line Cleaning',
            dataIndex: 'linecleaning',
            key: 'linecleaning',
            render: linecleaning => {
                if (linecleaning) {
                    return (
                        <a className="lcStatus">
                            <img className="lcStatus" src="https://datasupport.beerboard.com/images/cleanOn.png" alt="positive" />
                        </a>
                    )
                }
                else {
                    return (
                        <a className="lcStatus">
                            <img src="https://datasupport.beerboard.com/images/cleanOff.png" alt="negetive" />
                        </a>
                    )
                }
            }
        },
        {
            title: 'Status',
            dataIndex: 'isAnalysed',
            key: 'isAnalysed',
            render: (isAnalysed) => {
                if (isAnalysed) {
                    return (
                        <div className="helensys-pills helensys-Analysed">
                            Analysed
                        </div>
                    )
                }
                else {
                    return (
                        <div className="helensys-pills helensys-NeedAnalysis">
                            Not Analysed
                        </div>
                    )
                }
            },
            filters: [
                {
                    text: 'Analysed',
                    value: true,
                },
                {
                    text: 'Need Analys',
                    value: false,
                },
            ],
            filterMultiple: false,
            onFilter: (value, record) => {
                if (value) {
                    return record.isAnalysed === true
                }
                else {
                    return record.isAnalysed === false
                }
            }
        }

    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({

            disabled: record.tickitId !== "", // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <Layout id="controlPanel">
            <Header className="dashHeader">
                <img src="https://datasupport.beerboard.com/images/beerboard-logo.png" alt="Logo Not Loaded" />
            </Header>
            <Layout className="dashboardMain">
                <Sider className="dashboardSider" width="250px">
                    <DatePicker defaultValue={moment('2015/01/01', 'YYY/MM/DD')} format='YYY/MM/DD' />
                </Sider>
                <Content className="dashboardTable">
                    <Table rowSelection={rowSelection} dataSource={DataSource} columns={columns} rowKey="id" />
                </Content>
            </Layout>
        </Layout>
    )
}
export default AntDataTableExample;