import React from "react";
import '../styles/Popup.css';

export default function Popup(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popupInner'>
                <button 
                    className='closeBtn' 
                    type='reset' 
                    onClick={() => {
                        props.setTrigger(false)
                        props.setName('');
                        props.shortSummary('');
                    }}
                >
                    close
                </button>
                {props.children}
            </div>
        </div>
    ) : '';
}