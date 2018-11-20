import {Col, DatePicker, Input, Layout, Row, Select} from "antd";
import React, {Component} from "react";
import Breadcrumb from "antd/lib/breadcrumb";
import moment from 'moment';
import xhr from 'xhr';
import {IntlProvider} from "react-intl";

const {Content} = Layout;
const {Search} = Input;
const {MonthPicker, RangePicker} = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const {TextArea} = Input;
const {Option} = Select;

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
        alert(this.props.appLocale.locale);
        this.setState({cascader: value});
    };
    changeTimeRange = (range, rangeStr) => {
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
                alert("error code : " + resp.statusCode)
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
            <IntlProvider locale={this.props.appLocale.locale} messages={this.props.appLocale.messages}>

                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 480}}>
                        <Row gutter={2}>
                            <Select defaultValue="交易流" style={{width: 120}} onChange={this.onChange}>
                                <Option value="交易流">交易流</Option>
                                <Option value="booking流">booking流</Option>
                                <Option value="搜索流" disabled>搜索流</Option>
                            </Select>
                        </Row>
                        <Row gutter={1}>
                            <Col className="gutter-row" span={6}>
                                <div>
                                    <RangePicker onChange={this.changeTimeRange}
                                                 defaultValue={[moment(moment().subtract('days', 1).format(dateFormat), dateFormat),
                                                     moment(moment().format(dateFormat), dateFormat)]}
                                                 format={dateFormat}
                                    />
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="gutter-box">
                                    <Search
                                        placeholder={this.props.appLocale.messages.searchTips}
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
            </IntlProvider>

        )
    }
}

export default Searchs;
