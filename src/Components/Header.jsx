import React from 'react';

import Select from 'react-select'
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";



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
const selectedSectionStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
};
const colourStyles = {
    container: styles => ({...styles, padding: '0 70px', width: '40em'}),
    placeholder: styles => ({...styles, fontFamily: 'Arial', opacity: '0.7', textTransform: 'uppercase'}),
    menuList: styles => ({...styles, fontFamily: 'Arial', opacity: '0.7'}),
    menu: styles => ({...styles, width: '500px'}),
    control: styles => ({...styles, fontFamily: 'Arial', opacity: '0.8'}),
};
const options = [
    { value: 'Śródmieście Południowe', label: 'Śródmieście Południowe' },
    { value: 'Śródmieście Północne', label: 'Śródmieście Północne' },
    { value: 'Ochota', label: 'Ochota' }
];
const options2 = [
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Glutenfree', label: 'Glutenfree' }
];
const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 0,
        color: 'white',
        height: 37,
        width: '10rem',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginRight: 40
    },
    label: {
        textTransform: 'uppercase',
    },
})(Button);



export class Header extends React.Component{
    state = {
        selectedOption: null,
        selectedOption2: null,
    };

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
        return selectedOption;
    };
    handleChange2 = (selectedOption2) => {
        this.setState({selectedOption2});
        return selectedOption2;
    };

    handleSubmit = () => {
        console.log('DZIAŁA');
        console.log(this.state.selectedOption);
        console.log(this.state.selectedOption2);

        if ( typeof this.props.clickMethod === 'function' ){
            this.props.clickMethod(this.state.selectedOption, this.state.selectedOption2);
        }
    };

    render() {
        const {selectedOption} = this.state;
        const {selectedOption2} = this.state;

        return (
            <header style={headerStyle}>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    styles={colourStyles}
                    placeholder={'wybierz dzielnicę...'}
                    theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary25: 'hotpink',
                            primary: 'black',
                        },
                    })}
                >
                </Select>
                <Select
                    value={selectedOption2}
                    onChange={this.handleChange2}
                    options={options2}
                    styles={colourStyles}
                    placeholder={'wybierz usługę...'}
                    theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary25: 'hotpink',
                            primary: 'black',
                        },
                    })}
                >
                </Select>
                <StyledButton fullWidth={true} onClick={this.handleSubmit}>sprawdź</StyledButton>
            </header>
        )
    }
}
