import { View, Text, StyleSheet, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { MARGIN_HORIZONTAL } from "../src/constants";
import { FC, useEffect, useState } from "react";
import AuthTextInput from "../components/AuthTextInput";

type LoginProps = {
  login: (username: string, password: string) => Promise<void>;
  authError: string | null;
}

const LoginScreen: FC<LoginProps> = ({ login, authError }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [warning, setWarning] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('haslo123');
  const [loading, setLoading] = useState<boolean>(false);
  const filled = username.length > 0 && password.length > 0;
  const nav = useNavigation();

  const handleLoginPress = async () => {
    if (!filled || loading) return;
    setLoading(true);
    await login(username, password);
    setLoading(false);
  }

  useEffect(() => {
    setWarning(authError);
  }, [authError]);

  useEffect(() => {
    setWarning(null);
  }, [username, password]);

  return (
    <KeyboardAvoidingView style={styles.root}>
      <View style={{ flex: 0.4 }}/>
      <View style={{ justifyContent: 'center' }}>
        <Text style={styles.header}>GoNext</Text>
        <Text style={styles.subheader}>Realize your tasks in a better way</Text>
      </View>
      <View style={styles.inputsContainer}>
        <AuthTextInput
          label={'Username'}
          value={username}
          editable={!loading}
          onChangeText={setUsername}
        />
        <AuthTextInput
          label={'Password'}
          editable={!loading}
          value={password}
          onChangeText={setPassword}
          style={{ marginTop: 10 }}
          textContentType={'password'}
        />
        <Text style={{ color: 'red', fontWeight: 'bold', marginTop: 10 }}>
          {warning}
        </Text>
      </View>
      <View style={{ flex: 1 }}/>
      <View style={{ flex: 0 }}>
        <View style={[styles.loginButton, !filled && { opacity: 0.5 }]}>
          {loading ?
            <ActivityIndicator size="small" color={colors.background} style={{ justifyContent: 'center' }}/> :
            <Text style={styles.loginButtonLabel} onPress={handleLoginPress}>Log in</Text>
          }
        </View>
        <Text style={styles.registerButton} onPress={() => nav.navigate('Register')}>Create new account</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 20,
    marginTop: 50,
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  header: {
    fontSize: 38,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subheader: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.text,
    opacity: 0.8
  },
  inputsContainer: {
    marginTop: 40,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 10,
  },
  textInputContainer: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    borderRadius: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 17,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 4,
    height: 40,
  },
  loginButtonLabel: {
    color: colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButton: {
    padding: 20,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default LoginScreen;