import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
      validField:{
      borderStyle:'solid',
      borderColor: theme.colors.textSecondary,
      borderWidth:1,
      borderRadius:5,
      },
      errorField:{
      borderStyle:'solid',
      borderColor: theme.colors.textError,
      borderWidth:1,
      borderRadius:5,
      }
  });

const TextInput = ({ style, error, ...props }) => {


  const textInputStyle = [
    style,
    error && styles.errorField,
		!error && styles.validField,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;