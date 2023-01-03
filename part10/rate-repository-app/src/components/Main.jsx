import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import { View } from "react-native";

const Main = () => {
  return (
    <View>
      <AppBar/>
      <RepositoryList/>
    </View>
    
  );
};

export default Main;