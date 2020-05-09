import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _courses = [];

// Needs to emit events for each change, hence extend EventEmitter
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

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find(course => course.slug === slug);
  }
}

// create instance of the Store class
const store = new CourseStore();

// regiter Store with the Dispatcher so that Store
// is notified when actions occur
//  The arrow function is called anytime an action is dispatched
// This makes Flux a different pattern that traditional pub-sub
// Every store that is registered with the dispatcher is notified of
// EVERY SINGLE ACTION
Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    default:
  }
});
export default store;
