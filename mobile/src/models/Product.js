import { types } from 'mobx-state-tree';

export const ProductModel = types.model('ProductModel', {
  _id: types.identifier,
  name: types.string,
  imageUrl: types.number,
  unityPrice: types.number,
  kgPrice: types.number,
  cartQty: 0,
  inCart: false,
});