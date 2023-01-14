import { View, Image, StyleSheet} from 'react-native'
import Text from './Text'
import theme from '../theme';

const RepositoryItem = ({item}) => {

  const styles = StyleSheet.create({
    topContainer:{
      flexDirection: 'row',
    },
    topLeftContainer:{
      padding: 5,
    },
    topRightContainer:{
      padding: 5,
      flexShrink: 1,
    },
    bottomContainer:{
      display: 'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      padding: 5,
    },
    bottomSubContainer:{
      display:'flex',
      flexDirection: 'column',
      alignSelf:'flex-start',
      alignItems: 'center',
    },
    tag:{
      backgroundColor: theme.colors.primary,
      padding:10,
      flexGrow:0,
      borderRadius:5,
      alignSelf:'flex-start',
    },
    mainContainer: {
      padding: 5,
      marginBottom:6,
      backgroundColor: theme.backgroundColors.backgroundPrimary,
    },
    tinyLogo: {
      width: 50,
      height: 50, 
      borderRadius:7,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

  const formatAmount = (num) => {
    if(num >= 1000){
      return `${Math.round((num/1000) * 10)/10}k`
    }
    return num
  }

  return (
    <View testID="repositoryItem" style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={styles.topLeftContainer}>
          <Image
          source={{
            uri:`${item.ownerAvatarUrl}`
          }}
          style={styles.tinyLogo}/>
        </View>
        <View style={styles.topRightContainer}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.tag}>
            <Text color="highContrast" >{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomSubContainer}>
          <Text fontWeight='bold'>{formatAmount(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.bottomSubContainer}>
          <Text fontWeight='bold'>{formatAmount(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.bottomSubContainer}>
          <Text fontWeight='bold'>{item.reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.bottomSubContainer}>
        <Text fontWeight='bold'>{item.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem