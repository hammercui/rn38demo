/**
 * Created by cly on 16/12/26.
 */
import React,{Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform, TouchableOpacity
} from 'react-native';
import selector from "./selector";
import actions from "./actions";
import {connect} from "react-redux";


//redux store
 class Home extends Component {

     componentWillMount() {

     }

     componentDidMount() {
         //console.log("@@@@@@@","this",this);
        //console.log("@@@@@@@","this.actions",this.actions);

     }

     render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <TouchableOpacity onPress={this._fetchData.bind(this)}>
                    <View>
                        <Text>点击网络请求</Text>
                    </View>

                </TouchableOpacity>
                <Text>结果{this.props.home.title}</Text>
            </View>
        );
    }

    _fetchData(){
        this.props.actions.getHotMovieListAction().then(result=>{
            console.log("@@@@","this.props.home",this.props.home);
        });
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default connect(selector,actions)(Home);