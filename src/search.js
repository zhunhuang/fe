import {Cascader, Col, DatePicker, Input, Layout, Row} from "antd";
import React, {Component} from "react";
import Breadcrumb from "antd/lib/breadcrumb";
import moment from 'moment';
import xhr from 'xhr';

const {Content} = Layout;
const {Search} = Input;
const {MonthPicker, RangePicker} = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const {TextArea} = Input;

const options =
    [{
        value: 'zhejiang',
        label: 'Zhejiang',
    }, {
        value: 'jiangsu',
        label: 'Jiangsu',
    }];

class Searchs extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            cascader: "",
            selectTimeRange: "",
            searchContent: "",
            searchResult: "",
        };
    }

// 函数在这才能访问this对象
    onChange = (value) => {
        this.setState({cascader: value});
        alert(value)
    };
    changeTimeRange = (range, rangeStr) => {
        alert(rangeStr);
        this.setState({selectTimeRange: rangeStr})
    };
    // 箭头函数才可以绑定this。
    search = (value) => {
        this.setState({searchContent: value});
        alert(JSON.stringify(this.state));
        xhr({
            method: "post",
            body: this.state,
            uri: "http://localhost:8081/search",

        }, (err, resp, body) => {
            if (resp.statusCode !== 200) {
                alert("error: " + resp.statusCode)
            } else {
                this.setState({searchResult: JSON.parse(body).data})
            }// check
        })
    }
    ;

    render() {
        /** render方法里面的return只支持一个html元素，里面可以包含多个
         *
         * 这种不支持
         <div className="App">
         </div>
         <div>
         </div>


         */
        return (
            <Layout style={{padding: '0 24px 24px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 480}}>
                    <Row gutter={2}>
                        <Col className={"gutter-row"} span={6}>
                            <Cascader options={options} onChange={this.onChange} placeholder="Please select"/>
                        </Col>
                    </Row>
                    <Row gutter={1}>
                        <Col className="gutter-row" span={6}>
                            <div>
                                <RangePicker onChange={this.changeTimeRange}
                                             defaultValue={[moment('2018/01/01', dateFormat), moment('2018/01/01', dateFormat)]}
                                             format={dateFormat}
                                />
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <Search
                                    placeholder="输入订单号，手机号，traceId查询"
                                    onSearch={this.search}
                                    enterButton
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                    </Row>
                    <TextArea rows={4} placeholder={"这是内容"} value={this.state.searchResult}>
                            </TextArea>
                </Content>
            </Layout>
        )
    }
}

export default Searchs;