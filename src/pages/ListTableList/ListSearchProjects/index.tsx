import { Card, Col, Form, List, Row, Select, Typography } from 'antd';
import React, { FC, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import AvatarList from './components/AvatarList';
import { StateType } from './model';
import { ListItemDataType } from './data.d';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

interface ListSearchProjectsProps {
  dispatch: Dispatch<any>;
  listTableListAndListSearchProjects: StateType;
  loading: boolean;
}

const getKey = (id: string, index: number) => `${id}-${index}`;

const ListSearchProjects: FC<ListSearchProjectsProps> = ({
  dispatch,
  listTableListAndListSearchProjects: { list = [] },
  loading,
}) => {
  useEffect(() => {
    dispatch({
      type: 'listTableListAndListSearchProjects/fetch',
      payload: {
        count: 8,
      },
    });
  }, []);
  const cardList = list && (
    <List<ListItemDataType>
      rowKey="id"
      loading={loading}
      grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} />}>
            <Card.Meta
              title={<a>{item.title}</a>}
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {item.subDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{moment(item.updatedAt).fromNow()}</span>
              <div className={styles.avatarList}>
                <AvatarList size="small">
                  {item.members.map((member, i) => (
                    <AvatarList.Item
                      key={getKey(item.id, i)}
                      src={member.avatar}
                      tips={member.name}
                    />
                  ))}
                </AvatarList>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"
          onValuesChange={() => {
            // 表单项变化时请求数据
            // 模拟查询表单生效
            dispatch({
              type: 'listTableListAndListSearchProjects/fetch',
              payload: {
                count: 8,
              },
            });
          }}
        >
          <StandardFormRow title="Opciones Tabla" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable>
                <TagSelect.Option value="cat1">Poner algo</TagSelect.Option>
                <TagSelect.Option value="cat2">Poner algo</TagSelect.Option>
                <TagSelect.Option value="cat3">Poner algo</TagSelect.Option>
                <TagSelect.Option value="cat4">Poner algo</TagSelect.Option>
                <TagSelect.Option value="cat5">Poner algo</TagSelect.Option>
                <TagSelect.Option value="cat6">Poner algo</TagSelect.Option>
                <TagSelect.Option value="cat7">Poner algo</TagSelect.Option>
                <TagSelect.Option value="cat8">Poner algo</TagSelect.Option>
                <TagSelect.Option value="cat9">Poner algo</TagSelect.Option>
                <TagSelect.Option value="cat10">Poner algo</TagSelect.Option>
                <TagSelect.Option value="cat11">Poner algo</TagSelect.Option>
                <TagSelect.Option value="cat12">Poner algo</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="poner" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="Poner" name="author">
                  <Select placeholder="Poner" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="lisa">Poner Algo</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="Poner" name="rate">
                  <Select placeholder="Poner algo" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="good">Poner algo</Option>
                    <Option value="normal">Poner algo</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
    </div>
  );
};

export default connect(
  ({
    listTableListAndListSearchProjects,
    loading,
  }: {
    listTableListAndListSearchProjects: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    listTableListAndListSearchProjects,
    loading: loading.models.listTableListAndListSearchProjects,
  }),
)(ListSearchProjects);
