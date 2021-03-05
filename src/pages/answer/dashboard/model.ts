import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryAnswerDeleteById, queryAnswerGetStats, queryAnswerSearch } from '@/pages/answer/queries';
import { IAnswer, IAnswerStats } from '@/pages/answer/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  answerList?: IAnswer[];
  answerStats?: IAnswerStats;
  answerPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    answerSearch: Effect;
    answerGetStats: Effect;
    answerDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'AnswerDashboard',

  state: {},

  effects: {
    *answerSearch({ payload }, { call, put }) {
      const data = yield call(queryAnswerSearch, payload);
      yield put({
        type: 'save',
        payload: {
          answerList: get(data, 'payload.items'),
          answerPager: get(data, 'payload.pager'),
        },
      });
    },

    *answerGetStats(_, { call, put }) {
      const data = yield call(queryAnswerGetStats);
      yield put({
        type: 'save',
        payload: { answerStats: data.payload },
      });
    },

    *answerDeleteById({ payload }, { call, put }) {
      yield call(queryAnswerDeleteById, payload.answerId);
      yield put({ type: 'answerSearch', payload: payload.queryParams });
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
