import { combineReducers } from "redux";
import authReducer from './Auth';
import paymentsReducer from './Payments';
import dashboardReducer from "./Dashboard";
import {notificationsReducer}  from "./Notifications";
import memberReducer from "./Member";
import activityReducer from "./Activity";

const rootReducer = combineReducers({
    auth: authReducer,
    payments: paymentsReducer,
    dashboard: dashboardReducer,
    notifications: notificationsReducer,
    members: memberReducer,
    activities: activityReducer

});

export default rootReducer;