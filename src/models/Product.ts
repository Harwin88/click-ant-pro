import { Effect, Reducer } from 'umi';

import { getAllProdu, queryProduct as queryProducts } from '@/services/Productos';

export interface CurrentProduct {
  NameProduct?: string;
  Stop?: string;
  Descrition?: string;
  Presio?: string;
  Images?: {
    Images: string;
    State: string;
  }[];
  IdEmpresa?: string;
  IdCategoria?: string;  
}

export interface ProductModelState {
  CurrentProduct?: CurrentProduct;
}

export interface ProductModelType {
  namespace: 'product';
  state: ProductModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentProduct: Reducer<ProductModelState>;
    changeNotifyCount: Reducer<ProductModelState>;
  };
}

const ProductModel: ProductModelType = {
  namespace: 'product',

  state: {
    CurrentProduct: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryProducts);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getAllProdu);
      yield put({
        type: 'saveCurrentProduct',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentProduct(state, action) {
      return {
        ...state,
        CurrentProduct: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        CurrentProduct: {},
      },
      action,
    ) {
      return {
        ...state,
        CurrentProduct: {
          ...state.CurrentProduct,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default ProductModel;
