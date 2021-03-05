import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import QuestionForm from '@/pages/question/form/QuestionForm';
import { IQuestion } from '@/pages/question/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (questionId: string) => void;
  reset: () => void;
  updateById: any;
  questionInfo: IQuestion;
  loadingEffects: ILoadingEffects;
  practiceSearch: () => void;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const QuestionFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const questionId: string = get(props, 'sidepanel.questionId', '');

  const isLoadingGet = get(props, 'loadingEffects.QuestionForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.QuestionForm/updateById', false);
  const practiceList = get(props, 'practiceList', []);

  useEffect(() => {
    props.practiceSearch();
    props.getById(questionId);
  }, []);

  const onFinish = (values: IQuestion) => {
    props.updateById({ values, questionId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <QuestionForm
      onFinish={onFinish}
      initialValues={props.questionInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
      practiceList={practiceList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  questionInfo: state.QuestionForm.questionInfo,
  loadingEffects: state.loading.effects,
  practiceList: state.QuestionForm.practiceList,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'QuestionForm/reset' }),
  updateById: (payload: IQuestion) => dispatch({ type: 'QuestionForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'QuestionForm/getById', payload }),
  practiceSearch: () => dispatch({ type: 'QuestionForm/practiceSearch' }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionFormEditWrapper));
