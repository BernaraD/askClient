import { Effect, Reducer } from 'umi';

import { queryAnswerGetById } from '@/pages/answer/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    answerGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'AnswerView',

  state: {},

  effects: {
    *answerGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryAnswerGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *answerDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryAnswerDeleteById, payload.answerId);
    //   yield put({ type: 'answerSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
