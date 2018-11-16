import { types, flow, getParent } from 'mobx-state-tree';

import { UserAddressModel } from "../models/UserAddresses";
import { baseApi } from "../api/Api";

export const CurrentUserModel = types
  .model('CurrentUserModel', {
    _id: types.identifier,
    firstName: types.string,
    lastName: types.string,
    avatarUrl: types.maybe(types.string),
    addresses: types.optional(types.array(UserAddressModel), [] ),
  })
  .views(self => ({
    get addressesIsEmpty(){
      return self.addresses.length === 0;
    },
    get authStore(){
      return getParent(self)
    }
  }))
  .actions(self => ({
    update(newData){
      console.log('newData', newData);
      applySnapshot(self, newData)
      // so sánh address cũ (self) và res.address (newData) và lưu khác nhau
  },
  /*
      updateAddress không nằm chung với createAddress ở CurrentAddress 
      vì xuống nhánh cây dưới sẽ lấy đc _id để gửi về Server
      còn createAddress thì khởi tạo _id nên ko CẦN phải xuống nhánh cây dưới
  */
  updateAddress: flow(function*(data){
      try {
          const res = yield baseApi
              .url(`/addresses/${data._id}`)
              .auth(`Bearer ${self.authStore.authToken}`) 
              /*
                  Mobx-state-tree là kiểu cây nên phải đi từ dưới lên
                  getParent của UserAddressesModel là phẩn tử addresses[] trong CurrentUserModel 
                  và getParent của CurrentUserModel là phần tử info trong AuthStore
                  cho nên self phải đi qua CurrentUserModel rồi qua AuthStore mới lấy đc authToken
              */ 
              .put(data)
              .json();
  
          console.log('res', res);
          
          if(res.address)
              self.update(res.address)
  
      } catch (error) {
          throw error;
      }
  }),






    createAddress: flow(function*(data){
      try {
        const res = yield baseApi
        .url('/addresses')
        // .auth(`Bearer ${self.authStore.authToken}`)
        .headers({ Authorization: `Bearer ${self.authStore.authToken}` })
        .post({data})
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
            self.addresses = res.addresses
          }
      } catch (error) {
        throw error;
      }
    }),
  }))