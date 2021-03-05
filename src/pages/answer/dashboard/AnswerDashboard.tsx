import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import AnswerStats from '@/pages/answer/dashboard/stats/AnswerStats';
import AnswerFilterForm from '@/pages/answer/dashboard/search/AnswerFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IAnswerQueryParams } from '@/pages/answer/types';
import AnswerSearchList from '@/pages/answer/dashboard/search/AnswerSearchList';
import AnswerDashboardControls from '@/pages/answer/dashboard/controls/AnswerDashboardControls';
import { IState } from '@/pages/answer/dashboard/model';

const initialSearchForm = {
  answerSearchParam1: '',
  answerSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  answerGetStats: () => void;
  answerSearch: (arg: IAnswerQueryParams) => void;
  answerReset: () => void;
  AnswerDashboard: IState;
}

const AnswerDashboard = (props: IProps) => {
  const answerStats = get(props, 'AnswerDashboard.answerStats', {});
  const answerList = get(props, 'AnswerDashboard.answerList', []);
  const answerPager = get(props, 'AnswerDashboard.answerPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.answerGetStats();

    return () => {
      props.answerReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.answerSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IAnswerQueryParams) => {
    // обнулять pager при каждом новом поиске
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
    history.push({ query });
  };

  return (
    <>
      <div className="d-flex align-items-end justify-content-between mt-3 mb-2">
        <div>
          <div className="h4 mr-4">Answer dashboard</div>
          <AnswerFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <AnswerStats stats={answerStats} />

        <div>
          <AnswerDashboardControls />
        </div>
      </div>

      <AnswerSearchList items={answerList} />
      <Pager pager={answerPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  AnswerDashboard: state.AnswerDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  answerSearch: (payload: IAnswerQueryParams) => dispatch({ type: 'AnswerDashboard/answerSearch', payload }),
  answerGetStats: () => dispatch({ type: 'AnswerDashboard/answerGetStats' }),
  answerReset: () => dispatch({ type: 'AnswerDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerDashboard);
