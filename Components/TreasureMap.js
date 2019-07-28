import React from "react";
import MapView from "react-native-maps";
import { StyleSheet } from "react-native";

class TreasureMap extends React.Component {
  render() {
    return (
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        style={styles.mapView}
      />
    );
  }
}

export default TreasureMap;

const styles = StyleSheet.create({
  mapView: {
    flex: 1
  }
});
