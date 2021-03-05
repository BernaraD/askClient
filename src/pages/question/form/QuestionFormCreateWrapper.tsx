import React, { useEffect } from 'react';
import { connect } from 'umi';
import QuestionForm from '@/pages/question/form/QuestionForm';
import { IQuestion } from '@/pages/question/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IQuestion) => void;
  loadingEffects: ILoadingEffects;
  practiceSearch: () => void;
}

const QuestionFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IQuestion) => {
    props.create(values);
  };

  useEffect(() => {
    props.practiceSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.QuestionForm/create', false);
  const practiceList = get(props, 'practiceList', []);

  return (
    <QuestionForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} practiceList={practiceList} />
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  practiceList: state.QuestionForm.practiceList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IQuestion) => dispatch({ type: 'QuestionForm/create', payload }),
  practiceSearch: () => dispatch({ type: 'QuestionForm/practiceSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionFormCreateWrapper);
