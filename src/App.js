// 引入react对象和Component对象, 花括号表示只引入这一个对象
import React, {Component} from 'react';
import './App.css';
import {DatePicker, Layout, LocaleProvider, Radio} from "antd";
import Headers from "./header.js"
import Search from "./search.js"
import Menus from "./menu.js"
import moment from "moment";
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import {addLocaleData, FormattedMessage, IntlProvider} from 'react-intl';
import enMessages from "./en-US.messages";
import cnMessages from "./zh-CN.messages";
import enAppLocaleData from "react-intl/locale-data/en";
import cnAppLocaleData from "react-intl/locale-data/zh";

moment.locale('en');


window.enAppLocale = {
    // 合并所有 messages，加入 antd 组件的 messages
    messages: enMessages,
    // locale
    locale: 'en',
    // react-intl locale-data
    data: enAppLocaleData,
};
window.cnAppLocale = {
    // 合并所有 messages，加入 antd 组件的 messages
    messages: cnMessages,
    // locale
    locale: 'cn',
    // react-intl locale-data
    data: cnAppLocaleData,
};

addLocaleData(window.enAppLocale.data);

class App extends Component {
    constructor() {
        super();
        this.state = {
            appLocale: window.enAppLocale,
        };
    }

    changeLocale = (e) => {
        const localeValue = e.target.value;
        alert(localeValue);
        if (!localeValue || localeValue === "en") {
            this.setState({appLocale: window.enAppLocale});
            moment.locale('en');
        } else {
            this.setState({appLocale: window.cnAppLocale});
            moment.locale('zh-cn');
        }
    };

    render() {
        /** render方法里面的return只支持一个html元素，里面可以包含多个
         *
         * 这种不支持
         <div className="App">
         </div>
         <div>
         </div>


         */
        const {locale} = this.state.appLocale;
        return (
            <Layout>
                <div>
                    <IntlProvider locale={this.state.appLocale.locale} messages={this.state.appLocale.messages}>
                        <div className="change-locale">
                            <span style={{marginRight: 16}}>
                                <FormattedMessage id="app.locales.tip" defaultMessage="选择语言："/>
                            </span>
                            <Radio.Group defaultValue={undefined} onChange={this.changeLocale}>
                                <Radio.Button key="en" value={undefined}>English</Radio.Button>
                                <Radio.Button key="cn" value={zhCN}>中文</Radio.Button>
                            </Radio.Group>
                        </div>
                    </IntlProvider>
                </div>
                <LocaleProvider locale={locale}>
                    <DatePicker />
                </LocaleProvider>
                    <LocaleProvider locale={locale}>
                    <Headers key={locale ? locale.locale : 'en'/* Have to refresh for production environment */}
                             appLocale={this.state.appLocale}/>
                </LocaleProvider>
                <Layout>
                    <LocaleProvider locale={locale}>
                        <Menus key={locale ? locale.locale : 'en'/* Have to refresh for production environment */}
                               appLocale={this.state.appLocale}/>
                    </LocaleProvider>
                    <LocaleProvider locale={locale}>
                        <Search key={locale ? locale.locale : 'en'/* Have to refresh for production environment */}
                                appLocale={this.state.appLocale}/>
                    </LocaleProvider>
                </Layout>
            </Layout>);
    }
}

export default App;
