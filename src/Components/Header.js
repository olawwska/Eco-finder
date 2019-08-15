import React from 'react';
import {SelectedSection} from "./SelectedSection";
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";

const headerStyle = {
    height: '120px',
    backgroundColor: 'rgb(93, 210, 178)',
    padding: '40px 0 0 150px',
    boxSizing: 'border-box',
    display: '-webkit-box'
};
const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 6,
        border: 0,
        color: 'white',
        height: 37,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginLeft: 200
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);


export class Header extends React.Component{

    handleSubmit = () => {
        if ( typeof this.props.clickMethod === 'function' ){
            this.props.clickMethod(this.state.selectedOption, this.state.selectedOption2);
        }
    };

    render() {
        return (
            <header style={headerStyle}>
                <SelectedSection/>
                <StyledButton>sprawdź</StyledButton>
            </header>
        )
    }
}
