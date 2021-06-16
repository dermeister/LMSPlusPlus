import React from "react";
import { Task } from "../../domain/Task";
import { Models } from "../../models";
import autorender from "../autorender";
import { ContextMenu } from "../ContextMenu";
import { Explorer } from "../explorer";

interface TasksExplorerProps {
  model: Models.TasksExplorer;
}

export function TasksExplorer({ model }: TasksExplorerProps): JSX.Element {
  return autorender(() => <Explorer model={model}>{courses(model.courses)}</Explorer>);
}

function courses(courses: Models.CourseNode[]): JSX.Element[] {
  return courses.map((course) => (
    <li key={course.id}>
      <Explorer.Group group={course}>
        {course.title}
        {courseContextMenu(course.contextMenu)}
      </Explorer.Group>

      <Explorer.Children group={course}>{tasks(course.children)}</Explorer.Children>
    </li>
  ));
}

function courseContextMenu(model: Models.ContextMenu): JSX.Element {
  return (
    <ContextMenu model={model}>
      <ContextMenu.Button>Edit Course</ContextMenu.Button>
      <ContextMenu.Button>Delete Course</ContextMenu.Button>
    </ContextMenu>
  );
}

function tasks(items: Models.ItemNode<Task>[]): JSX.Element[] {
  return items.map((item) => (
    <Explorer.Item key={item.id} item={item}>
      {item.title}
      {taskContextMenu(item.contextMenu)}
    </Explorer.Item>
  ));
}

function taskContextMenu(model: Models.ContextMenu): JSX.Element {
  return (
    <ContextMenu model={model}>
      <ContextMenu.Button>Edit Task</ContextMenu.Button>
      <ContextMenu.Button>Delete Task</ContextMenu.Button>
    </ContextMenu>
  );
}
