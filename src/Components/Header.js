import React from 'react';
import {SelectedSection} from "./SelectedSection";


const headerStyle = {
    height: '120px',
    backgroundColor: 'rgb(93, 210, 178)',
    boxSizing: 'border-box',
    display: 'flex',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
};


export class Header extends React.Component{

    render() {

        return (
            <header style={headerStyle}>
                <SelectedSection/>
            </header>
        )
    }
}
