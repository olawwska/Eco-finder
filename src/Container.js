import React from 'react';
import {Map} from './Map';

export default class Container extends React.Component{
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
          <Map google={this.props.google}/>
        </div>
    )
  }
}
