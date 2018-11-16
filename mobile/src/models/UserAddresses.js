import { types, flow, getParent, applySnapshot } from 'mobx-state-tree'
import get from 'lodash.get';

import { baseApi } from "../api/Api";

export const UserAddressModel = types
.model({
    _id: types.identifier,
    street: types.string,
    town: types.string,
    city: types.string,
    province: types.string,
    // country: types.string,
    instructions: types.maybeNull(types.string),
    geo: types.model({
        lng: types.maybeNull(types.number),
        lat: types.maybeNull(types.number),
    }),
})
.postProcessSnapshot(snap => ({
    ...snap,
    geo:{
        lng: get(snap, ['geo', 'coords', 0], 'No exist'),
        lat: get(snap, ['geo', 'coords', 1], 'No exist')
    }
}))
.views(self => ({
    get user(){
        return getParent(self, 2)       
        // value 1 trả về Array của User (model), value 2 trả về 1 phần tử (model) trong Array
    }
}))
.actions(self => ({
    /*
        updateAddress không nằm chung với createAddress ở CurrentAddress 
        vì xuống nhánh cây dưới sẽ lấy đc _id để gửi về Server
        còn createAddress thì khởi tạo _id nên ko CẦN phải xuống nhánh cây dưới
    */
    updateAddress: flow(function*(data){
        try {
            const res = yield baseApi
                .url(`/addresses/${self._id}`)
                .auth(`Bearer ${self.user.authStore.authToken}`) 
                /*
                    Mobx-state-tree là kiểu cây nên phải đi từ dưới lên
                    getParent của UserAddressesModel là phẩn tử addresses[] trong CurrentUserModel 
                    và getParent của CurrentUserModel là phần tử info trong AuthStore
                    cho nên self phải đi qua CurrentUserModel rồi qua AuthStore mới lấy đc authToken
                */ 
                .put(data)
                .json();
            if(res.address)
                self.update(res.address)

        } catch (error) {
            throw error;
        }
    }),
    update(newData){
        console.log('newData', newData);
        applySnapshot(self, newData)
        // so sánh address cũ (self) và res.address (newData) và lưu khác nhau
    }
}))
