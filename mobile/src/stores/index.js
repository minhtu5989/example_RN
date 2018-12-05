import { AuthStore } from './Auth';
import { ProductsStore } from './Products';
import { ShoppingCartStore } from './ShoppingCart';
import { ProductModel } from '../models/Product';

const authStore = AuthStore.create();

const shoppingCartStore = ShoppingCartStore.create({ products: [] });

const productsStore = ProductsStore.create({
  data: [
    ProductModel.create({
      id: '1vv',
      name: 'Táo',
      imageUrl: require('../../assets/img/products/apple.png'),
      kgPrice: 10.12,
      unityPrice: 1.9,
    }),
    ProductModel.create({
      id: '2cc',
      name: 'Cà chua',
      imageUrl: require('../../assets/img/products/tomato.png'),
      kgPrice: 9.51,
      unityPrice: 1.25,
    }),
    ProductModel.create({
      id: '12vv',
      name: 'Đào',
      imageUrl: require('../../assets/img/products/apple.png'),
      kgPrice: 10.5,
      unityPrice: 2.5,
    }),
    ProductModel.create({
      id: '3ads',
      name: 'Đu đủ',
      imageUrl: require('../../assets/img/products/tomato.png'),
      kgPrice: 12.4,
      unityPrice: 2.5,
    }),
  ],
});


export const store = {
  authStore,
  shoppingCartStore,
  productsStore,
};

window.MobxStore = store;
