
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { CircleAlert as AlertCircle, CircleCheck as CheckCircle, Plus, Phone, AlertTriangle, Building2, ShieldAlert } from 'lucide-react-native';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { wp, hp, fp } from '../../src/utils/responsive';
import ThemedStatusBar from '../../src/components/ThemedStatusBar';
import React, { useState } from 'react';
import { useFrameworkReady } from '../../hooks/useFrameworkReady';

export default function IncidentsScreen() {
  useFrameworkReady();
  const colors = useThemeColors();
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      title: 'Porte forcée',
      time: 'Il y a 10 minutes',
      location: 'Entrée principale - Bâtiment A',
      status: 'urgent',
      resolved: false,
      description: 'Traces de pied-de-biche visibles sur le cadre de la porte. Système d\'alarme désactivé manuellement.'
    },
    {
      id: 2,
      title: 'Fenêtre ouverte',
      time: 'Il y a 1 heure',
      location: '2ème étage - Bureau 204',
      status: 'resolved',
      resolved: true,
      description: 'Fenêtre laissée ouverte après les heures de bureau. Fermée et sécurisée.'
    },
    {
      id: 3,
      title: 'Alarme incendie',
      time: 'Il y a 3 heures',
      location: 'Parking souterrain - Niveau 2',
      status: 'urgent',
      resolved: false,
      description: 'Déclenchement de l\'alarme incendie. Possibilité de fumée détectée près des installations électriques.'
    },
    {
      id: 4,
      title: 'Camera défectueuse',
      time: 'Hier',
      location: 'Couloir est - 1er étage',
      status: 'moderate',
      resolved: false,
      description: 'La caméra ne répond plus au système central. Vérification technique nécessaire.'
    }
  ]);

  const handleResolveIncident = (id: number) => {
    // In a real app, you would update the incident status in your backend
    setIncidents(
      incidents.map((incident) => 
        incident.id === id ? { ...incident, resolved: true, status: 'resolved' } : incident
      )
    );
    Alert.alert('Incident résolu', 'L\'incident a été marqué comme résolu.');
  };

  const handleEmergencyCall = (type: string) => {
    let number = '';
    let service = '';
    
    switch(type) {
      case 'police':
        number = '17';
        service = 'la Police';
        break;
      case 'emergency':
        number = '15';
        service = 'les Services d\'Urgence';
        break;
      case 'headquarters':
        number = '0123456789'; // Example number
        service = 'le Centre de Sécurité';
        break;
      case 'fire':
        number = '18';
        service = 'les Pompiers';
        break;
    }
    
    Alert.alert(
      `Appeler ${service}`,
      `Êtes-vous sûr de vouloir appeler ${service} (${number}) ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        { 
          text: 'Appeler', 
          onPress: () => console.log(`Calling ${type}: ${number}`) 
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedStatusBar />
      
      <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
        <Text style={[styles.title, { color: colors.text, fontSize: fp(24) }]}>Incidents</Text>
      </View>

      <View style={styles.emergencyContainer}>
        <Text style={[styles.emergencyTitle, { color: colors.text }]}>Actions rapides</Text>
        <View style={styles.emergencyButtonsContainer}>
          <TouchableOpacity 
            style={[styles.emergencyButton, { backgroundColor: '#ea384c' }]}
            onPress={() => handleEmergencyCall('police')}
          >
            <ShieldAlert color="white" size={wp(24)} />
            <Text style={styles.emergencyButtonText}>Police</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.emergencyButton, { backgroundColor: '#0FA0CE' }]}
            onPress={() => handleEmergencyCall('emergency')}
          >
            <Phone color="white" size={wp(24)} />
            <Text style={styles.emergencyButtonText}>Urgence</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.emergencyButton, { backgroundColor: '#9b87f5' }]}
            onPress={() => handleEmergencyCall('headquarters')}
          >
            <Building2 color="white" size={wp(24)} />
            <Text style={styles.emergencyButtonText}>Centre</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.emergencyButton, { backgroundColor: '#ff9500' }]}
            onPress={() => handleEmergencyCall('fire')}
          >
            <AlertTriangle color="white" size={wp(24)} />
            <Text style={styles.emergencyButtonText}>Pompiers</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: hp(100) }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Incidents actifs</Text>
        
        {incidents.filter(incident => !incident.resolved).length === 0 && (
          <View style={[styles.emptyState, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
            <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
              Aucun incident actif pour le moment
            </Text>
          </View>
        )}
        
        {incidents
          .filter(incident => !incident.resolved)
          .map((incident) => (
            <View 
              key={incident.id} 
              style={[
                styles.incidentCard, 
                { backgroundColor: colors.card, shadowColor: colors.shadow }
              ]}
            >
              <View 
                style={[
                  styles.statusDot, 
                  incident.status === 'urgent' 
                    ? { backgroundColor: colors.danger } 
                    : incident.status === 'resolved' 
                      ? { backgroundColor: colors.success } 
                      : { backgroundColor: colors.warning }
                ]} 
              />
              <View style={styles.incidentInfo}>
                <Text style={[styles.incidentTitle, { color: colors.text, fontSize: fp(17) }]}>
                  {incident.title}
                </Text>
                <Text style={[styles.incidentTime, { color: colors.textSecondary, fontSize: fp(14) }]}>
                  {incident.time}
                </Text>
                <Text style={[styles.incidentLocation, { color: colors.textSecondary, fontSize: fp(14) }]}>
                  {incident.location}
                </Text>
                <Text style={[styles.incidentDescription, { color: colors.text, fontSize: fp(14) }]}>
                  {incident.description}
                </Text>
                
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: colors.success }]}
                  onPress={() => handleResolveIncident(incident.id)}
                >
                  <CheckCircle color="white" size={wp(16)} style={{ marginRight: wp(8) }} />
                  <Text style={styles.actionButtonText}>Résoudre</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: hp(20) }]}>Incidents résolus</Text>
        
        {incidents.filter(incident => incident.resolved).length === 0 && (
          <View style={[styles.emptyState, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
            <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
              Aucun incident résolu
            </Text>
          </View>
        )}
        
        {incidents
          .filter(incident => incident.resolved)
          .map((incident) => (
            <View 
              key={incident.id} 
              style={[
                styles.incidentCard, 
                { backgroundColor: colors.card, shadowColor: colors.shadow, opacity: 0.8 }
              ]}
            >
              <View 
                style={[
                  styles.statusDot, 
                  { backgroundColor: colors.success }
                ]} 
              />
              <View style={styles.incidentInfo}>
                <Text style={[styles.incidentTitle, { color: colors.text, fontSize: fp(17) }]}>
                  {incident.title}
                </Text>
                <Text style={[styles.incidentTime, { color: colors.textSecondary, fontSize: fp(14) }]}>
                  {incident.time}
                </Text>
                <Text style={[styles.incidentLocation, { color: colors.textSecondary, fontSize: fp(14) }]}>
                  {incident.location}
                </Text>
                <Text style={[styles.incidentDescription, { color: colors.text, fontSize: fp(14) }]}>
                  {incident.description}
                </Text>
              </View>
              <AlertCircle color={colors.success} size={wp(24)} />
            </View>
          ))}
      </ScrollView>

      <TouchableOpacity 
        style={[
          styles.addButton, 
          { 
            backgroundColor: colors.primary,
            bottom: Platform.OS === 'ios' ? hp(20) + hp(50) : hp(20)
          }
        ]}
      >
        <Plus size={wp(22)} color="white" style={{ marginRight: wp(8) }} />
        <Text style={[styles.addButtonText, { color: 'white', fontSize: fp(16) }]}>
          Signaler un nouvel incident
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: wp(15),
    paddingTop: 0,
  },
  title: {
    fontWeight: 'bold',
  },
  emergencyContainer: {
    padding: wp(20),
    paddingBottom: 0,
  },
  emergencyTitle: {
    fontSize: fp(18),
    fontWeight: 'bold',
    marginBottom: hp(10),
  },
  emergencyButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(15),
  },
  emergencyButton: {
    width: wp(70),
    height: wp(70),
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: fp(12),
    fontWeight: 'bold',
    marginTop: hp(5),
  },
  content: {
    flex: 1,
    padding: wp(20),
  },
  sectionTitle: {
    fontSize: fp(18),
    fontWeight: 'bold',
    marginBottom: hp(15),
  },
  emptyState: {
    padding: wp(20),
    borderRadius: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(15),
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  emptyStateText: {
    fontSize: fp(16),
    fontStyle: 'italic',
  },
  incidentCard: {
    padding: wp(20),
    borderRadius: wp(10),
    marginBottom: hp(15),
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statusDot: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    marginRight: wp(15),
    marginTop: wp(6),
  },
  incidentInfo: {
    flex: 1,
  },
  incidentTitle: {
    fontWeight: 'bold',
    marginBottom: hp(4),
  },
  incidentTime: {
    marginTop: hp(4),
  },
  incidentLocation: {
    marginTop: hp(2),
  },
  incidentDescription: {
    marginTop: hp(8),
    lineHeight: fp(20),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(8),
    paddingHorizontal: wp(15),
    borderRadius: wp(20),
    marginTop: hp(12),
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fp(14),
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: wp(20),
    right: wp(20),
    padding: wp(15),
    borderRadius: wp(8),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  addButtonText: {
    fontWeight: 'bold',
  },
});
