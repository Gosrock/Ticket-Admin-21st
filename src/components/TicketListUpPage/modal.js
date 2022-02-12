import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const TicketModal = () => {
  const onSubmitHandler = values => {
    const fetchData = async () => {
      try {
        const accountNameList = values.accountNameList;

        const response = await axios.post('/admin/tickets', {
          accountNameList
        });
        console.log(response);
      } catch (e) {
        console.log('submit error:', e.response.data);
      }
    };
    fetchData();
  };

  return (
    <Form
      name="dynamic_form_nest_item"
      autoComplete="off"
      onFinish={onSubmitHandler}
    >
      <Form.List name="accountNameList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  style={{ width: '200px' }}
                  {...restField}
                  name={[name, 'accountName']}
                  rules={[{ required: true, message: '이름을 입력하세요' }]}
                >
                  <Input placeholder="발급할 이름을 입력하세요" />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                추가
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
