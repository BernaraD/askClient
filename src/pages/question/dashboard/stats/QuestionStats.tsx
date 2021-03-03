import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IQuestionStats } from '@/pages/question/types';

interface IProps {
  stats: IQuestionStats;
}

const QuestionStats = (props: IProps) => {
  const questionStats = get(props, 'stats', '');

  // if (isEmpty(questionStats)) return null;

  const totalCount = get(questionStats, 'totalCount', '...');
  const totalCountDouble = get(questionStats, 'totalCountDouble', '...');
  const totalCountTriple = get(questionStats, 'totalCountTriple', '...');
  const totalCountTen = get(questionStats, 'totalCountTen', '...');

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Statistic title="Total" value={totalCount} />
      </Col>

      <Col span={6}>
        <Statistic title="Trend" value={totalCountDouble} />
      </Col>

      <Col span={6}>
        <Statistic title="Users" value={totalCountTriple} />
      </Col>

      <Col span={6}>
        <Statistic title="Hits" value={totalCountTen} />
      </Col>
    </Row>
  );
};

export default QuestionStats;
