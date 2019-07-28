import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { fetchSites, fetchTreasure } from "../Redux/sites";

class TreasureMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
  }

  componentDidMount = () => {
    this.props.fetchSites();
  };

  componentDidUpdate = () => {
    this.zoomInOnMarkers();
  };

  handlePress = id => {
    this.props.siteHasTreasure(id);
  };

  generateMarkers = () => {
    const markers = this.props.sites.map(site => (
      <Marker
        onPress={() => this.handlePress(site.id)}
        key={site.id}
        coordinate={{
          latitude: site.latitude,
          longitude: site.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        }}
      >
        <Image
          source={require("../assets/chest.png")}
          style={{ height: 35, width: 35 }}
        />
      </Marker>
    ));
    return markers;
  };

  zoomInOnMarkers = () => {
    if (this.props.sites.length) {
      const markersLatLong = this.props.sites.map(site => ({
        latitude: site.latitude,
        longitude: site.longitude
      }));
      this.mapRef.fitToCoordinates(markersLatLong, true);
    }
  };

  render() {
    return (
      <MapView
        ref={ref => {
          this.mapRef = ref;
        }}
        style={styles.mapView}
      >
        {this.generateMarkers()}
      </MapView>
    );
  }
}

const mapStateToProps = state => ({
  sites: state.sites
});

const mapDispatchToProps = dispatch => ({
  fetchSites: () => dispatch(fetchSites()),
  siteHasTreasure: id => dispatch(fetchTreasure(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreasureMap);

const styles = StyleSheet.create({
  mapView: {
    flex: 1
  }
});
