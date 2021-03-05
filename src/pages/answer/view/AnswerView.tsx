import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  answerId: string;
  name: string;
  answerGetById: (id: string) => void;
}

const AnswerView = (props: IProps) => {
  const answerId = get(props, 'match.params.answerId');
  const name = get(props, 'AnswerView.name', '');

  console.log(props);

  useEffect(() => {
    props.answerGetById(answerId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  AnswerView: state.AnswerView,
});

const mapDispatchToProps = (dispatch: any) => ({
  answerGetById: (payload: string) => dispatch({ type: 'AnswerView/answerGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerView);
