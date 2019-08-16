import React from 'react';
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";



const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 0,
        color: 'white',
        height: 37,
        width: '10rem',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'uppercase',
    },
})(Button);


export class ButtonSection extends React.Component{

    handleSubmit = () => {
        console.log('DZIAŁA');
        console.log(this.state.selectedOption);
        console.log(this.state.selectedOption2);

        if ( typeof this.props.clickMethod === 'function' ){
            this.props.clickMethod(this.state.selectedOption, this.state.selectedOption2);
        }
    };

    render() {
        return (
            <div>
                <StyledButton fullWidth={true} onClick={this.handleSubmit}>sprawdź</StyledButton>
            </div>
        )
    }
}
