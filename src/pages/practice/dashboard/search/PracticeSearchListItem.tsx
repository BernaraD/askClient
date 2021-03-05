import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IPractice } from '@/pages/practice/types';

interface IProps extends IPractice {
  practiceDelete: (id: String) => void;
}

const PracticeSearchListItem = (props: IProps) => {
  const { practiceDelete } = props;

  const owner = get(props, 'item.owner', '');
  const practiceId = get(props, 'item._id', '');
  const createdAt = get(props, 'item.createdAt', '');
  const description = get(props, 'item.description', '');

  const ownerName = get(owner, 'name', '');
  const ownerId = get(owner, '_id', '');

  return (
    <div>
      <Row>
        {moment(createdAt).format('LL HH:mm')}

        <Link to={`/profile/${ownerId}`}>{ownerName}</Link>
      </Row>

      <Row>{description}</Row>

      <Row>
        <Button danger onClick={() => practiceDelete(practiceId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  practiceDelete: (payload: any) => dispatch({ type: 'PracticeDashboard/practiceDelete', payload }),
});

export default connect(null, mapDispatchToProps)(PracticeSearchListItem);
