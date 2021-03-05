import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import AnswerForm from '@/pages/answer/form/AnswerForm';
import { IAnswer } from '@/pages/answer/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (answerId: string) => void;
  reset: () => void;
  updateById: any;
  answerInfo: IAnswer;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AnswerFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const answerId: string = get(props, 'sidepanel.answerId', '');

  const isLoadingGet = get(props, 'loadingEffects.AnswerForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.AnswerForm/updateById', false);

  useEffect(() => {
    props.getById(answerId);
  }, []);

  const onFinish = (values: IAnswer) => {
    props.updateById({ values, answerId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <AnswerForm
      onFinish={onFinish}
      initialValues={props.answerInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  answerInfo: state.AnswerForm.answerInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'AnswerForm/reset' }),
  updateById: (payload: IAnswer) => dispatch({ type: 'AnswerForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'AnswerForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnswerFormEditWrapper));
