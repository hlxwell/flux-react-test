const BaseStore = require('./BaseStore');
const assign = require('object-assign');
const AppDispatcher = require('../dispatchers/AppDispatcher');
const AppConstants = require('../constants/AppConstants');

const SPOTS_URL = 'http://www.odigo.travel/1/spots.json';

let _spots = [
  {
    id: 1,
    name: "hello"
  }, {
    id: 2,
    name: "shit"
  }, {
    id: 3,
    name: "very bad"
  }
];

let SpotStore = assign({}, BaseStore, {

  getAll() {
    return _spots;
  }

});

// AppDispatcher.waitFor([OtherStoreB.dispatchToken, OtherStoreB.dispatchToken]);
AppDispatcher.register(function(payload) {
  let action = payload.action;

  // switch(action.type) {
  //   case AppConstants.ActionTypes.ADD_SPOT_TO_TRIP:
  //     _spots.push(action.spot)
  //     SpotStore.emitChange();
  //     break;
  //   case AppConstants.ActionTypes.REMOVE_SPOT_FROM_TRIP:
  //     _spots = _.remove(_spots, function(spot){
  //       return spot.id == action.id;
  //     });
  //      SpotStore.emitChange();
  //     break;
  // }
});

module.exports = SpotStore;