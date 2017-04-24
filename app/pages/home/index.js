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
import {Button} from "../../vendor/native-base";
import Modal from "react-native-animated-modal";
import styles from "./styles";
//redux store
 class Home extends Component {

     componentWillMount() {

     }

     componentDidMount() {
         //console.log("@@@@@@@","this",this);
        //console.log("@@@@@@@","this.actions",this.actions);

     }

     constructor(props){
         super(props);
         this.state={isModalVisible:false};
     }

     render() {
        return (
            <View  style={styles.container}>

                {/*<TouchableOpacity onPress={this._showModal.bind(this)}>*/}
                    {/*<View>*/}
                        {/*/!*<Text>点击网络请求</Text>*!/*/}
                        {/*<Text>显示modal页</Text>*/}
                    {/*</View>*/}

                {/*</TouchableOpacity>*/}
                {/*<Text>结果{this.props.home.title}</Text>*/}
                {/*<Button Primary>Primary</Button>*/}

                {this._renderModal()}
            </View>
        );
    }


    _renderModal(){
        return(
        <View style={styles.container}>
            {this._renderButton('Default modal', () => this.setState({ visibleModal: 1 }))}
            {this._renderButton('Sliding from the sides', () => this.setState({ visibleModal: 2 }))}
            {this._renderButton('A slower modal', () => this.setState({ visibleModal: 3 }))}
            {this._renderButton('Fancy modal!', () => this.setState({ visibleModal: 4 }))}
            {this._renderButton('Bottom half modal', () => this.setState({ visibleModal: 5 }))}
            <Modal isVisible={this.state.visibleModal === 1}>
                {this._renderModalContent()}
            </Modal>
            <Modal
                isVisible={this.state.visibleModal === 2}
                animationIn={'slideInLeft'}
                animationOut={'slideOutRight'}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}
            >
                {this._renderModalContent()}
            </Modal>
            <Modal
                isVisible={this.state.visibleModal === 3}
                animationInTiming={2000}
                animationOutTiming={2000}
                backdropTransitionInTiming={2000}
                backdropTransitionOutTiming={2000}
            >
                {this._renderModalContent()}
            </Modal>
            <Modal
                isVisible={this.state.visibleModal === 4}
                backdropColor={'red'}
                backdropOpacity={1}
                animationIn={'zoomInDown'}
                animationOut={'zoomOutUp'}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}
            >
                {this._renderModalContent()}
            </Modal>
            <Modal isVisible={this.state.visibleModal === 5} style={styles.bottomModal}>
                {this._renderModalContent()}
            </Modal>
        </View>
        )
    }

     _renderModalContent(){
        return (<View style={styles.modalContent}>
            <Text>Hello!</Text>
            {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
        </View>)
    }


     _renderButton = (text, onPress) => (
         <TouchableOpacity onPress={onPress}>
             <View style={styles.button}>
                 <Text>{text}</Text>
             </View>
         </TouchableOpacity>
     )

    _fetchData(){
        this.props.actions.getHotMovieListAction().then(result=>{
            console.log("@@@@","this.props.home",this.props.home);
        });
    }

    _showModal(){
        this.setState({isModalVisible:true});
    }
    _hideModal(){
        this.setState({isModalVisible:false})
    }



}



export default connect(selector,actions)(Home);