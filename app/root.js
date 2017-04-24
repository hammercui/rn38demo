/**
 * 根节点
 * Created by cly on 16/11/29.
 */
import React,{Component} from "react";

import {Platform} from "react-native";
import {Provider} from "react-redux";
import Router from "./router";
// import configureStore from "../biz/store/index"
// const store = configureStore();

import store from "../biz/store/index";
if (!__DEV__) {
    console.info = () => {};
    console.log = () => {};
// console.error = () => {};
    console.warn = () => {};
    console.debug = () => {};
}

export default class Root extends Component{
    //render()之前执行 永远只执行一次
    componentWillMount() {
        global.isBeta = this.props.isBeta;
    }

    //render()之后执行，dom已经生成
    componentDidMount() {

    }

    render(){
        return (
            <Provider store={store}>
                {Router}
            </Provider>)
    }


}
