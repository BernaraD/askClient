import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IAnswer } from '@/pages/answer/types';
import ActionMenu from '@/pages/answer/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: IAnswer[];
}

const AnswerSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IAnswer>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/answer/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
    },

    {
      title: 'questionId',
      dataIndex: 'questionId',
      key: 'questionId',
    },
    {
      title: 'Action',
      key: 'action',
      className: 'actions',
      width: 80,
      render: (row) => <ActionMenu row={row} queryParams={queryParams} />,
    },
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={items}
      size="middle"
      className="table-middle"
      pagination={false}
    />
  );
};

// state: any
const mapStateToProps = () => ({});

//dispatch: any
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnswerSearchList));
