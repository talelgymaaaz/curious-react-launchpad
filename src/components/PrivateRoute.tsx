
/**
 * PrivateRoute.tsx
 * 
 * Description (FR):
 * Ce composant protège les routes qui nécessitent une authentification.
 * Fonctionnalités:
 * - Vérifie si l'utilisateur est authentifié
 * - Redirige vers la page de connexion si non authentifié
 * - Vérifie les permissions d'accès basées sur le rôle
 * - Affiche un indicateur de chargement pendant la vérification
 */

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

type PrivateRouteProps = {
  element: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const location = useLocation();
  const { isAuthenticated, hasAccess } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  console.log("PrivateRoute - path:", location.pathname, "isAuthenticated:", isAuthenticated);
  
  // Set a timeout to prevent flashing loading state for fast auth checks
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show loading indicator while checking authentication status
  if ((localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('userData') && !isAuthenticated) || 
      (isLoading && localStorage.getItem('isAuthenticated') === 'true')) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background transition-opacity">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <span className="ml-2 text-lg mt-4 font-medium text-primary">Chargement...</span>
        </div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if user has access to this route
  const hasPermission = hasAccess(location.pathname);
  console.log("User has access to", location.pathname, ":", hasPermission);
  
  if (!hasPermission && !location.pathname.startsWith('/properties/')) {
    // Redirect to properties instead of dashboard if they don't have access
    // But allow accessing property detail pages
    return <Navigate to="/properties" replace />;
  }
  
  // If authenticated and has access, render the protected component
  return <>{element}</>;
};
