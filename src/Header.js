import React from 'react';

import Select from 'react-select';


const headerStyle = {
    width: '100%',
    height: '90px',
    backgroundColor: 'rgb(93, 210, 178)',
    // backgroundColor: 'deeppink',
    paddingLeft: '300px',
    paddingTop: '10px',
    boxSizing: 'border-box'
};
const selectStyle = {
    width: '30%',
    height: '5%',
    padding: '2px'
};
const buttonStyle = {
    marginLeft: '700px',
    marginTop:'50px'
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

export class Header extends React.Component{
    state = {
      selectedOption: null,
      selectedOption2: null,
    };
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
        return selectedOption
    };
    handleChange2 = (selectedOption2) => {
        this.setState({ selectedOption2 });
        console.log(`Option selected:`, selectedOption2);
        return selectedOption2
    };
    handleSubmit = () => {
        if ( typeof this.props.clickMethod === 'function' ){
            this.props.clickMethod(this.state.selectedOption, this.state.selectedOption2);
        }
    };

    render() {
        const {selectedOption} = this.state;
        const {selectedOption2} = this.state;

        return (
            <header style={headerStyle}>
                 <div style={selectStyle}>
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                    />
                     <Select
                         value={selectedOption2}
                         onChange={this.handleChange2}
                         options={options2}
                     />

                 </div>
                <div>
                    <button onClick={this.handleSubmit}
                        style={buttonStyle}>
                        CLICK
                    </button>
                </div>
            </header>
        )
    }
}


// const MyMap = GoogleApiComponent({
//     apiKey: 'AIzaSyBbllFbOfzQ-i6NZniU8LuJq4LGAR6RwNs '
// })(Container);
//
// ReactDOM.render(<MyMap></MyMap>, document.querySelector('#app'))