import React, { Component } from 'react'
import { graphql } from "gatsby";
import moment from 'moment';
import {
    ExcelExport,
    ExcelExportColumn
} from '@progress/kendo-react-excel-export';
import { Layout, Row, Col, Menu, Table, DatePicker, Button, Select, Card, Modal } from 'antd';

const { Option } = Select;
const { SubMenu } = Menu;
class antTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            SelctedDate: "",
            modalVisible: false,
            SelectedLocation: [],
            SelectedType: "",
            SelectedAnalysisType: "",
            DataSource: []
        }
    }
    _exporter;
    export = () => {
        this._exporter.save();
    }
    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
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
            title: '',
            dataIndex: '',
            key: '',
            render: () => {
                return (
                    <span className="OpenSmartBar">
                        <img src="https://datasupport.beerboard.com/images/link.png" alt="OpenSmartBar" />
                    </span>
                )
            }
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            render: () => {

                return (
                    <span className="OpenTicket">
                        <img onClick={() => this.setModalVisible(true)} src="https://datasupport.beerboard.com/images/ticket.png" alt="OpenTickit" />
                    </span>
                )
            }
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
            title: 'LC',
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

    handleDateChange = (m, ds) => {
        if (ds) {
            this.setState({
                SelctedDate: ds
            });
        }
    }
    handleTypeChange = (value) => {
        this.setState({
            SelectedType: value
        })
    }
    handleLocationChange = (value) => {
        this.setState({
            SelectedLocation: value
        })
    }
    handleAnalysisStateChange = (value) => {
        this.setState({
            SelectedAnalysisType: value
        })
    }
    handleSearch = () => {
        console.log(this.state)
    }
    handleResetAll = () => {
        this.setState({
            SelctedDate: "",
            SelectedLocation: [],
            SelectedType: "",
            SelectedAnalysisType: "",
            DataSource: []
        })
    }

    render() {
        const { Header, Sider, Content } = Layout;

        const d = new Date();
        return (
            <Layout id="controlPanel">
                <Header className="dashHeader">
                    <img src="https://datasupport.beerboard.com/images/beerboard-logo.png" alt="Logo Not Loaded" />
                </Header>
                <Layout className="dashboardMain">
                    <Sider className="dashboardSider" width="250px">
                        <Card title="SEARCH" style={{ width: "100%", paddingBottom: "10px", marginTop: "65px" }}>
                            <Row>
                                <Col span={24}><span>Date</span></Col>
                                <Col span={24}><DatePicker width="100%" defaultValue={moment(d.getTime())} format='MM/DD/YYYY' onChange={(m, ds) => this.handleDateChange(m, ds)} /></Col>
                            </Row>
                            <Row>
                                <Col span={24}><span>Location</span></Col>
                                <Col span={24}><Select placeholder="Select Locations" mode="tags" tokenSeparators={[',']}>
                                </Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}><span>Type</span></Col>
                                <Col span={24}>
                                    <Select onChange={(value) => this.handleTypeChange(value)} placeholder="Select">
                                        <Option value="L1">L1</Option>
                                        <Option value="L2">L2</Option>
                                    </Select>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}><span>Analysis Status</span></Col>
                                <Col span={24}>
                                    <Select onChange={(value) => this.handleAnalysisStateChange(value)} placeholder="Select">
                                        <Option value="true">ANALYSED</Option>
                                        <Option value="false">NEED ANALYSIS</Option>
                                        <Option value="closed">TICKIT CLOSED</Option>
                                        <Option value="created">TICKIT CREATED</Option>
                                    </Select>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24} >
                                    <Button onClick={() => this.handleResetAll()} className="helensys-cancel-btn" style={{ float: "left", left: "5px" }} type="primary" shape="round" size="default">
                                        Reset
                                    </Button>
                                    <Button onClick={() => this.handleSearch()} className="helensys-linear-theme-btn-bgcolor" style={{ float: "right", right: "5px" }} type="primary" shape="round" size="default">
                                        Search
                                </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Sider>
                    <Content className="dashboardTable">
                        <Button onClick={this.export} type="primary" style={{ marginBottom: '25px', width: '200px' }} icon="download" size="large">Exort to excel</Button>
                        <Table rowSelection={this.rowSelection} dataSource={this.state.DataSource} columns={this.columns} rowKey="id" />
                    </Content>

                    <Modal
                        title="OPEN TICKET DETAILS"
                        style={{ right: "-30%", bottom: 0, top: "5px" }}
                        visible={this.state.modalVisible}
                        onOk={() => this.setModalVisible(false)}
                        onCancel={() => this.setModalVisible(false)}>
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                    </Modal>
                </Layout>
                <ExcelExport
                    data={this.state.DataSource}
                    fileName="Loactions.xlsx"
                    ref={(exporter) => { this._exporter = exporter; }}>
                    <ExcelExportColumn field="id" title="ID" width={50} />
                    <ExcelExportColumn CellOptions={{ wrap: true, textAlign: 'center' }} field="location" title="Location" width={350} />
                    <ExcelExportColumn field="poured" title="Poured" width={150} />
                    <ExcelExportColumn field="sold" title="Sold" width={150} />
                    <ExcelExportColumn field="variance" title="Variance" width={150} />
                    <ExcelExportColumn field="date" title="Date" width={170} />
                    <ExcelExportColumn field="tickitId" title="TickitId" width={70} />
                    <ExcelExportColumn field="linecleaning" title="Line cleaning" width={50} />
                    <ExcelExportColumn field="isAnalysed" title="Analysed Status" width={150} />
                </ExcelExport>
            </Layout >
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