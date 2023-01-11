import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken () {
    const auth = await AsyncStorage.getItem(
        `${this.namespace}:auth`,
      );
  
      return auth ? JSON.parse(auth) : undefined
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
        `${this.namespace}:auth`,
        JSON.stringify(accessToken),
      );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:auth`);
  }
}

export default AuthStorage;
