import React, { useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { ArrowLeft, Send, ChevronRight, Save } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { FONT_SIZE } from '../../theme/typography';
import { AuthContext } from '../../context/AuthContext';
import { API_URL, ENDPOINTS, getApiUrl } from '../../config/apiConfig';
import StepIndicator from '../../components/place/StepIndicator';
import BasicInfoStep from '../../components/place/BasicInfoStep';
import LocationStep from '../../components/place/LocationStep';
import ImageUploadStep from '../../components/place/ImageUploadStep';
import DetailsStep from '../../components/place/DetailsStep';
import SummaryStep from '../../components/place/SummaryStep';
import SuccessModal from '../../common/SuccessModal';
import { usePlacesData } from '../../hooks/usePlacesData';

const AddPlaceScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const scrollViewRef = useRef(null);
  const { addPlace } = usePlacesData();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    typeName: '',
    description: '',
    location: {
      latitude: null,
      longitude: null,
      address: '',
      city: '',
      region: ''
    },
    images: [],
    openingHours: {
      monday: '9:00-17:00',
      tuesday: '9:00-17:00',
      wednesday: '9:00-17:00',
      thursday: '9:00-17:00',
      friday: '9:00-17:00',
      saturday: '10:00-15:00',
      sunday: 'Fermé'
    },
    entranceFee: {
      adult: 0,
      child: 0,
      student: 0
    },
    provider_id: user?.id || null
  });

  const steps = [
    'Informations',
    'Localisation',
    'Images',
    'Détails',
    'Résumé'
  ];

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Basic Info
        if (!formData.name) {
          Alert.alert('Erreur', 'Veuillez entrer un nom pour ce lieu.');
          return false;
        }
        if (!formData.type) {
          Alert.alert('Erreur', 'Veuillez sélectionner un type de lieu.');
          return false;
        }
        return true;
        
      case 1: // Location
        if (!formData.location.latitude || !formData.location.longitude) {
          Alert.alert('Erreur', 'Veuillez sélectionner un emplacement sur la carte.');
          return false;
        }
        if (!formData.location.address) {
          Alert.alert('Erreur', 'Veuillez entrer une adresse.');
          return false;
        }
        if (!formData.location.city) {
          Alert.alert('Erreur', 'Veuillez entrer une ville.');
          return false;
        }
        return true;
        
      case 2: // Images
        if (!formData.images || formData.images.length === 0) {
          Alert.alert(
            'Aucune image', 
            'Voulez-vous continuer sans ajouter d\'images?',
            [
              { text: 'Ajouter des images', style: 'cancel' },
              { text: 'Continuer', onPress: () => nextStep() }
            ]
          );
          return false;
        }
        return true;
        
      case 3: // Details
      case 4: // Summary
        return true;
        
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      navigation.goBack();
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      nextStep();
    }
  };

  const prepareDataForSubmission = () => {
    const submissionData = { ...formData };
    
    if (submissionData.entranceFee) {
      submissionData.entranceFee.adult = parseFloat(submissionData.entranceFee.adult) || 0;
      submissionData.entranceFee.child = parseFloat(submissionData.entranceFee.child) || 0;
      submissionData.entranceFee.student = parseFloat(submissionData.entranceFee.student) || 0;
    }
    
    if (submissionData.location) {
      submissionData.location.latitude = parseFloat(submissionData.location.latitude) || 0;
      submissionData.location.longitude = parseFloat(submissionData.location.longitude) || 0;
    }
    
    delete submissionData.typeName;
    
    submissionData.provider_id = user?.id || null;
    
    console.log('Données préparées pour soumission:', JSON.stringify(submissionData, null, 2));
    
    return submissionData;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmissionError(null);
      
      const submissionData = prepareDataForSubmission();
      
      const result = await addPlace(submissionData);
      
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout du lieu:', error);
      setSubmissionError(error.message);
      Alert.alert(
        'Erreur',
        error.message || 'Une erreur s\'est produite lors de l\'ajout du lieu'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigation.navigate('ProviderDashboard');
  };

  const updateField = (field, value) => {
    setFormData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoStep 
            formData={formData}
            updateField={updateField}
          />
        );
      case 1:
        return (
          <LocationStep 
            formData={formData} 
            setFormData={setFormData} 
          />
        );
      case 2:
        return (
          <ImageUploadStep 
            formData={formData} 
            setFormData={setFormData} 
          />
        );
      case 3:
        return (
          <DetailsStep 
            formData={formData} 
            setFormData={setFormData} 
          />
        );
      case 4:
        return (
          <SummaryStep 
            formData={formData} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={prevStep}
        >
          <ArrowLeft size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter un lieu</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.indicatorContainer}>
        <StepIndicator currentStep={currentStep} steps={steps} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Animatable.View
            animation="fadeIn"
            duration={500}
            style={styles.content}
          >
            {renderStepContent()}
          </Animatable.View>
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.prevButton}
            onPress={prevStep}
          >
            <ArrowLeft size={20} color={COLORS.primary} />
            <Text style={styles.prevButtonText}>Précédent</Text>
          </TouchableOpacity>

          {currentStep < steps.length - 1 ? (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>Suivant</Text>
              <ChevronRight size={20} color={COLORS.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <>
                  <Text style={styles.submitButtonText}>Enregistrer</Text>
                  <Save size={20} color={COLORS.white} />
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>

      {submissionError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{submissionError}</Text>
        </View>
      )}

      <SuccessModal
        visible={showSuccessModal}
        message="Votre lieu a été ajouté avec succès !"
        onClose={handleSuccessModalClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? SPACING.xl : SPACING.md,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: SPACING.xxl,
  },
  content: {
    padding: SPACING.md,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_light,
    backgroundColor: COLORS.white,
  },
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  prevButtonText: {
    marginLeft: SPACING.xs,
    color: COLORS.primary,
    fontWeight: '600',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
  },
  nextButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight: SPACING.xs,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
  },
  submitButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight: SPACING.xs,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: FONT_SIZE.sm,
  },
});

export default AddPlaceScreen;
