import React from 'react';
import { connect } from 'umi';
import PracticeForm from '@/pages/practice/form/PracticeForm';
import { IPractice } from '@/pages/practice/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IPractice) => void;
  loadingEffects: ILoadingEffects;
}

const PracticeFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IPractice) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.PracticeForm/create', false);

  return <PracticeForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IPractice) => dispatch({ type: 'PracticeForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PracticeFormCreateWrapper);
