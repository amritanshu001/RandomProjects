import classes from "./TaskItem.module.css";
import React from "react";

const TaskItem = (props) => {
  return <li className={classes.task}>{props.children}</li>;
};

export default TaskItem;
