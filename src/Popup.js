import React from "react";
import './Popup.css';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (this.props.trigger) ? (
            <div className='popup'>
                <div className='popup-inner'>
                    {this.props.children}
                </div>
            </div>
        ) : '';
    }
}