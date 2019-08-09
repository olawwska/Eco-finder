import React from 'react';
import Container from './Container';
import GoogleApiComponent
  from "./Google-based Component/GoogleApiComponent";

const MyMap = GoogleApiComponent({
  apiKey: 'AIzaSyBbllFbOfzQ-i6NZniU8LuJq4LGAR6RwNs '
})(Container);

export class App extends React.Component {

  render() {
    return (
        <MyMap/>
    );
  }
}

export default App;

