import { types, flow, getParent } from 'mobx-state-tree';
import get from 'lodash.get';

import { UserAddressModel } from "../models/UserAddresses";
import { baseApi } from "../api/Api";

export const CurrentUserModel = types
  .model('CurrentUserModel', {
    _id: types.identifier,
    firstName: types.string,
    lastName: types.string,
    avatarUrl: types.maybe(types.string),
    addresses: types.optional(types.array(UserAddressModel), [] )
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
    createAddress: flow(function*(data){
      try {
        const res = yield baseApi
        .url('/addresses')
        // .auth(`Bearer ${self.authStore.authToken}`)
        .headers({ Authorization: `Bearer ${self.authStore.authToken}` })
        .post({data})
        .json()
        // console.log('res', res);

        // if(typeof res.address === 'object')   // xác định res.address tồn tại
        // {
        //   const address = UserAddressModel.create({
        //     ...res.address,
        //     geo:{
        //       lng: get(res.address, ['geo', 'coords', 0], 'không tồn tại'),
        //       lat: get(res.address, ['geo', 'coords', 1], 'không tồn tại')
        //       /* 
        //         get của lodash.get 
        //         -- phần tử 1 : object cần tìm giá trị
        //         -- phần tử 2 : nếu tồn tạị 'geo', 'coords', 0 thì sẽ trả về value : res.address.geo.coords[0]
        //         --phần tử 3 : nếu ko tồn tại sẽ trả về value 
        //         (34 minute - part 18)
        //       */
        //     }
        //   })

          if (res.address) {
            self.addresses.push(res.address);
          }
      } catch (error) {
        throw error;
      }
    })
  }))