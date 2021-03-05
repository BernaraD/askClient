import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import PracticeForm from '@/pages/practice/form/PracticeForm';
import { IPractice } from '@/pages/practice/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (practiceId: string) => void;
  reset: () => void;
  updateById: any;
  practiceInfo: IPractice;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PracticeFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const practiceId: string = get(props, 'sidepanel.practiceId', '');

  const isLoadingGet = get(props, 'loadingEffects.PracticeForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.PracticeForm/updateById', false);

  useEffect(() => {
    props.getById(practiceId);
  }, []);

  const onFinish = (values: IPractice) => {
    props.updateById({ values, practiceId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <PracticeForm
      onFinish={onFinish}
      initialValues={props.practiceInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  practiceInfo: state.PracticeForm.practiceInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'PracticeForm/reset' }),
  updateById: (payload: IPractice) => dispatch({ type: 'PracticeForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'PracticeForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PracticeFormEditWrapper));
