import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Provider } from "react-redux";

import PureTaskList from "./TaskList";
import { task, actions } from "./Task.stories";

export const defaultTasks = [
  { ...task, id: "1", title: "Task 1" },
  { ...task, id: "2", title: "Task 2" },
  { ...task, id: "3", title: "Task 3" },
  { ...task, id: "4", title: "Task 4" },
  { ...task, id: "5", title: "Task 5" },
  { ...task, id: "6", title: "Task 6" }
];

export const withPinnedTasks = [
  ...defaultTasks.slice(0, 4),
  { id: "5", title: "Task 5 (pinned)", state: "TASK_PINNED" },
  { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" }
];

// A super-simple mock of a redux store
const getStore = (tasks = defaultTasks) => ({
  getState: () => {
    return {
      tasks
    };
  },
  subscribe: () => 0,
  dispatch: action("dispatch")
});

storiesOf("TaskList", module)
  .add("default", () => (
    <Provider store={getStore()}>
      <div style={{ padding: "3rem" }}>
        <PureTaskList {...actions} />
      </div>
    </Provider>
  ))
  .add("withPinnedTasks", () => (
    <Provider store={getStore(withPinnedTasks)}>
      <div style={{ padding: "3rem" }}>
        <PureTaskList {...actions} />
      </div>
    </Provider>
  ))
  .add("loading", () => (
    <Provider store={getStore([])}>
      <div style={{ padding: "3rem" }}>
        <PureTaskList loading {...actions} />
      </div>
    </Provider>
  ))
  .add("empty", () => (
    <Provider store={getStore([])}>
      <div style={{ padding: "3rem" }}>
        <PureTaskList {...actions} />
      </div>
    </Provider>
  ));
