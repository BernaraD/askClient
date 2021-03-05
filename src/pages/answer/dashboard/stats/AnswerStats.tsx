import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IAnswerStats } from '@/pages/answer/types';

interface IProps {
  stats: IAnswerStats;
}

const AnswerStats = (props: IProps) => {
  const answerStats = get(props, 'stats', '');

  // if (isEmpty(answerStats)) return null;

  const totalCount = get(answerStats, 'totalCount', '...');
  const totalCountDouble = get(answerStats, 'totalCountDouble', '...');
  const totalCountTriple = get(answerStats, 'totalCountTriple', '...');
  const totalCountTen = get(answerStats, 'totalCountTen', '...');

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

export default AnswerStats;
