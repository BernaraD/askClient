import React from 'react';
import { connect } from 'umi';
import AnswerForm from '@/pages/answer/form/AnswerForm';
import { IAnswer } from '@/pages/answer/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IAnswer) => void;
  loadingEffects: ILoadingEffects;
}

const AnswerFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IAnswer) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.AnswerForm/create', false);

  return <AnswerForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IAnswer) => dispatch({ type: 'AnswerForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerFormCreateWrapper);
