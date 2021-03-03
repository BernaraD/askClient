import { IQuestion, IQuestionQueryParams } from '@/pages/question/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IQuestionDeleteById {
  questionId: string;
  queryParams: IQuestionQueryParams;
}

interface IProps {
  row: IQuestion;
  open: (arg: ISidepanel) => void;
  questionDeleteById: (arg: IQuestionDeleteById) => void;
  queryParams: IQuestionQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IQuestion) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IQuestion) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (questionId: string) => {
    props.open({
      title: 'Edit Question',
      component: 'QuestionFormEdit',
      place: 'QuestionDashboard',
      width: 800,
      questionId,
    });
  };

  const deletePrompt = (question: IQuestion) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${question.name}`,
      okType: 'danger',
      onOk: () => props.questionDeleteById({ questionId: question._id, queryParams }),
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
  questionDeleteById: (payload: IQuestionDeleteById) =>
    dispatch({ type: 'QuestionDashboard/questionDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
