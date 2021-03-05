import { Effect, Reducer } from 'umi';

import { queryPracticeGetById } from '@/pages/practice/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    practiceGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'PracticeView',

  state: {},

  effects: {
    *practiceGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryPracticeGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *practiceDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryPracticeDeleteById, payload.practiceId);
    //   yield put({ type: 'practiceSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
