import React from "react";
import TreasureMap from "./Components/TreasureMap";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TreasureMap />
      </Provider>
    );
  }
}
