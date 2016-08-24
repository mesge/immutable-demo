/*
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */

import Flux from 'flux';

var AppDispatcher = new Flux.Dispatcher();

AppDispatcher.handleViewAction = function (action) {
    this.dispatch(action);
}

export default AppDispatcher;
