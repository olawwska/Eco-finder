import React from 'react';
import {Map} from './Map';
import {Header} from './Header';
import {Marker} from './Marker';
import {InfoWindow} from "./InfoWindow";

import firebase from '../firebase';

export class Container extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            Vegan: [],
            passedSelectedOption1: {},
            passedSelectedOption2: {},
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}

        }
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('Vegan');
        itemsRef.on('value', (snapshot) => {
            console.log(snapshot.val());
            let vegans = snapshot.val();
            this.setState({
                Vegan: vegans
            })
        })
    }

    handleClickButton = (paramFromChild1, paramFromChild2) => {
        console.log('Metoda przekazujaca dane do kontenera przez header', paramFromChild1, paramFromChild2);
        this.setState({
            passedSelectedOption1: paramFromChild1,
            passedSelectedOption2: paramFromChild2,
        })
    };

    onMarkerClick = (props, marker) => {
      this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
      });
        console.log('klik w marker')
    };


    onMapClick() {
        if (this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    onInfoWindowClose(){
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
    };

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
              <Header clickMethod={this.handleClickButton}/>
                <Map google={this.props.google}
                    onClick={this.props.onMapClick}>
                    {Object.values(this.state.Vegan).filter(vegan => {
                        return this.state.passedSelectedOption1.value === vegan.locality &&
                            this.state.passedSelectedOption2.value === vegan.type
                    }).map((vegan) => {
                        console.log(vegan.locality + 'test');
                        console.log(vegan.type + 'test');

                        return <Marker  onClick={this.onMarkerClick}
                                        key={vegan.name}
                                        restaurant={vegan}
                                        position={{
                                            lat: vegan.latitude,
                                            lng: vegan.longitude,
                                        }}/>
                        })
                    }
                    <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                            <a href={this.state.selectedPlace.url}>{this.state.selectedPlace.url}</a>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

// component responsible for loading the Google Api