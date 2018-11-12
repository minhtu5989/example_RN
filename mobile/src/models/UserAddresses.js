import { types } from 'mobx-state-tree'

export const UserAddressModel = types
.model({
    _id: types.identifier,
    street: types.string,
    town: types.string,
    city: types.string,
    province: types.string,
    country: types.string,
    instructions: types.maybeNull(types.string),
    geo: types.model({
        lng: types.maybeNull(types.number),
        lat: types.maybeNull(types.number),
    }),
})