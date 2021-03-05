import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const AnswerDashboardControls = (props: IProps) => {
  const answerCreate = () => {
    props.open({
      title: 'Create new Answer',
      component: 'AnswerFormCreate',
      place: 'AnswerDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={answerCreate}>
      Create Answer
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(AnswerDashboardControls);
