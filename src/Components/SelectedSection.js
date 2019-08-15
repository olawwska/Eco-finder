import React from 'react';
import Select from 'react-select'

const selectedSectionStyles = {
    display: 'flex',
};

const colourStyles = {
    container: styles => ({...styles, paddingLeft: '70px', width: '500px'}),
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

export class SelectedSection extends React.Component {
    state = {
        selectedOption: null,
        selectedOption2: null,
    };
    handleChange = (selectedOption) => {
        this.setState({selectedOption});
        return selectedOption
    };
    handleChange2 = (selectedOption2) => {
        this.setState({selectedOption2});
        return selectedOption2
    };
    render() {
        const {selectedOption} = this.state;
        const {selectedOption2} = this.state;

        return (
            <div style={selectedSectionStyles}>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    styles={colourStyles}
                >
                </Select>
                <Select
                    value={selectedOption2}
                    onChange={this.handleChange2}
                    options={options2}
                    styles={colourStyles}
                >
                </Select>
            </div>
        )
    }
}
