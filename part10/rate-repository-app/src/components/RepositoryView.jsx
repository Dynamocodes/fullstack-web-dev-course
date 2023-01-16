import RepositoryItem from "./RepositoryItem";
import { View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_BY_ID } from '../graphql/queries'
import { useParams } from "react-router-native";

const RepositoryView = () => {
  const { id } = useParams();
  const variables = { repositoryId: id};
  const resultRepository = useQuery(GET_REPOSITORY_BY_ID, {variables: variables})
  const item = resultRepository.loading ? {} : resultRepository.data.repository

  
  return (<View>
      <RepositoryItem item={item}/>
      <button>See in Github</button>

  </View>)
}

export default RepositoryView;