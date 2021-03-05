import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  practiceId: string;
  name: string;
  practiceGetById: (id: string) => void;
}

const PracticeView = (props: IProps) => {
  const practiceId = get(props, 'match.params.practiceId');
  const name = get(props, 'PracticeView.name', '');

  console.log(props);

  useEffect(() => {
    props.practiceGetById(practiceId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  PracticeView: state.PracticeView,
});

const mapDispatchToProps = (dispatch: any) => ({
  practiceGetById: (payload: string) => dispatch({ type: 'PracticeView/practiceGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PracticeView);
