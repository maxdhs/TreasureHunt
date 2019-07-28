import { treasureApi } from "../API/treasureAPI";
import { Vibration, Alert } from "react-native";

// Sites Reducer

const initialState = { sites: [], isFetching: false, errorFetching: null };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_SITES:
      return { sites: [], isFetching: true, errorFetching: null };
    case ADD_SITES:
      return { sites: action.payload, isFetching: false, errorFetching: null };
    case FETCHING_SITES_FAILED:
      return { sites: [], isFetching: false, errorFetching: action.payload };
    case SITE_HAS_TREASURE:
      if (action.payload) {
        Alert.alert("😄", "You found treasure!");
        Vibration.vibrate(3000);
      } else {
        Alert.alert("😔", "No treasure here.");
      }
      return state;
    default:
      return state;
  }
};

// Async action creators

export const fetchSites = () => dispatch => {
  dispatch(fetchingSites());
  treasureApi
    .getTreasureSites()
    .then(sites => dispatch(addSites(sites)))
    .catch(error => dispatch(fetchingSitesFailed(error)));
};

export const fetchTreasure = id => dispatch => {
  treasureApi
    .siteHasTreasure(id)
    .then(hasTreasure => dispatch(siteHasTreasure(hasTreasure)));
};

// Action creators

const fetchingSites = () => ({
  type: FETCHING_SITES
});

const addSites = sites => ({
  type: ADD_SITES,
  payload: sites
});

const fetchingSitesFailed = errorMessage => ({
  type: FETCHING_SITES_FAILED,
  payload: errorMessage
});

const siteHasTreasure = hasTreasure => ({
  type: SITE_HAS_TREASURE,
  payload: hasTreasure
});

// Action types

const FETCHING_SITES = "FETCHING_SITES";
const ADD_SITES = "ADD_SITES";
const FETCHING_SITES_FAILED = "FETCHING_SITES_FAILED";
const SITE_HAS_TREASURE = "SITE_HAS_TREASURE";
