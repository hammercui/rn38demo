/**
 * Created by cly on 17/1/5.
 */
'use strict';
import React, {Component,PureComponent} from 'react';
import { getTheme } from '../theme';

export default class BaseComponent extends PureComponent {

    static contextTypes = {
        theme: React.PropTypes.object
    };

    static propTypes = {
        theme: React.PropTypes.objectBaseComponent
    };

    static childContextTypes = {
        theme: React.PropTypes.object
    };

    getChildContext() {
        return {
            theme: this.props.theme ? this.props.theme : this.thisTheme()
        };
    }

    thisTheme() {
        return this.props.theme ? this.props.theme :
        this.context.theme || getTheme();
        // return this.context.theme ? this.context.theme:getTheme();
        // return getTheme();
    }


  static navigationOptions = ({navigation})=>({
    title: (navigation.state.params && navigation.state.params.title + "345345") || "title"
    //headerRight:<Button title="Info"  onPress={() => navigation.navigate('Info', { user: 'hammer2' })} />
  });




}