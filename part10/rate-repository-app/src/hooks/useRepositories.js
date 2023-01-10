import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const allRepositories = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
  })

  const repositories = allRepositories.loading ? undefined : allRepositories.data.repositories
  const loading = allRepositories.loading;
   

  return { repositories, loading };
};

export default useRepositories;