import { types } from 'mobx-state-tree'
import get from 'lodash.get';

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

