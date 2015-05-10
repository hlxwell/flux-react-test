const BaseStore = require('./BaseStore');
const AppConstants = require('../constants/AppConstants');
const AppDispatcher = require('../dispatchers/AppDispatcher');
const assign = require('object-assign');

// Store vars
let currentTrip = {
  spots: []
};

// Store is a object extend from BaseStore.
let TripStore = assign({}, BaseStore, {
  getCurrentTrip() {
    return currentTrip;
  }
});

// To process Action here.
AppDispatcher.register(function(payload) {
  let action = payload.action;

  switch(action.type) {
    case AppConstants.ActionTypes.ADD_SPOT_TO_TRIP:
      let tripHasSpot = _.findIndex(currentTrip.spots, function(spot) {
        return spot.id == action.spot.id
      }) != -1;

      if (!tripHasSpot) {
        currentTrip.spots.push(action.spot);
        TripStore.emitChange();
      }
      break;

    case AppConstants.ActionTypes.REMOVE_SPOT_FROM_TRIP:
      _.remove(currentTrip.spots, function(spot){
        return action.id == spot.id;
      });
       TripStore.emitChange();
      break;

  }
});

module.exports = TripStore;