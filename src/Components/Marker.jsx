import React from 'react';

// let marker = new google.maps.Marker({
//     position: somePosition,
//     map: map
// });

export class Marker extends React.Component {

    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
            (this.props.position !== prevProps.position)) {
            this.renderMarker();
        }
    }
    componentDidMount() {
        this.renderMarker();
    }
    componentWillUnmount() {
        if (this.marker) {
            this.marker.setMap(null);
        }
    }
    renderMarker(){
        let {
            map, google, position, mapCenter, restaurant,
        } = this.props;

        let pos = position || mapCenter;
        position = new google.maps.LatLng(pos.lat, pos.lng);

        const pref = {
            map: map,
            position: position
        };
        this.marker = new google.maps.Marker(pref);
        this.marker.addListener('click', () => this.props.onClick(restaurant, this.marker));


    }

    render() {
        return null;
    }
}
