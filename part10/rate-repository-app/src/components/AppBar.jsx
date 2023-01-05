import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColors.dark,
    display: 'flex',
    flexDirection: 'row',
  },
  tab:{
    padding:20,
  }
  // ...
});

const AppBarTab = ({title, path}) => {
  return(
    <Link to={path}>
      <Text 
      fontSize="subheading" 
      fontWeight="bold" 
      color="highContrast"
      style={styles.tab}>
        {title}
      </Text>
    </Link>
  )
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title="Repository" path="/"/>
        <AppBarTab title="Sign In" path="/sign-in"/>
      </ScrollView>
    </View>
  );
};

export default AppBar;