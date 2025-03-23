
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { API_URL, ENDPOINTS, getApiUrl } from '../config/apiConfig';

export const usePlacesData = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlaces = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(getApiUrl(ENDPOINTS.PLACES));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setPlaces(result.data || []);
    } catch (e) {
      console.error('Error fetching places:', e);
      setPlaces([]);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePlace = async (id) => {
    try {
      const response = await fetch(getApiUrl(ENDPOINTS.PLACE_BY_ID(id)), {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Remove the deleted place from the state
      setPlaces(places.filter(place => place.id !== id));
      return true;
    } catch (e) {
      console.error('Error deleting place:', e);
      Alert.alert('Erreur', `Impossible de supprimer le lieu: ${e.message}`);
      return false;
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return { 
    places, 
    isLoading, 
    error, 
    fetchPlaces,
    deletePlace
  };
};
