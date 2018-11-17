import { types, flow, getParent, destroy } from 'mobx-state-tree';

import { UserAddressModel } from "../models/UserAddresses";
import { baseApi } from "../api/Api";

export const CurrentUserModel = types
  .model('CurrentUserModel', {
    _id: types.identifier,
    firstName: types.maybeNull(types.string),
    lastName: types.maybeNull(types.string),
    avatarUrl: types.maybeNull(types.string),
    addresses: types.optional(types.array(UserAddressModel), [] ),
  })
  .views(self => ({
    get addressesIsEmpty(){
      return self.addresses.length === 0;
    },
    get parent(){
      return getParent(self)
    },
  }))
  .actions(self => ({

    createAddress: flow(function*(data){
      try {
        const res = yield baseApi
        .url('/addresses')
        // .auth(`Bearer ${self.parent.authToken}`)
        .headers({ Authorization: `Bearer ${self.parent.authToken}` })
        .post({ data })
        .json()

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
        .auth(`Bearer ${self.parent.authToken}`)
        // .headers({ Authorization: `Bearer ${self.parent.authToken}` })
        .get()
        .json()

        if(Array.isArray(res.addresses)){      //check boolean Array
            return self.addresses = res.addresses
        }
      } catch (error) {
        throw error;
      }
    }),

    editAddress: flow(function*(data){
      try {
        
        const addresses = self.addresses.toJSON()
        addresses.forEach(el => {
          if( el._id === data._id ){
              return el.updateAddress(data)
          }
        })
        
      } catch (error) {
        throw error;
      }
    }),

  removeAddress(_id){
    const addresses = self.addresses.toJSON()
    addresses.forEach(el => {
      if( el._id === _id ){
          return el.deleteAddress(_id)
      }
    })
  },

}))
  