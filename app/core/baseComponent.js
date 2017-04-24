/**
 * Created by cly on 17/1/5.
 */
'use strict';
import React, {Component} from 'react';
import { getTheme } from '../theme';

export default class BaseComponent extends Component {

    static contextTypes = {
        theme: React.PropTypes.object
    };

    static propTypes = {
        theme: React.PropTypes.object
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

}