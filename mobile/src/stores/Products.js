import { types } from 'mobx-state-tree';

import { ProductModel } from '../models/Product';

export const ProductsStore = types
  .model('ProductsStore', {
    data: types.array(types.reference(types.late(() => ProductModel)))
    // data: types.array(ProductModel),
  });

