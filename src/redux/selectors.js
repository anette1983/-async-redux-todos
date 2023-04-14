import { statusFilters } from './constants';

import { createSelector } from '@reduxjs/toolkit';

export const selectTasks = state => state.tasks.items;
export const selectIsLoading = state => state.tasks.isLoading;
export const selectError = state => state.tasks.error;
export const selectStatusFilter = state => state.filters.status;

// export const selectVisibleTasks = state => {
//   // Використовуємо інші селектори
//   const tasks = selectTasks(state);
//   const statusFilter = selectStatusFilter(state);
//   switch (statusFilter) {
//     case statusFilters.active:
//       return tasks.filter(task => !task.completed);
//     case statusFilters.completed:
//       return tasks.filter(task => task.completed);
//     default:
//       return tasks;
//   }
// };

// export const selectTaskCount = state => {
//   const tasks = selectTasks(state);
//   console.log('Calculating task count');
//   // const count = tasks.reduce(
//   return tasks.reduce(
//     (acc, task) => {
//       if (task.completed) {
//         acc.completed += 1;
//       } else {
//         acc.active += 1;
//       }
//       return acc;
//     },
//     { active: 0, completed: 0 }
//   );
// };

// Використовуємо createSelector та напишемо мемоізований селектор підрахунку кількості завдань selectTaskCount. Він залежить лише від масиву завдань, тому використовуємо один вхідний селектор selectTasks.

export const selectTaskCount = createSelector([selectTasks], tasks => {
  console.log('Calculating task count. Now memoized!');
  return tasks.reduce(
    (count, task) => {
      if (task.completed) {
        count.completed += 1;
      } else {
        count.active += 1;
      }
      return count;
    },
    { active: 0, completed: 0 }
  );
});

// Залежить від списку завдань та фільтра, тому використовуємо вхідні селектори selectTasks та selectStatusFilter:

export const selectVisibleTasks = createSelector(
  [selectTasks, selectStatusFilter],
  (tasks, statusFilter) => {
    console.log('Calculating visible tasks. Now memoized!');
    switch (statusFilter) {
      case statusFilters.active:
        return tasks.filter(task => !task.completed);
      case statusFilters.completed:
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }
);
