// 引入react对象和Component对象, 花括号表示只引入这一个对象
import React, {Component} from 'react';
import './App.css';
import {DatePicker, Input, Layout, Menu} from "antd";

const {Header, Content, Sider} = Layout;
const {SubMenu} = Menu;
const {TextArea} = Input;



const options =
    [{
        value: 'zhejiang',
        label: 'Zhejiang',
    }, {
        value: 'jiangsu',
        label: 'Jiangsu',
    }];

function onChange(value) {
    alert(value)
}

class Table extends Component {
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
            <div>hello hahah</div>)
    }
}

export default Table;
