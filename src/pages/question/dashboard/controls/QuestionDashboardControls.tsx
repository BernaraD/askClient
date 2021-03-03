import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const QuestionDashboardControls = (props: IProps) => {
  const questionCreate = () => {
    props.open({
      title: 'Create new Question',
      component: 'QuestionFormCreate',
      place: 'QuestionDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={questionCreate}>
      Create Question
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(QuestionDashboardControls);
