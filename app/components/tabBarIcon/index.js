/**
 *
 * Created by cly on 16/12/27.
 */


import  React,{Component,propTypes} from "react"
import {View,Text} from "react-native";

import Icons from "./../customIcons";
import styles from "./styles";

class  TabBarIcon extends  Component{

    static defaultProps={

    };
    static propTypes = {};

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        let iconName = this.props.name;
        return(
            <View>
                <Icons name={iconName} size={26} color={this.props.selected ? '#50A31A' : '#7F7F7F'}
                   style={this.props.selected ? styles.activeIcon :styles.deactiveIcon}/>
                <Text style={this.props.selected ? styles.activeTitle :styles.deactiveTitle}>{this.props.title} </Text>
        </View>)
    }
}

export default TabBarIcon;


