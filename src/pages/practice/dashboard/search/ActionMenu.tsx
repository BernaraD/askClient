import { IPractice, IPracticeQueryParams } from '@/pages/practice/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IPracticeDeleteById {
  practiceId: string;
  queryParams: IPracticeQueryParams;
}

interface IProps {
  row: IPractice;
  open: (arg: ISidepanel) => void;
  practiceDeleteById: (arg: IPracticeDeleteById) => void;
  queryParams: IPracticeQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IPractice) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IPractice) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (practiceId: string) => {
    props.open({
      title: 'Edit Practice',
      component: 'PracticeFormEdit',
      place: 'PracticeDashboard',
      width: 800,
      practiceId,
    });
  };

  const deletePrompt = (practice: IPractice) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${practice.name}`,
      okType: 'danger',
      onOk: () => props.practiceDeleteById({ practiceId: practice._id, queryParams }),
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
  practiceDeleteById: (payload: IPracticeDeleteById) =>
    dispatch({ type: 'PracticeDashboard/practiceDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
