import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import { View, StyleSheet } from "react-native";
import theme from "../theme";

const Main = () => {
  const styles = StyleSheet.create({
    container:{
      backgroundColor: theme.backgroundColors.backgroundSecondary,
      paddingBottom: 5,
      flexGrow: 1,
    },
  });

  return (
    <View style={styles.container}>
      <AppBar/>
      <RepositoryList/>
    </View>
    
  );
};

export default Main;