import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "../actions/actionTypes";

// This entire function is called an action creator
// An action creator is a handy helper that wraps our actions.
// Makes us easy to create the actions and have them dispatched via the dispatcher
export function saveCourse(course) {
  //Return the promise that's generated from calling courseApi.saveCourse.
  // This way the caller will be notified when the promise resolves
  return courseApi.saveCourse(course).then(savedCourse => {
    // The Action
    // Hey dispatcher, go tell the stores that a course was just created!
    dispatcher.dispatch({
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: savedCourse
    });
  });
}

export function loadCourses() {
  return courseApi.getCourses().then(courses => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses
    });
  });
}
