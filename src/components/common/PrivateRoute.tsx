import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  allowedRoles: string[];
  user: any;
  children?: React.ReactNode;
}

const getDashboardPath = (role: string) => {
  if (role === 'admin') return '/admin/dashboard';
  if (role === 'employee') return '/employee/dashboard';
  if (role === 'ld') return '/lnd/invite-trainer';
  return '/';
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, allowedRoles, user, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user || !allowedRoles.includes(user.role)) {
    // Authenticated but not allowed for this route, redirect to their dashboard
    return <Navigate to={getDashboardPath(user?.role)} replace />;
  }
  // Render children or Outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute; 