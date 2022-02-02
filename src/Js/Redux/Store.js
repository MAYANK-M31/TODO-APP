import { configureStore } from '@reduxjs/toolkit';
import BoardReducer from './Reducer/BoardReducer';
import NewTasksReducer from './Reducer/NewTasksReducer';
import CompletedTasksReducer from './Reducer/CompletedTasksReducer';
import CurrentBoardId from './Reducer/CurrentBoardId';


export default configureStore({
  reducer: {
    boards: BoardReducer,
    newTasks: NewTasksReducer,
    completedTasks: CompletedTasksReducer,
    BoardId:CurrentBoardId
  },
});
