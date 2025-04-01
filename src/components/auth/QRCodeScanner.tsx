import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { CameraView, BarcodeScanningResult } from 'expo-camera';
import { wp, hp, fp } from '../../utils/responsive';
import { X } from 'lucide-react-native';

interface QRCodeScannerProps {
  onClose: () => void;
  onScan: (data: string) => void;
  title?: string;
  instruction?: string;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ 
  onClose, 
  onScan, 
  title = "Scanner QR Code", 
  instruction = "Placez le QR code dans le cadre"
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [attemptingPermission, setAttemptingPermission] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    setAttemptingPermission(true);
    try {
      const { status } = await CameraView.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    } catch (error) {
      console.log("Error requesting camera permission:", error);
      setHasPermission(false);
    } finally {
      setAttemptingPermission(false);
    }
  };

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);
    onScan(data);
  };

  const renderCameraContent = () => {
    if (attemptingPermission) {
      return (
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Demande d'accès à la caméra en cours...</Text>
        </View>
      );
    }
    
    if (hasPermission === null && !attemptingPermission) {
      return (
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Initialisation de la caméra...</Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestCameraPermission}
          >
            <Text style={styles.permissionButtonText}>
              Autoriser l'accès à la caméra
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    if (hasPermission === false) {
      return (
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Accès à la caméra refusé. Veuillez autoriser l'accès à la caméra dans les paramètres de votre appareil.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestCameraPermission}
          >
            <Text style={styles.permissionButtonText}>
              Réessayer
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={StyleSheet.absoluteFill}>
        {hasPermission && (
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        )}
        <View style={styles.overlay}>
          <View style={styles.unfilled} />
          <View style={styles.row}>
            <View style={styles.unfilled} />
            <View style={styles.scanner} />
            <View style={styles.unfilled} />
          </View>
          <View style={styles.unfilled} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cameraContainer}>
        {renderCameraContent()}
      </View>

      <Text style={styles.instruction}>{instruction}</Text>
      
      {scanned && (
        <TouchableOpacity 
          style={styles.rescanButton} 
          onPress={() => setScanned(false)}
        >
          <Text style={styles.rescanButtonText}>Scanner à nouveau</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    paddingTop: Platform.OS === 'ios' ? hp(50) : hp(20),
    paddingBottom: hp(20),
  },
  title: {
    color: '#fff',
    fontSize: fp(18),
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  webCameraContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  unfilled: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  row: {
    flexDirection: 'row',
    height: wp(250),
  },
  scanner: {
    width: wp(250),
    height: wp(250),
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
  },
  instruction: {
    color: '#fff',
    fontSize: fp(16),
    textAlign: 'center',
    padding: hp(20),
  },
  rescanButton: {
    backgroundColor: '#2563EB',
    padding: hp(15),
    margin: wp(20),
    borderRadius: 10,
    alignItems: 'center',
  },
  rescanButtonText: {
    color: '#fff',
    fontSize: fp(16),
    fontWeight: 'bold',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(20),
    backgroundColor: '#000',
  },
  permissionText: {
    color: '#fff',
    fontSize: fp(16),
    textAlign: 'center',
    marginBottom: hp(20),
  },
  permissionButton: {
    backgroundColor: '#2563EB',
    paddingVertical: hp(12),
    paddingHorizontal: wp(24),
    borderRadius: wp(8),
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: fp(16),
    fontWeight: 'bold',
  },
});

export default QRCodeScanner;
