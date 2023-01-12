import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from "react-router-native";
import { useQuery, useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { ME } from '../graphql/queries'
import useAuthStorage from '../hooks/useAuthStorage';

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

const SignInTab = () => {
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const resultMe = useQuery(ME);


  const handleLogout = () => {
    authStorage.removeAccessToken()
    apolloClient.resetStore();
    navigate('/sign-in');
  }

  const me = resultMe.loading ? undefined : resultMe.data.me

  if(me && me.username ){
    return(
      <Pressable onPress={handleLogout}>
        <Text
        fontSize="subheading" 
        fontWeight="bold" 
        color="highContrast"
        style={styles.tab}>
          Logout
        </Text>
      </Pressable>
    )
  }else{
    return(
      <AppBarTab title="Sign In" path="/sign-in"/>
    )
  }
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title="Repository" path="/"/>
        <SignInTab/>
      </ScrollView>
    </View>
  );
};

export default AppBar;