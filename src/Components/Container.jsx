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
            Glutenfree: [],
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
            let vegans = snapshot.val();
            this.setState({
                Vegan: vegans
            });
        });
        const itemsRef2 = firebase.database().ref('Glutenfree');
        itemsRef2.on('value', (snapshot) => {
            let glutenfrees = snapshot.val();
            this.setState({
                Glutenfree: glutenfrees
            });
        });
    }



    handleClickButton = (paramFromChild1, paramFromChild2) => {
        console.log('Metoda przekazujaca dane do kontenera przez header', paramFromChild1, paramFromChild2);
        this.setState({
            passedSelectedOption1: paramFromChild1,
            passedSelectedOption2: paramFromChild2,
        })
        //metoda pobiera argumenty ze stanu Headera - selectedOption1 i selectedOption2 i przypisuje je do stanu Container jako wartości kluczy passedSelectedOption1 oraz passedSelectedOption2
    };

    onMarkerClick = (props, marker) => {
      this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
      });
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

    testFunction = (parameters) => {
        Object.values(parameters).filter(parameter => {
            return this.state.passedSelectedOption1.value === parameter.locality && this.state.passedSelectedOption2.value === parameter.type}).map((parameter) =>  {
                return <Marker onClick={this.onMarkerClick}
                                key={parameter.name}
                                restaurant={parameter}
                                position={{lat: parameter.latitude, lng: parameter.longitude}}/>
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
              /*do properties Headera dodajemy clickMethod*/
                <Map google={this.props.google}
                    onClick={this.props.onMapClick}>
                    {this.testFunction(this.state.Vegan)}
                    {this.testFunction(this.state.Glutenfree)}
                    {/*{Object.values(this.state.Vegan).filter(vegan => {*/}
                        {/*return this.state.passedSelectedOption1.value === vegan.locality &&*/}
                            {/*this.state.passedSelectedOption2.value === vegan.type*/}
                    {/*}).map((vegan) => {*/}
                        {/*return <Marker  onClick={this.onMarkerClick}*/}
                                        {/*key={vegan.name}*/}
                                        {/*restaurant={vegan}*/}
                                        {/*position={{*/}
                                            {/*lat: vegan.latitude,*/}
                                            {/*lng: vegan.longitude,*/}
                                        {/*}}/>*/}
                        {/*})*/}
                    {/*}*/}
                    {/*{Object.values(this.state.Glutenfree).filter(glutenfree => {*/}
                        {/*return this.state.passedSelectedOption1.value === glutenfree.locality &&*/}
                            {/*this.state.passedSelectedOption2.value === glutenfree.type*/}
                    {/*}).map((glutenfree) => {*/}
                        {/*return <Marker  onClick={this.onMarkerClick}*/}
                                        {/*key={glutenfree.name}*/}
                                        {/*restaurant={glutenfree}*/}
                                        {/*position={{*/}
                                            {/*lat: glutenfree.latitude,*/}
                                            {/*lng: glutenfree.longitude,*/}
                                        {/*}}/>*/}
                        {/*})*/}
                    {/*}*/}
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