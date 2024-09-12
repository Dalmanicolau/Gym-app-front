import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Activities from './pages/Activities';
import Payments from './pages/Payments';
import Notifications from './pages/Notifications';
import Users from './pages/Users';
import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <div>Loading...</div>;
    }
    return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <NavBar /> {/* Fijo en la parte superior */}
          <div className="flex">
            <Sidebar />
            <div className="flex-grow p-6 pt-16"> {/* pt-16 añade padding-top para el espacio del NavBar */}
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/*"
                  element={
                    <PrivateRoute>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/members" element={<Members />} />
                        <Route path="/activities" element={<Activities />} />
                        <Route path="/payments" element={<Payments />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/users" element={<Users />} />
                      </Routes>
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
