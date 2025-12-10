import { CameraView, useCameraPermissions, BarcodeType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false)
  const [scannedData, setScannedData] = useState<string | null>(null)
  const BARCODETYPES: BarcodeType[] = [
    "aztec",
    "ean13",
    "ean8",
    "qr",
    "pdf417",
    "upc_e",
    "datamatrix",
    "code39",
    "code93",
    "itf14",
    "codabar",
    "code128",
    "upc_a",
  ];

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

    function handleBarcodeScanned({ type, data }: { type: string; data: string }) {
    setScanning(false); 
    setScannedData(data);
  }



  return (
    <View style={styles.container}>
      <CameraView           
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanning ? handleBarcodeScanned : undefined}
        barcodeScannerSettings={{
        barcodeTypes: BARCODETYPES,
        }} 
      />
      <View style={styles.buttonContainer}>
      {scannedData && (
        <Text style={styles.message}>Barcode: {scannedData}</Text>
      )}
      
      <Button 
        title="Scan barcode"
        onPress={() => { 
          setScannedData(null)
          setScanning(true)
        }}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    color:"#fff",
    textAlign: 'center',
    paddingBottom: 10,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    width: '70%',
    alignSelf: 'center'
  },
});
