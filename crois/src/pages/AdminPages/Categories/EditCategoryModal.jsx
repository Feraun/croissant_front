import { Form, Button, Input, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import adminCategoriesOfInstitutionService from '../../../services/AdminCategoriesService'

export default function EditCategoryModal({ category, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const isEdit = Boolean(category?.id);

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        description: category.description,
      });
    } else {
      form.resetFields();
    }
  }, [category]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (isEdit) {
        await adminCategoriesOfInstitutionService.editCategory(category.id, values);
      } else {
        await adminCategoriesOfInstitutionService.createCategory(values);
      }
      onSuccess();
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      Modal.error({ title: "Ошибка", content: "Не удалось сохранить" });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin fullscreen />;

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Название категории"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Описание"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {isEdit ? "Сохранить" : "Создать"}
      </Button>
    </Form>
  );
}
