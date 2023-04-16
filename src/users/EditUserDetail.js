import { Form, Input, Modal } from "antd";
import React from "react";

export const EditUserDetail = ({ isOpen, user, handleClose, handleUpdate }) => {
  const [form] = Form.useForm();
  const onCancel = () => {
    form.resetFields();
    handleClose();
  };
  const onOk = () => {
    const errors = form.getFieldsError();
    if (!errors.some((error) => error.errors.length > 0)) {
      handleUpdate({ ...user, ...form.getFieldsValue() });
      handleClose();
    }
  };
  return (
    <Modal
      open={isOpen}
      title="Edit User"
      onCancel={onCancel}
      onOk={onOk}
      data-testid="edit-user-modal"
    >
      <Form
        name="edit_user"
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          name: user.name,
          email: user.email,
          phone: user.phone,
          website: user.website,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Website"
          name="website"
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
