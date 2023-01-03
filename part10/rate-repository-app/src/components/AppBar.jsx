import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColors.dark
  },
  tab:{
    padding:20,
  }
  // ...
});

const AppBarTab = ({title}) => {
  return(
    <Pressable onPress={()=>console.log(`${title} pressed.`)}>
      <Text 
      fontSize="subheading" 
      fontWeight="bold" 
      color="highContrast"
      style={styles.tab}>
        {title}
      </Text>
    </Pressable>
  )
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab title="Repository"/>
    </View>
  );
};

export default AppBar;