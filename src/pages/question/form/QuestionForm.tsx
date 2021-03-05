import React from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { IQuestion } from '@/pages/question/types';
import { get } from 'lodash';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IQuestion;
}

const QuestionForm = (props: IProps) => {
  //  const { Option } = Select;

  const isLoading = get(props, 'isLoading', false);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">
      <Form.Item name="name" label="Name" rules={[validator.require]}>
        <Input />
      </Form.Item>

      <Form.Item name="question" label="Question">
        <Input />
      </Form.Item>

      <Form.Item name="telephone" label="telephone" rules={[validator.require]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[validator.require]}>
        <Input />
      </Form.Item>

      <Form.Item name="notes" label="Notes">
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
      </Form.Item>

      <Form.Item name="practice" rules={[validator.require]}>
        <Select placeholder="Practice">
          {props.practiceList.map((el) => (
            <Option value={el._id} key={el._id}>
              {el.practice}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuestionForm;
