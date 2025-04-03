import React, { useState, useContext } from 'react';
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
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../theme/colors';
import { SPACING } from '../theme/spacing';
import { FONT_SIZE, FONT_FAMILY } from '../theme/typography';
import EmailStep from '../components/forgotPassword/EmailStep';
import VerificationStep from '../components/forgotPassword/VerificationStep';
import ResetPasswordStep from '../components/forgotPassword/ResetPasswordStep';
import SuccessStep from '../components/forgotPassword/SuccessStep';
import { ROUTES } from '../navigation/navigationConstants';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { forgotPassword, resetPassword } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate a random 4-digit verification code
  const generateVerificationCode = () => {
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }
    return code;
  };

  // Handle email submission and send verification code
  const handleEmailSubmit = async (submittedEmail) => {
    setError('');
    setLoading(true);
    try {
      // Generate a random code
      const code = generateVerificationCode();
      
      console.log('Generated code:', code);
      
      // Send a request to the API to request password reset
      await forgotPassword(submittedEmail, code);
      
      // Store email and code for verification
      setEmail(submittedEmail);
      setResetCode(code);
      
      // Move to next step - ensure this always executes after successful API call
      setCurrentStep(2);
    } catch (err) {
      setError(t('forgotPassword.emailError') || 'Failed to send verification code');
      console.error('Error sending code:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle verification code submission
  const handleVerificationSubmit = async (code) => {
    setError('');
    setLoading(true);
    
    try {
      // Convert code array to string
      const codeString = code.join('');
      
      console.log('Entered code:', codeString);
      console.log('Expected code:', resetCode);
      
      // Check if entered code matches the generated code
      if (codeString === resetCode) {
        setVerificationCode(code);
        setCurrentStep(3);
      } else {
        throw new Error(t('forgotPassword.verificationError') || 'Invalid verification code');
      }
    } catch (err) {
      setError(err.message || t('forgotPassword.verificationError') || 'Invalid verification code');
      console.error('Code verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async (password) => {
    setError('');
    setLoading(true);
    try {
      // Send a request to the API to reset the password
      await resetPassword(email, resetCode, password);
      
      console.log('Password reset successful for:', email);
      
      // Move to the final step
      setCurrentStep(4);
    } catch (err) {
      setError(t('forgotPassword.resetError') || 'Failed to reset password');
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle return to login page after successful reset
  const handleReturnToLogin = () => {
    navigation.navigate(ROUTES.LOGIN);
  };

  // Render appropriate step based on currentStep
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
            onPress={() => {
              // Only navigate to login if on the first step or completed the process
              if (currentStep === 1 || currentStep === 4) {
                navigation.navigate(ROUTES.LOGIN);
              } else {
                // Otherwise go back one step
                setCurrentStep(currentStep - 1);
              }
            }}
            disabled={loading}
          >
            <Text style={styles.backButtonText}>
              {currentStep === 1 ? 
                (t('forgotPassword.backToLogin') || 'Back to Login') : 
                (currentStep === 4 ? 
                  (t('forgotPassword.backToLogin') || 'Back to Login') : 
                  (t('forgotPassword.backStep') || 'Back'))}
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
