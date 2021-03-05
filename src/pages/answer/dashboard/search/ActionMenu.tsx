import { IAnswer, IAnswerQueryParams } from '@/pages/answer/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IAnswerDeleteById {
  answerId: string;
  queryParams: IAnswerQueryParams;
}

interface IProps {
  row: IAnswer;
  open: (arg: ISidepanel) => void;
  answerDeleteById: (arg: IAnswerDeleteById) => void;
  queryParams: IAnswerQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IAnswer) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IAnswer) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (answerId: string) => {
    props.open({
      title: 'Edit Answer',
      component: 'AnswerFormEdit',
      place: 'AnswerDashboard',
      width: 800,
      answerId,
    });
  };

  const deletePrompt = (answer: IAnswer) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${answer.name}`,
      okType: 'danger',
      onOk: () => props.answerDeleteById({ answerId: answer._id, queryParams }),
    });
  };

  return (
    <span>
      <div id="top-menu" role="menu" className="d-flex align-items-end">
        <Button type="link" onClick={() => editHandler(row._id)}>
          <EditOutlined className="edit-pen-icon" />
        </Button>

        <Dropdown overlay={menu(row)}>
          <span className="ant-dropdown-link">
            <img src={dotsIcon} alt="" height="27" />
          </span>
        </Dropdown>
      </div>
    </span>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  answerDeleteById: (payload: IAnswerDeleteById) => dispatch({ type: 'AnswerDashboard/answerDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
