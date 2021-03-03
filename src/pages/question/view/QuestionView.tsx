import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  questionId: string;
  name: string;
  questionGetById: (id: string) => void;
}

const QuestionView = (props: IProps) => {
  const questionId = get(props, 'match.params.questionId');
  const name = get(props, 'QuestionView.name', '');

  console.log(props);

  useEffect(() => {
    props.questionGetById(questionId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  QuestionView: state.QuestionView,
});

const mapDispatchToProps = (dispatch: any) => ({
  questionGetById: (payload: string) => dispatch({ type: 'QuestionView/questionGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);
