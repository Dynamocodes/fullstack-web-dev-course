import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Text from './Text';

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
    borderStyle:'solid',
    borderColor: theme.colors.textSecondary,
    borderWidth:1,
    margin: 5,
    borderRadius:5,
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

const signIn = (username, password) => {
  return `${username} and ${password} are correct credentials, signed in!`
};

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

const SignInPage = () => {
  const onSubmit = values => {
    const username = values.username
    const password = values.password

    if (username && password ) {
      console.log(`sign in status: ${signIn(username, password)}`);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignInPage;