import { types, flow, getParent, applySnapshot } from 'mobx-state-tree';

import { UserAddressModel } from "../models/UserAddresses";
import { baseApi } from "../api/Api";

export const CurrentUserModel = types
  .model('CurrentUserModel', {
    _id: types.identifier,
    firstName: types.maybeNull(types.string),
    lastName: types.maybeNull(types.string),
    avatarUrl: types.maybeNull(types.string),
    addresses: types.optional(types.array(types.maybe(UserAddressModel)), [] ),
  })
  .views(self => ({
    get addressesIsEmpty(){
      return self.addresses.length === 0;
    },
    get authStore(){
      return getParent(self)
    },
  }))
  .actions(self => ({
    
    createAddress: flow(function*(data){
      try {
        const res = yield baseApi
        .url('/addresses')
        // .auth(`Bearer ${self.authStore.authToken}`)
        .headers({ Authorization: `Bearer ${self.authStore.authToken}` })
        .post({ data })
        .json()
        // console.log('res', res);

          if (res.address) {
            self.addresses.push(res.address);
          }
      } catch (error) {
        throw error;
      }
    }),

    getAddresses: flow(function*(){
      try {
        const res = yield baseApi
        .url('/addresses')
        .auth(`Bearer ${self.authStore.authToken}`)
        // .headers({ Authorization: `Bearer ${self.authStore.authToken}` })
        .get()
        .json()


        if(Array.isArray(res.addresses))      //check boolean Array
          {
            return self.addresses = res.addresses
          }
      } catch (error) {
        throw error;
      }
    }),
  }))