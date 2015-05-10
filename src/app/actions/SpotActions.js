var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

let _dispatchToken = null;

module.exports = {
  dispatchToken: _dispatchToken,

  addSpot(spot) {
    _dispatchToken = AppDispatcher.handleViewAction({
      type: AppConstants.ActionTypes.ADD_SPOT_TO_TRIP,
      spot: spot
    });
  },

  removeSpot(id) {
    _dispatchToken = AppDispatcher.handleViewAction({
      type: AppConstants.ActionTypes.REMOVE_SPOT_FROM_TRIP,
      id: id
    });
  }
};
