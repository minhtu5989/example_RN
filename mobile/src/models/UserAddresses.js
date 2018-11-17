import { types, flow, getParent, applySnapshot } from 'mobx-state-tree'
import get from 'lodash.get';

import { baseApi } from "../api/Api";

export const UserAddressModel = types
.model('UserAddressModel', {
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
    get parent(){
        return getParent(self, 2)       
    },
}))
.actions(self => ({
    exam(){
        console.log('successful!!');
    },

    update(newData){
        console.log('newData', newData);
        applySnapshot(self, newData)
    },
    updateAddress: flow(function*(data){
        try {
            console.log('token',self.parent.authStore.authToken);
            
            const res = yield baseApi
                .url(`/addresses/${self._id}`)
                .auth(`Bearer ${self.parent.authStore.authToken}`) 
                .put({ data })
                .json();
    
            console.log('res', res);
            
            if(res.address)
                self.update(res.address)
    
        } catch (error) {
            throw error;
        }
    }),
}))