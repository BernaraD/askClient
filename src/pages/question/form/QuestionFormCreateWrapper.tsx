import React from 'react';
import { connect } from 'umi';
import QuestionForm from '@/pages/question/form/QuestionForm';
import { IQuestion } from '@/pages/question/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IQuestion) => void;
  loadingEffects: ILoadingEffects;
}

const QuestionFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IQuestion) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.QuestionForm/create', false);

  return <QuestionForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IQuestion) => dispatch({ type: 'QuestionForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionFormCreateWrapper);
