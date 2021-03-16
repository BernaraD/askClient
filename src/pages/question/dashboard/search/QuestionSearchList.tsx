import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IQuestion } from '@/pages/question/types';
import ActionMenu from '@/pages/question/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: IQuestion[];
}

const QuestionSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IQuestion>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/question/${row._id}`}>{row.name}</Link>,
    },
    //
    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    //   key: 'email',
    // },

    //вот эту строчку надо хорошо понять !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //   {
    //     title: 'Law Practice',
    //     render: (row) => <Link to={`/practice/${row._id}`}>{get(row, 'practice.practice')}</Link>,
    //     key: 'practice',
    //   },
    //   //..********************************************************************************
    //   {
    //     title: 'Telephone',
    //     dataIndex: 'telephone',
    //     key: 'telephone',
    //   },
    //
    //   {
    //     title: 'Notes',
    //     dataIndex: 'notes',
    //     key: 'notes',
    //   },
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionSearchList));
