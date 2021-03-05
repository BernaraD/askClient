import { Effect, history, Reducer } from 'umi';

import { queryQuestionCreate, queryQuestionGetById, queryQuestionUpdateById } from '@/pages/question/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryPracticeSearch } from '@/pages/practice/queries';
import { get } from 'lodash';

export interface IState {}

export interface QuestionModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    reset: Effect;
    practiceSearch: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const QuestionModel: QuestionModelType = {
  namespace: 'QuestionForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryQuestionCreate, payload);
      yield put({ type: 'QuestionDashboard/questionSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/question');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { questionInfo: {} } });
      const data = yield call(queryQuestionGetById, payload);
      yield put({ type: 'save', payload: { questionInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryQuestionUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'QuestionDashboard/questionSearch', payload: payload.queryParams });
    },

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

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default QuestionModel;
