import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses } from "../actions/courseActions";

function CoursesPage() {
  // You need initialize courses to get from Store
  // Because it won't load when you navigate between pages
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    // Need to add listener when component mounts
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) {
      loadCourses();
    }
    // Need to remove listener when component unmounts
    // By returning a function in useEffect, you can run some code on unmount
    return () => courseStore.removeChangeListener(onChange);
  }, []);

  // Since we connected the component to the Flux store,
  // this will be called anytime the courses in Store data changes
  // Then we want to get that data and update state
  function onChange() {
    setCourses(courseStore.getCourses());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} />
    </>
  );
}

export default CoursesPage;
