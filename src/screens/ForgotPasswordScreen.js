
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../theme/colors';
import { SPACING } from '../theme/spacing';
import { FONT_SIZE, FONT_FAMILY } from '../theme/typography';
import { API_URL } from '../config/apiConfig';
import EmailStep from '../components/forgotPassword/EmailStep';
import VerificationStep from '../components/forgotPassword/VerificationStep';
import ResetPasswordStep from '../components/forgotPassword/ResetPasswordStep';
import SuccessStep from '../components/forgotPassword/SuccessStep';
import { ROUTES } from '../navigation/navigationConstants';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Génère un code de vérification à 4 chiffres aléatoire
  // (Generates a random 4-digit verification code)
  const generateVerificationCode = () => {
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }
    return code;
  };

  // Gère la soumission de l'email et l'envoi du code de vérification
  // (Handles email submission and sending verification code)
  const handleEmailSubmit = async (submittedEmail) => {
    setError('');
    setLoading(true);
    try {
      // Génère un code aléatoire
      // (Generate a random code)
      const code = generateVerificationCode();
      
      // Envoie une requête à l'API pour demander la réinitialisation du mot de passe
      // (Send a request to the API to request password reset)
      const response = await fetch(`${API_URL}/password/forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: submittedEmail,
          resetCode: code
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec de l\'envoi du code');
      }
      
      console.log('Code envoyé avec succès:', code);
      
      // Stocke l'email et le code pour une vérification ultérieure
      // (Store email and code for later verification)
      setEmail(submittedEmail);
      setResetCode(code);
      
      // Passe à l'étape suivante
      // (Move to the next step)
      setCurrentStep(2);
    } catch (err) {
      setError(t('forgotPassword.emailError') || 'Échec de l\'envoi du code de vérification');
      console.error('Erreur lors de l\'envoi du code:', err);
    } finally {
      setLoading(false);
    }
  };

  // Gère la soumission du code de vérification
  // (Handles verification code submission)
  const handleVerificationSubmit = async (code) => {
    setError('');
    setLoading(true);
    
    try {
      // Convertit le tableau de code en chaîne
      // (Convert code array to string)
      const codeString = code.join('');
      
      // Vérifie si le code entré correspond au code généré
      // (Check if entered code matches the generated code)
      if (codeString === resetCode) {
        setVerificationCode(code);
        setCurrentStep(3);
      } else {
        throw new Error(t('forgotPassword.verificationError') || 'Code de vérification invalide');
      }
    } catch (err) {
      setError(err.message || t('forgotPassword.verificationError') || 'Code de vérification invalide');
      console.error('Erreur de vérification du code:', err);
    } finally {
      setLoading(false);
    }
  };

  // Gère la réinitialisation du mot de passe
  // (Handles password reset)
  const handlePasswordReset = async (password) => {
    setError('');
    setLoading(true);
    try {
      // Envoie une requête à l'API pour réinitialiser le mot de passe
      // (Send a request to the API to reset the password)
      const response = await fetch(`${API_URL}/password/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec de la réinitialisation du mot de passe');
      }
      
      console.log('Mot de passe réinitialisé avec succès pour:', email);
      
      // Passe à l'étape finale
      // (Move to the final step)
      setCurrentStep(4);
    } catch (err) {
      setError(t('forgotPassword.resetError') || 'Échec de la réinitialisation du mot de passe');
      console.error('Erreur lors de la réinitialisation du mot de passe:', err);
    } finally {
      setLoading(false);
    }
  };

  // Gère le retour à la page de connexion après réinitialisation réussie
  // (Handles return to login page after successful reset)
  const handleReturnToLogin = () => {
    navigation.navigate(ROUTES.LOGIN);
  };

  // Rendu de l'étape appropriée en fonction de currentStep
  // (Render the appropriate step based on currentStep)
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <EmailStep onSubmit={handleEmailSubmit} loading={loading} error={error} />;
      case 2:
        return (
          <VerificationStep 
            email={email} 
            onSubmit={handleVerificationSubmit} 
            onResendCode={() => handleEmailSubmit(email)}
            loading={loading} 
            error={error}
          />
        );
      case 3:
        return <ResetPasswordStep onSubmit={handlePasswordReset} loading={loading} error={error} />;
      case 4:
        return <SuccessStep onReturnToLogin={handleReturnToLogin} />;
      default:
        return <EmailStep onSubmit={handleEmailSubmit} loading={loading} error={error} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              {t('forgotPassword.title') || 'Reset Password'}
            </Text>
            <Text style={styles.subtitle}>
              {t('forgotPassword.subtitle') || 'Follow the steps to reset your password'}
            </Text>
          </View>
          
          <View style={styles.stepIndicatorContainer}>
            {[1, 2, 3, 4].map((step) => (
              <View 
                key={step}
                style={[
                  styles.stepIndicator,
                  currentStep >= step ? styles.activeStep : styles.inactiveStep,
                ]}
              >
                {currentStep > step ? (
                  <Text style={styles.stepCheckmark}>✓</Text>
                ) : (
                  <Text style={currentStep === step ? styles.activeStepText : styles.inactiveStepText}>
                    {step}
                  </Text>
                )}
              </View>
            ))}
          </View>
          
          <View style={styles.content}>
            {renderStep()}
          </View>
          
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.navigate(ROUTES.LOGIN)}
            disabled={loading || currentStep === 4}
          >
            <Text style={styles.backButtonText}>
              {t('forgotPassword.backToLogin') || 'Back to Login'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
    textAlign: 'center',
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  stepIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.sm,
  },
  activeStep: {
    backgroundColor: COLORS.primary,
  },
  inactiveStep: {
    backgroundColor: COLORS.light_gray,
  },
  activeStepText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  inactiveStepText: {
    color: COLORS.gray,
    fontWeight: '600',
  },
  stepCheckmark: {
    color: COLORS.white,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    marginBottom: SPACING.lg,
  },
  backButton: {
    alignSelf: 'center',
    marginTop: SPACING.md,
    padding: SPACING.sm,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.md,
  },
});

export default ForgotPasswordScreen;
