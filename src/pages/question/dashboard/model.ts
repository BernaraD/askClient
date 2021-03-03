import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryQuestionDeleteById, queryQuestionGetStats, queryQuestionSearch } from '@/pages/question/queries';
import { IQuestion, IQuestionStats } from '@/pages/question/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  questionList?: IQuestion[];
  questionStats?: IQuestionStats;
  questionPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    questionSearch: Effect;
    questionGetStats: Effect;
    questionDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'QuestionDashboard',

  state: {},

  effects: {
    *questionSearch({ payload }, { call, put }) {
      const data = yield call(queryQuestionSearch, payload);
      yield put({
        type: 'save',
        payload: {
          questionList: get(data, 'payload.items'),
          questionPager: get(data, 'payload.pager'),
        },
      });
    },

    *questionGetStats(_, { call, put }) {
      const data = yield call(queryQuestionGetStats);
      yield put({
        type: 'save',
        payload: { questionStats: data.payload },
      });
    },

    *questionDeleteById({ payload }, { call, put }) {
      yield call(queryQuestionDeleteById, payload.questionId);
      yield put({ type: 'questionSearch', payload: payload.queryParams });
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
