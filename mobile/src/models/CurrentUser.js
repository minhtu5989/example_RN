import { types, flow } from 'mobx-state-tree';
import { AsyncStorage } from 'react-native';

import { customersApi } from "../api/Api";

const TOKEN_KEY = '@DanielLuong/token'

const UserInfo = types.model('UserInfo', {
  _id: types.identifier,
  firstName: types.string,
  lastName: types.string,
  avatarUrl: types.maybe(types.string),
});

export const CurrentUser = types
.model(`CurrentUser`, {
  authToken: types.maybe(types.string),
  info: types.maybe(UserInfo)
})
.actions(self => ({

  setupAuth: flow(function*(){
      yield self.getAuthToken()
      yield self.getUserInfo()
  }),

  getAuthToken: flow(function*(){
    try {
      const token = yield AsyncStorage.getItem(TOKEN_KEY)
      console.log('get AuthToken !!');

      if(token){
        self.authToken = token
      }
      else{
        NavigationService.navigate('Auth')
      }
    } catch (error) {
      console.log('error', error);
    }
  }),

  getUserInfo: flow(function*(){
    try {
      if(self.authToken){
        const res = yield customersApi
        .url('/me')
        .headers({ Authorization: `Bearer ${self.authToken}` })
        .get()
        .json();

        self.info = res;
        NavigationService.navigate('Main')
      } 
    } catch (error) {
      console.log('error', error);
    }
  }),

  saveToken: flow(function*(token){
    try {
      console.log('Save Token !!  ');
      
      yield AsyncStorage.setItem(TOKEN_KEY, token)
      
    } catch (error) {
      console.log('error', error);
    }
  }),

  login: flow(function*(providerToken, provider){
    try {
      const res = yield customersApi
      .post({
        token: providerToken,
        provider 
      })
      .json()

      if(res.token){
        self.authToken = res.token;
        yield self.saveToken(res.token)
        yield self.getUserInfo()
      }
    } catch (error) {
      console.log('error', error);
    }
  }),
  
}))



