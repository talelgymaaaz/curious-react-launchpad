
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type PrivateRouteProps = {
  element: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const location = useLocation();
  const { isAuthenticated, hasAccess } = useAuth();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if user has access to this route
  if (!hasAccess(location.pathname)) {
    // Redirect to dashboard if they don't have access
    return <Navigate to="/dashboard" replace />;
  }
  
  // If authenticated and has access, render the protected component
  return <>{element}</>;
};
