import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Text from './Text';
import useSignIn from '../hooks/useSignIn'

import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'column',
    alignItems:'stretch',
    padding:5,
    
  },
  flexItems:{
    padding:15,
    margin: 5,
    
  },
  button:{
    backgroundColor: theme.colors.primary,
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding:15,
    margin:5,
    borderRadius:5,
    color: theme.colors.highContrast
  },

})

const SignInForm = ({ onSubmit }) => {
    return (
      <View style={styles.container}>
        <FormikTextInput style={styles.flexItems} name="username" placeholder="Username" />
        <FormikTextInput secureTextEntry style={styles.flexItems} name="password" placeholder="Password" />
        <Pressable style={styles.button} onPress={onSubmit}>
          <Text color='highContrast' fontWeight='bold'>Sign In</Text>
        </Pressable>
      </View>
    );
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('username is required'),
    password: yup
      .string()
      .required('password is required'),
  });
  
const SignInPage = () => {
  const [signIn] = useSignIn();

  const onSubmit = async values => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignInPage;