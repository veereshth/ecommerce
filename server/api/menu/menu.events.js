/**
 * Menu model events
 */

'use strict';

import {EventEmitter} from 'events';
import Menu from './menu.model';
var MenuEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MenuEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Menu.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MenuEvents.emit(event + ':' + doc._id, doc);
    MenuEvents.emit(event, doc);
  }
}

export default MenuEvents;
