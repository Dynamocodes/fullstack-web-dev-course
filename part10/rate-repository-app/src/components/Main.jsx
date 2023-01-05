import { View, StyleSheet } from "react-native";
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import theme from "../theme";
import SignIn from "./SignIn"

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
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/sign-in" element={<SignIn />} exact/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;