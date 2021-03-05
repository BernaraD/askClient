import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IPracticeStats } from '@/pages/practice/types';

interface IProps {
  stats: IPracticeStats;
}

const PracticeStats = (props: IProps) => {
  const practiceStats = get(props, 'stats', '');

  // if (isEmpty(practiceStats)) return null;

  const totalCount = get(practiceStats, 'totalCount', '...');
  const totalCountDouble = get(practiceStats, 'totalCountDouble', '...');
  const totalCountTriple = get(practiceStats, 'totalCountTriple', '...');
  const totalCountTen = get(practiceStats, 'totalCountTen', '...');

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

export default PracticeStats;
