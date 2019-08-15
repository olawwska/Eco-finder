import React from 'react';
import {Map} from './Map';
import {Header} from './Header';

export class Container extends React.Component{
  render() {

    const style = {
      width: '100vw',
      height: '100vw'
    };

    if(!this.props.loaded){
      return <div> Loading... </div>
    }
    return(
        <div style={style}>
          <Header/>
          <Map google={this.props.google}/>
        </div>
    )
  }
}

// component responsible for loading the Google Api