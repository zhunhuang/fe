// 引入react对象和Component对象, 花括号表示只引入这一个对象
import React, {Component} from 'react';
import './App.css';
import {DatePicker, Layout, Menu} from "antd";
import Headers from "./header.js"
import Table from "./table.js"
import Search from "./search.js"
import Menus from "./menu.js"


const {Header, Content, Sider} = Layout;
const {SubMenu} = Menu;
const {MonthPicker, RangePicker} = DatePicker;

class App extends Component {
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
            <Layout>
                <Headers/>
                <Layout>
                  <Menus/>
                  <Search/>
                </Layout>
            </Layout>);
    }
}

export default App;
