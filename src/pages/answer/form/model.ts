import { Effect, history, Reducer } from 'umi';

import { queryAnswerCreate, queryAnswerGetById, queryAnswerUpdateById } from '@/pages/answer/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface AnswerModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const AnswerModel: AnswerModelType = {
  namespace: 'AnswerForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryAnswerCreate, payload);
      yield put({ type: 'AnswerDashboard/answerSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/answer');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { answerInfo: {} } });
      const data = yield call(queryAnswerGetById, payload);
      yield put({ type: 'save', payload: { answerInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryAnswerUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'AnswerDashboard/answerSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default AnswerModel;
