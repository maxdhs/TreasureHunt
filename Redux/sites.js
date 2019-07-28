import { treasureApi } from "../API/treasureAPI";

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
    default:
      return state;
  }
};

// Async action creator

export const fetchSites = () => dispatch => {
  dispatch(fetchingSites());
  treasureApi
    .getTreasureSites()
    .then(sites => dispatch(addSites(sites)))
    .catch(error => dispatch(fetchingSitesFailed(error)));
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

// Action types

const FETCHING_SITES = "FETCHING_SITES";
const ADD_SITES = "ADD_SITES";
const FETCHING_SITES_FAILED = "FETCHING_SITES_FAILED";
