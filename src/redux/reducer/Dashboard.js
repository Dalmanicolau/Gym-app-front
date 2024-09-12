import { GET_DASHBOARD_DATA } from '../actions/Dashboard';

const initialState = {
  membersCount: 0,
  totalIncome: 0,
  membersPerMonth: 0,
  table: [],
  activityByIncome: [],
  notifications: [],
  sportsByMembers: [],
  incomeByMonth: [],
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        ...action.payload,
      };
      
    default:
      return state;
  }

};

export default dashboardReducer;
