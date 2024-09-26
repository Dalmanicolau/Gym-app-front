import { combineReducers } from "redux";
import authReducer from './Auth';
import paymentsReducer from './Payments';
import dashboardReducer from "./Dashboard";
import notificationsReducer   from "./notifications";
import memberReducer from "./Member";
import activityReducer from "./Activity";

const rootReducer = combineReducers({
    auth: authReducer,
    payments: paymentsReducer,
    dashboard: dashboardReducer,
    members: memberReducer,
    activities: activityReducer,
    notifications: notificationsReducer
});

export default rootReducer;