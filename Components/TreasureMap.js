import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { fetchSites } from "../Redux/sites";

class TreasureMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.fetchSites();
  };

  generateMarkers = () => {
    const markers = this.props.sites.map(site => (
      <Marker
        key={site.id}
        coordinate={{
          latitude: site.latitude,
          longitude: site.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        title="TITLE"
        description="DESCRIPTION"
      />
    ));
    return markers;
  };

  render() {
    console.log(this.props);
    return <MapView style={styles.mapView}>{this.generateMarkers()}</MapView>;
  }
}

const mapStateToProps = state => ({
  sites: state.sites
});

const mapDispatchToProps = dispatch => ({
  fetchSites: () => dispatch(fetchSites())
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
