import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import PracticeStats from '@/pages/practice/dashboard/stats/PracticeStats';
import PracticeFilterForm from '@/pages/practice/dashboard/search/PracticeFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IPracticeQueryParams } from '@/pages/practice/types';
import PracticeSearchList from '@/pages/practice/dashboard/search/PracticeSearchList';
import PracticeDashboardControls from '@/pages/practice/dashboard/controls/PracticeDashboardControls';
import { IState } from '@/pages/practice/dashboard/model';

const initialSearchForm = {
  practiceSearchParam1: '',
  practiceSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  practiceGetStats: () => void;
  practiceSearch: (arg: IPracticeQueryParams) => void;
  practiceReset: () => void;
  PracticeDashboard: IState;
}

const PracticeDashboard = (props: IProps) => {
  const practiceStats = get(props, 'PracticeDashboard.practiceStats', {});
  const practiceList = get(props, 'PracticeDashboard.practiceList', []);
  const practicePager = get(props, 'PracticeDashboard.practicePager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.practiceGetStats();

    return () => {
      props.practiceReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.practiceSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IPracticeQueryParams) => {
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
          <div className="h4 mr-4">Practice dashboard</div>
          <PracticeFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <PracticeStats stats={practiceStats} />

        <div>
          <PracticeDashboardControls />
        </div>
      </div>

      <PracticeSearchList items={practiceList} />
      <Pager pager={practicePager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  PracticeDashboard: state.PracticeDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  practiceSearch: (payload: IPracticeQueryParams) => dispatch({ type: 'PracticeDashboard/practiceSearch', payload }),
  practiceGetStats: () => dispatch({ type: 'PracticeDashboard/practiceGetStats' }),
  practiceReset: () => dispatch({ type: 'PracticeDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PracticeDashboard);
