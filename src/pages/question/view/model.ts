import { Effect, Reducer } from 'umi';

import { queryQuestionGetById } from '@/pages/question/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    questionGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'QuestionView',

  state: {},

  effects: {
    *questionGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryQuestionGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *questionDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryQuestionDeleteById, payload.questionId);
    //   yield put({ type: 'questionSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
