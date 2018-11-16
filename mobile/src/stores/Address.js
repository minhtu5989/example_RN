import { types } from 'mobx-state-tree';
import { UserAddressModel } from '../models/UserAddresses';

export const Address = types
  .model('Address', {
    info: types.maybe(UserAddressModel),
    })


//   .views(self => ({
//     get user(){
//         return getParent(self, 2)       
//         // value 1 trả về Array của User (model), value 2 trả về 1 phần tử (model) trong Array
//     },
//   }))
//   .actions(self => ({
//     update(newData){
//         console.log('newData', newData);
//         applySnapshot(self, newData)
//         // so sánh address cũ (self) và res.address (newData) và lưu khác nhau
//     },
//     /*
//         updateAddress không nằm chung với createAddress ở CurrentAddress 
//         vì xuống nhánh cây dưới sẽ lấy đc _id để gửi về Server
//         còn createAddress thì khởi tạo _id nên ko CẦN phải xuống nhánh cây dưới
//     */
//     updateAddress: flow(function*(data){
//         try {
//             const res = yield baseApi
//                 .url(`/addresses/${self._id}`)
//                 .auth(`Bearer ${self.user.authStore.authToken}`) 
//                 /*
//                     Mobx-state-tree là kiểu cây nên phải đi từ dưới lên
//                     getParent của UserAddressesModel là phẩn tử addresses[] trong CurrentUserModel 
//                     và getParent của CurrentUserModel là phần tử info trong AuthStore
//                     cho nên self phải đi qua CurrentUserModel rồi qua AuthStore mới lấy đc authToken
//                 */ 
//                 .put(data)
//                 .json();

//             console.log('res', res);
            
//             if(res.address)
//                 self.update(res.address)

//         } catch (error) {
//             throw error;
//         }
//     }),
//   }));
