import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import QuestionStats from '@/pages/question/dashboard/stats/QuestionStats';
import QuestionFilterForm from '@/pages/question/dashboard/search/QuestionFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IQuestionQueryParams } from '@/pages/question/types';
import QuestionSearchList from '@/pages/question/dashboard/search/QuestionSearchList';
import QuestionDashboardControls from '@/pages/question/dashboard/controls/QuestionDashboardControls';
import { IState } from '@/pages/question/dashboard/model';

const initialSearchForm = {
  questionSearchParam1: '',
  questionSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  questionGetStats: () => void;
  questionSearch: (arg: IQuestionQueryParams) => void;
  questionReset: () => void;
  QuestionDashboard: IState;
}

const QuestionDashboard = (props: IProps) => {
  const questionStats = get(props, 'QuestionDashboard.questionStats', {});
  const questionList = get(props, 'QuestionDashboard.questionList', []);
  const questionPager = get(props, 'QuestionDashboard.questionPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.questionGetStats();

    return () => {
      props.questionReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.questionSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IQuestionQueryParams) => {
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
          <div className="h4 mr-4">Question dashboard</div>
          <QuestionFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <QuestionStats stats={questionStats} />

        <div>
          <QuestionDashboardControls />
        </div>
      </div>

      <QuestionSearchList items={questionList} />
      <Pager pager={questionPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  QuestionDashboard: state.QuestionDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  questionSearch: (payload: IQuestionQueryParams) => dispatch({ type: 'QuestionDashboard/questionSearch', payload }),
  questionGetStats: () => dispatch({ type: 'QuestionDashboard/questionGetStats' }),
  questionReset: () => dispatch({ type: 'QuestionDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDashboard);
