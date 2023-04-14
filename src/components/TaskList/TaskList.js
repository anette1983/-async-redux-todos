import { useSelector } from 'react-redux';
import { Task } from 'components/Task/Task';
// import { selectTasks, selectStatusFilter } from 'redux/selectors';
// import { statusFilters } from 'redux/constants';
import css from './TaskList.module.css';

import { selectVisibleTasks } from 'redux/selectors';

// const getVisibleTasks = (tasks, statusFilter) => {
//   switch (statusFilter) {
//     case statusFilters.active:
//       return tasks.filter(task => !task.completed);
//     case statusFilters.completed:
//       return tasks.filter(task => task.completed);
//     default:
//       return tasks;
//   }
// };

export const TaskList = () => {
  // const tasks = useSelector(selectTasks);
  // const statusFilter = useSelector(selectStatusFilter);
  // const visibleTasks = getVisibleTasks(tasks, statusFilter);

  const tasks = useSelector(selectVisibleTasks);

  return (
    <ul className={css.list}>
      {/* {visibleTasks.map(task => ( */}
      {tasks.map(task => (
        <li className={css.listItem} key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};
