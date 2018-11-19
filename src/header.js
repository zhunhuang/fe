// 引入react对象和Component对象, 花括号表示只引入这一个对象
import React, {Component} from 'react';
import './App.css';
import {Layout, Menu} from "antd";

const {Header} = Layout;

class Headers extends Component {
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
            <Header className="header">
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>)
    }
}

export default Headers;
