import {configureStore} from '@reduxjs/toolkit';
import notificationCountReducer from '../feature/notification/NotificationCountSlice';

export default configureStore({
  reducer: {
    notificationCount:  notificationCountReducer,
  }
})
