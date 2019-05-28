import React, { Component } from 'react'
import { graphql } from "gatsby";
import moment from 'moment';
import {
    ExcelExport,
    ExcelExportColumn
} from '@progress/kendo-react-excel-export';
import { Layout, Table, DatePicker, Button } from 'antd';

class antTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            DataSource: {}
        }
    }
    _exporter;
    export = () => {
        this._exporter.save();
    }
    componentWillMount() {
        const { data } = this.props.data.dataJson;
        this.setState({
            DataSource: data
        });
    }
    columns = [
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
                        <span className="lcStatus">
                            <img src="https://datasupport.beerboard.com/images/cleanOn.png" alt="positive" />
                        </span>
                    )
                }
                else {
                    return (
                        <span className="lcStatus">
                            <img src="https://datasupport.beerboard.com/images/cleanOff.png" alt="negetive" />
                        </span>
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
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.tickitId !== "", // Column configuration not to be checked
            name: record.name,
        }),
    };

    render() {
        const { Header, Sider, Content } = Layout;

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
                        <Button onClick={this.export} type="primary" style={{ marginBottom: '25px', width: '200px' }} icon="download" size="large">Exort to excel</Button>
                        <Table rowSelection={this.rowSelection} dataSource={this.state.DataSource} columns={this.columns} rowKey="id" />
                    </Content>
                </Layout>
                <ExcelExport
                    data={this.state.DataSource}
                    fileName="Loactions.xlsx"
                    ref={(exporter) => { this._exporter = exporter; }}>
                    <ExcelExportColumn field="id" title="ID" locked={true} width={50} />
                    <ExcelExportColumn CellOptions={{ wrap: true, textAlign: 'center' }} field="location" title="Location" locked={true} width={350} />
                    <ExcelExportColumn field="poured" title="Poured" width={150} />
                    <ExcelExportColumn field="sold" title="Sold" width={150} />
                    <ExcelExportColumn field="variance" title="Variance" width={150} />
                    <ExcelExportColumn field="date" title="Date" width={170} />
                    <ExcelExportColumn field="tickitId" title="TickitId" width={70} />
                    <ExcelExportColumn field="linecleaning" title="Line cleaning" width={50} />
                    <ExcelExportColumn field="isAnalysed" title="Analysed Status" width={150} />
                </ExcelExport>
            </Layout>
        )
    }
}
export default antTable;
export const query = graphql`
  { 
    dataJson 
        {
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
  }
`;

// query getData($date: String!){
//     dataJson 
//     {
//         data(elemMatch: {{ date: { eq: $path } }}) {
//         id
//         location
//         poured
//         sold
//         variance
//         date
//         tickitId
//         linecleaning
//         isAnalysed
//         }
//     }
// }