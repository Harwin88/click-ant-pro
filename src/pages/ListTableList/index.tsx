import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('Esto esta en el index del listTable en pagina');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Esto esta en el index del listTable en pagina');
    return true;
  } catch (error) {
    hide();
    message.error('Esto esta en el index del listTable en pagina！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在Esto esta en el index del listTable en pagina配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('succes Esto esta en el index del listTable en pagina');
    return true;
  } catch (error) {
    hide();
    message.error('error ！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('Esto esta en el index del listTable en pagina');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Esto esta en el index del listTable en pagina');
    return true;
  } catch (error) {
    hide();
    message.error('Esto esta en el index del listTable en pagina');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [sorter, setSorter] = useState<string>('');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Esto esta en el index del listTable en pagina',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: 'Esto esta en el index del listTable en pagina',
        },
      ],
    },
    {
      title: 'Esto esta en el index del listTable en pagina',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: 'Esto esta en el index del listTable en pagina',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => `${val} 万`,
    },
    {
      title: 'Esto esta en el index del listTable en pagina',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: 'Esto esta en el index del listTable en pagina', status: 'Default' },
        1: { text: 'Esto esta en el index del listTable en pagina', status: 'Processing' },
        2: { text: 'Esto esta en el index del listTable en pagina', status: 'Success' },
        3: { text: 'Esto esta en el index del listTable en pagina', status: 'Error' },
      },
    },
    {
      title: 'Esto esta en el index del listTable en pagina',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="Esto esta en el index del listTable en pagina！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: 'Esto esta en el index del listTable en pagina',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <a href="">Esto esta en el index del listTable en pagina</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="Esto esta en el index del listTable en pagina"
        actionRef={actionRef}
        rowKey="key"
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter as SorterResult<TableListItem>;
          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        params={{
          sorter,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> Esto esta en el index del listTable en pagina
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">Esto esta en el index del listTable en pagina</Menu.Item>
                  <Menu.Item key="approval">Esto esta en el index del listTable en pagina</Menu.Item>
                </Menu>
              }
            >
              <Button>
              Esto esta<DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            Esto  <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> dddd&nbsp;&nbsp;
            <span>
              espase esto {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} dddd
            </span>
          </div>
        )}
        request={(params) => queryRule(params)}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
