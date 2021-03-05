import { Effect, history, Reducer } from 'umi';

import { queryPracticeCreate, queryPracticeGetById, queryPracticeUpdateById } from '@/pages/practice/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface PracticeModelType {
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

const PracticeModel: PracticeModelType = {
  namespace: 'PracticeForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryPracticeCreate, payload);
      yield put({ type: 'PracticeDashboard/practiceSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/practice');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { practiceInfo: {} } });
      const data = yield call(queryPracticeGetById, payload);
      yield put({ type: 'save', payload: { practiceInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryPracticeUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'PracticeDashboard/practiceSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default PracticeModel;
