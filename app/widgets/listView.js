/**
 * Created by cly on 17/1/9.
 */
"use strict";
import React,{PropTypes} from "react";
import {ListView,RecyclerViewBackedScrollView, PixelRatio} from "react-native";
import {View,Spacer} from "./index";
import BaseComponent from "../reduxVersion/baseComponent";
import enhanceProps from "../utils/enhanceProps";
import {TopButton} from "./refreshListView";
//滚动条移动多少显示置顶按钮
const SHOW_TOP_BTN_TOP = 200;

export default class ListViewNew extends BaseComponent{

    static defaultProps = {
        topBtn:false,
        section:false,
        customSection:false,
    };


    static propTypes = {

        listData: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]).isRequired, //数据源
        renderRow:React.PropTypes.func,   //渲染列表

        renderSeparator: React.PropTypes.func,
        renderHeader: React.PropTypes.func,
        renderFooter: React.PropTypes.func,
        renderSectionHeader:React.PropTypes.func,

        topBtn:React.PropTypes.bool, //是否显示topButton
        section:React.PropTypes.bool, //是否携带标题
        customSection:React.PropTypes.bool //是否携带标题,并自定义dataBlob提取规则
    };


    constructor(props){
        super(props);
        let ds = {};
        if(props.customSection){
            let getSectionData = (dataBlob, sectionID) => {
                return dataBlob[sectionID];
            };
            let getRowData = (dataBlob, sectionID, rowID) => {
                return dataBlob[rowID];
            };

            ds = new ListView.DataSource({
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            });
        }
        else if(props.section){
             ds = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged:(s1,s2)=> s1!= s2
            });
        }
        else{
             ds = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                // sectionHeaderHasChanged:(s1,s2)=> s1!= s2
            });
        }

        this.state = {
            showTopBtn:false, //判断是否显示置顶按钮
            dataSource:ds,
        };
    }

    //获得主题属性
    prepareRootProps() {
        let type = {
            backgroundColor:this.thisTheme().baseBgColor,//背景色
        };//主题布局属性
        let defaultProps = {
            style: type,
        };
        return enhanceProps(this.props, defaultProps);
    }

    render(){
        let dataSource = {};
        if(this.props.customSection){
            let {dataBlob, sectionIDs, rowIDs} = this.props.listData;
            dataSource = this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
        }
        else if(this.props.section){
            dataSource = this.state.dataSource.cloneWithRowsAndSections(this.props.listData)
        }
        else{
            dataSource = this.state.dataSource.cloneWithRows(this.props.listData);
        }


        return (
            <View>
                <ListView
                    ref="listView"
                    {...this.prepareRootProps()}
                    dataSource={dataSource}
                    renderRow={this.props.renderRow}
                    renderHeader={this._renderHeaderView.bind(this)}
                    renderFooter={this._renderFooterView.bind(this)}
                    renderSeparator={this._renderSeparatorView.bind(this)}
                    renderSectionHeader={this._renderSectionHeaderView.bind(this)}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                    scrollEnabled={true}
                    canCancelContentTouches={true}
                    removeClippedSubviews={true}
                    initialListSize={3}
                    pageSize={1}
                    scrollRenderAheadDistance={200}
                    refreshControl={this.props.refreshable === true ? this._renderRefreshControl() : null}
                    onScroll={this._onScroll.bind(this)}
                />
                    {this.props.topBtn && this.state.showTopBtn && <TopButton onPress={this._scrollTop.bind(this)} />}

            </View>

        );
    }


    //滚回顶部
    _scrollTop() {
        return this.refs.listView.scrollTo({y: 0});
    }

    _onScroll(event){
        if(!this.props.topBtn) return;
        //为了增加效率,仅有在必要情况下才调用setState
        if(event.nativeEvent.contentOffset.y > SHOW_TOP_BTN_TOP && !this.state.showTopBtn){
            this.setState({showTopBtn: true});
        } else if(event.nativeEvent.contentOffset.y <= SHOW_TOP_BTN_TOP && this.state.showTopBtn){
            this.setState({showTopBtn: false});
        }
    }

    //渲染头部
    _renderHeaderView() {
        if (!this.props.renderHeader){return null;}
        return this.props.renderHeader();
    }

    //渲染分割线
    _renderSeparatorView(sectionID, rowID, adjacentRowHighlighted) {
        if (this.props.renderSeparator) {
            return this.props.renderSeparator(sectionID, rowID, adjacentRowHighlighted);
        }

       // return <Spacer key={rowID} distance={1} />;
        return (
          <View key={rowID} style={{height: 1.0 / PixelRatio.get(),
              backgroundColor: this.thisTheme().separatorLineColor,
              marginLeft:this.thisTheme().contentPadding,
              marginRight:this.thisTheme().contentPadding,
          }} />
        );
    }

    //渲染磁性头
    _renderSectionHeaderView(sectionData,sectionID){
        if(!this.props.renderSectionHeader){return null};
        return this.props.renderSectionHeader(sectionData,sectionID);
    }

    //渲染底部view
    _renderFooterView(){
        if(!this.props.renderFooter){return null};
        return this.props.renderFooter();
    }


}