import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryPracticeDeleteById, queryPracticeGetStats, queryPracticeSearch } from '@/pages/practice/queries';
import { IPractice, IPracticeStats } from '@/pages/practice/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  practiceList?: IPractice[];
  practiceStats?: IPracticeStats;
  practicePager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    practiceSearch: Effect;
    practiceGetStats: Effect;
    practiceDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'PracticeDashboard',

  state: {},

  effects: {
    *practiceSearch({ payload }, { call, put }) {
      const data = yield call(queryPracticeSearch, payload);
      yield put({
        type: 'save',
        payload: {
          practiceList: get(data, 'payload.items'),
          practicePager: get(data, 'payload.pager'),
        },
      });
    },

    *practiceGetStats(_, { call, put }) {
      const data = yield call(queryPracticeGetStats);
      yield put({
        type: 'save',
        payload: { practiceStats: data.payload },
      });
    },

    *practiceDeleteById({ payload }, { call, put }) {
      yield call(queryPracticeDeleteById, payload.practiceId);
      yield put({ type: 'practiceSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
