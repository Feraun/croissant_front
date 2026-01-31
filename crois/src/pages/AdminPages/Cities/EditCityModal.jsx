import { Form, Button, Input, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import adminCitiesService from "../../../services/AdminCitiesService";

export default function EditCityModal({ city, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const isEdit = Boolean(city?.id);

  useEffect(() => {
    if (city) {
      form.setFieldsValue({
        name: city.name,
        region: city.region,
      });
    } else {
      form.resetFields();
    }
  }, [city]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (isEdit) {
        await adminCitiesService.editCity(city.id, values);
      } else {
        await adminCitiesService.createCity(values);
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
        label="Название города"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="region"
        label="Регион"
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
