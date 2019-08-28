import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';




export class Map extends React.Component{
  constructor(props){
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.google !== this.props.google){
      this.loadMap();
    }
  }


  componentDidMount() {
    this.loadMap();
  }

  loadMap(){
    if (this.props && this.props.google){
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDom.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = initialCenter;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
      });
      this.map = new maps.Map(node, mapConfig);
    }
  }

  renderChildren(){
    const {children} = this.props;
    if (!children) return;
     return React.Children.map(children, c => {
       return React.cloneElement(c, {
         map: this.map,
         google: this.props.google,
         mapCenter: this.state.currentLocation
       });
     })
  }

  render() {
    const style = {
      width: '100vw',
      height: '100vw'
    };

    return (
        <div style={style} ref='map'> Loading map...
          {this.renderChildren()}
        </div>
    )
  }
}

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
};

Map.defaultProps = {
  zoom: 12,
  // Warsaw, by default
  initialCenter: {
    lat: 52.229676,
    lng: 21.012229
  }
};