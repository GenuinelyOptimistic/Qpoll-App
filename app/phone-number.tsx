import { useState, useEffect, useRef } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Linking, Platform } from "react-native";
import auth from 'firebase/auth';
import { useRouter } from 'expo-router';
import { useAuth } from './context/auth'; 
import CountryPicker from 'react-native-country-picker-modal';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from "./constants/global";

export default function PhoneScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);  
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationWrong, setVerificationWrong] = useState(false);

  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [showResendPrompt, setShowResendPrompt] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const router = useRouter();
  const { setUser } = useAuth();

  const handleBackPress = () => {
    // Reset verification state when going back
    setIsVerifying(false);
    setVerificationCode('');
    setVerificationWrong(false);
    setCountdown(30);
    setShowResendPrompt(false);
    router.back();
  };

  useEffect(() => {
    // Get user's current location and set default country
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Location permission denied');
          return;
        }

        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=YOUR_GOOGLE_API_KEY`
        );
        const data = await response.json();
        const countryComponent = data.results[0]?.address_components.find(
          (component: any) => component.types.includes('country')
        );
        if (countryComponent) {
          setCountryCode(countryComponent.short_name);
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getLocation();
  }, []);

  // Timer effect for countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isVerifying && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setShowResendPrompt(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVerifying, countdown]);

  const loginWithPhoneNumber = async () => {
        router.push('/poll');

    // if (!phoneNumber.trim()) {
    //   alert('Please enter a valid phone number');
    //   return;
    // }

    // try {
    //   setLoading(true);
    //   const formattedNumber = `+${callingCode}${phoneNumber.replace(/[^0-9]/g, '')}`;

    //   // For development, completely bypass Firebase for test numbers
    //   if (__DEV__ && (formattedNumber === '+16505553434' || formattedNumber === '+1234567890')) {
    //     console.log('🎭 DEVELOPMENT MODE: Bypassing Firebase auth for test number:', formattedNumber);
    //     // Simulate SMS sending delay
    //     await new Promise(resolve => setTimeout(resolve, 1500));
    //     // Pre-fill verification code and show verification screen
    //     setVerificationCode('123456');
    //     setIsVerifying(true);
    //     setLoading(false);
    //     return;
    //   }

    //   console.log('📱 Sending SMS to:', formattedNumber);
    //   const result = await auth().signInWithPhoneNumber(formattedNumber);
    //   setConfirmationResult(result);
    //   setIsVerifying(true);
    // } catch (error: any) {
    //   console.error('❌ SMS Error:', error);

    //   // In development, if reCAPTCHA fails, show helpful message
    //   if (__DEV__ && error.code === 'auth/captcha-check-failed') {
    //     alert('Development Mode: reCAPTCHA failed. Use test numbers +1 650-555-3434 or +1 234-567-890 with code 123456');
    //     setLoading(false);
    //     return;
    //   }

    //   let errorMessage = 'Error sending verification code. Please check your phone number and try again.';

    //   // Handle specific Firebase auth errors
    //   if (error.code === 'auth/invalid-phone-number') {
    //     errorMessage = 'Invalid phone number format. Please check and try again.';
    //   } else if (error.code === 'auth/missing-phone-number') {
    //     errorMessage = 'Phone number is required.';
    //   } else if (error.code === 'auth/too-many-requests') {
    //     errorMessage = 'Too many requests. Please wait before trying again.';
    //   } else if (error.code === 'auth/quota-exceeded') {
    //     errorMessage = 'SMS quota exceeded. Please try again later.';
    //   }

    //   alert(errorMessage);
    // } finally {
    //   setLoading(false);
    // }
  };

  const verifyCode = async (code: string) => {
    try {
      setLoading(true);

      // For development test numbers, simulate successful verification
      const formattedNumber = `+${callingCode}${phoneNumber.replace(/[^0-9]/g, '')}`;

      await confirmationResult.confirm(code);
      const currentUser = auth().currentUser;
      console.log('User UID:', currentUser?.uid);
      // Move to username page after successful verification
      if (currentUser) {
        setIsVerifying(false);
        router.push('/username');
      }
    } catch (error) {
      console.error(error);
      setVerificationWrong(true);
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    if (!phoneNumber.trim()) {
      alert('Please enter a valid phone number');
      return;
    }

    try {
      setResendLoading(true);
      const formattedNumber = `+${callingCode}${phoneNumber.replace(/[^0-9]/g, '')}`;
      console.log('Resending SMS to:', formattedNumber);
      const result = await auth().signInWithPhoneNumber(formattedNumber);
      setConfirmationResult(result);
      // Reset timer and hide resend prompt
      setCountdown(30);
      setShowResendPrompt(false);
      setVerificationCode('');
      setVerificationWrong(false);
    } catch (error) {
      console.error('SMS Error:', error);
      alert('Error resending verification code. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      {!isVerifying ? (
        <View>
            <View>
              <TouchableOpacity style={globalStyles.customBackButton} onPress={handleBackPress}>
                <MaterialIcons name="arrow-back" size={32} color="#333" />
              </TouchableOpacity>
            </View>
            <Text style={globalStyles.title}>Enter Phone Number</Text>
            <View style={styles.phoneInputContainer}>
            <TouchableOpacity
                style={styles.countryPickerButton}
                onPress={() => setShowCountryPicker(true)}
            >
                <CountryPicker
                withFilter
                withFlag
                withCallingCode
                withEmoji
                countryCode={countryCode as any}
                visible={showCountryPicker}
                onSelect={(country) => {
                    setCountryCode(country.cca2 as any);
                    setCallingCode(country.callingCode[0]);
                    setShowCountryPicker(false);
                }}
                onClose={() => setShowCountryPicker(false)}
                />
                <Text style={styles.callingCode}>+{callingCode}</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone number"
                keyboardType="phone-pad"
            />
            </View>
            
            <Text style={styles.termsText}>
            By continuing, you agree to StreetTalk's{' '}
            <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://spotcam.com/terms')}
            >
                Terms of Use
            </Text>
            <Text style={styles.termsText}> and confirm that you have read StreetTalk's </Text>
            <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://spotcam.com/privacy')}
            >
                Privacy Policy.
            </Text>
            <Text style={styles.termsText}> If you sign up with SMS, SMS fees may apply.</Text>
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={loginWithPhoneNumber}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Sending...' : 'Send Verification Code'}
                </Text>
            </TouchableOpacity>
        </View>
      ) : (
        <View>
            <View>
              <TouchableOpacity style={globalStyles.customBackButton} onPress={handleBackPress}>
                <MaterialIcons name="arrow-back" size={32} color="#333" />
              </TouchableOpacity>
            </View>
            <Text style={globalStyles.title}>Enter 6-digit verification code</Text>
            <Text style={globalStyles.subtitle}>your code was sent to +{callingCode + " " + phoneNumber}</Text>

            <View style={styles.otpContainer}>
                {[...Array(6)].map((_, index) => (
                    <TextInput
                        key={index}
                        style={styles.otpInput}
                        value={verificationCode[index] || ''}
                        onChangeText={(text) => {
                            const newCode = verificationCode.split('');
                            newCode[index] = text.replace(/[^0-9]/g, '');
                            setVerificationCode(newCode.join(''));

                            // Auto-focus next input using refs instead of DOM
                            if (text && index < 5 && inputRefs.current[index + 1]) {
                                inputRefs.current[index + 1]?.focus();
                            }
                            // Handle backspace to previous input
                            if (text === '' && index > 0 && inputRefs.current[index - 1]) {
                                inputRefs.current[index - 1]?.focus();
                            }
                        }}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                    />
                ))}
            </View>

            {verificationWrong && (
                <Text style={styles.errorText}>Invalid verification code. Please try again.</Text>
            )}

            <TouchableOpacity
                style={[
                    styles.button,
                    {opacity: verificationCode.length === 6 ? 1 : 0.5}
                ]}
                onPress={() => verifyCode(verificationCode)}
                disabled={verificationCode.length !== 6 || loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Verifying...' : 'Verify Code'}
                </Text>
            </TouchableOpacity>

            {countdown > 0 ? (
                <Text style={styles.timerText}>Resend code in {countdown} seconds</Text>
            ) : (
                showResendPrompt && (
                  <TouchableOpacity
                      onPress={resendVerificationCode}
                      disabled={resendLoading}
                  >
                      <Text style={styles.resendText}>
                          {resendLoading ? 'Sending...' : 'Resend Code'}
                      </Text>
                  </TouchableOpacity>
                )
            )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2f95dc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
    paddingBottom: 20,
  },
  link: {
    color: '#2f95dc',
    textDecorationLine: 'underline',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  countryPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 7 : 12,
    marginRight: 10,
  },
  callingCode: {
    marginLeft: 5,
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 45,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 5,
  },
  timerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginVertical: 15,
  },
  resendText: {
    color: '#2f95dc',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 30,
    textAlign: 'center',
  },
  devNotice: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2f95dc',
  },
  devTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2f95dc',
    marginBottom: 8,
    textAlign: 'center',
  },
  devText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});
