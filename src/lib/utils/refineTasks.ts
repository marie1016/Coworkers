import { TaskListTasks } from "@/core/dtos/group/group";

export default function refineTasks(tasks: TaskListTasks[]) {
  const simplifiedTasks = tasks.map((task) => ({
    name: task.name,
    done: !!task.doneAt,
    doneBy: task.doneBy,
    doneAt: task.doneAt,
    description: task.description,
  }));

  const data = {
    totalTasks: simplifiedTasks.length,
    doneTasks: simplifiedTasks.filter((task) => task.done).length,
    tasks: simplifiedTasks,
  };

  const stringifiedData = JSON.stringify(data);

  return stringifiedData;
}
