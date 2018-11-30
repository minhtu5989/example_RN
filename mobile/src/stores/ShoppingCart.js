import { types } from 'mobx-state-tree';

import { ProductModel } from '../models/Product';

export const ShoppingCartStore = types
  .model('ShoppinCartStore', {
    products: types.array( types.maybeNull(ProductModel))
  })
  .views(self => ({
    get totalProducts() {
      return self.products.length;
    },
    get totalAmount() {
      return self.products
        .reduce((acc, current) => acc + parseFloat(current.totalPrice), 0)
        .toFixed(2);
    },
    get productsList() {
      return self.products.slice();
    },
  }))
  .actions(self => ({
    addProduct(product) {
      
      const check = self.products.find(el => el.id === product.id);
      
      if (!check) {
        self.products.push(product);
      }
    },
    removeProduct(product) {
      self.products = self.products.filter(el => el.id !== product.id);
    },

  }));
