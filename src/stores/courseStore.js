import { EventEmitter } from "events";
const CHANGE_EVENT = "change";
// Needs to emit events for each change
class CourseStore extends EventEmitter {
  // Will allow React components to subscribe to
  // our store so that they're notified when changes occur
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  // Will allow React components to unsubscribe from the store
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }
}

// create instance of the Store class
const store = new CourseStore();
