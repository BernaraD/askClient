import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const PracticeDashboardControls = (props: IProps) => {
  const practiceCreate = () => {
    props.open({
      title: 'Create new Practice',
      component: 'PracticeFormCreate',
      place: 'PracticeDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={practiceCreate}>
      Create Practice
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(PracticeDashboardControls);
