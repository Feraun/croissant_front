import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Input,
  Modal,
  Spin,
  Select,
  Upload
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import adminInstitutionsService from "../../../services/AdminInstitutionsSerivice";
import adminCategoriesService from "../../../services/AdminCategoriesService";
import adminCitiesService from "../../../services/AdminCitiesService";
import adminUsersService from "../../../services/AdminUsersService";

export default function EditInstitutionModal({ institution, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [users, setUsers] = useState([]);

  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);

  const [form] = Form.useForm();
  const isEdit = Boolean(institution?.id);

  // =========================
  // Lazy load categories
  // =========================
  const loadCategories = async () => {
    if (categories.length > 0) return;
    setCategoriesLoading(true);
    try {
      const res = await adminCategoriesService.getAllCategories();
      setCategories(res.data.map(c => ({ label: c.name, value: c.id })));
    } finally {
      setCategoriesLoading(false);
    }
  };

  const loadCities = async () => {
    if (cities.length > 0) return;
    setCitiesLoading(true);
    try {
      const res = await adminCitiesService.getAllCities();
      setCities(res.data.map(c => ({ label: c.name, value: c.id })));
    } finally {
      setCitiesLoading(false);
    }
  };

  const loadUsers = async () => {
    if (users.length > 0) return;
    setUsersLoading(true);
    try {
      const res = await adminUsersService.getAllUsers();
      setUsers(res.data.map(u => ({ label: u.username, value: u.id })));
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (institution) {
      form.setFieldsValue({
        name: institution.name,
        address: institution.address,
        rating: institution.rating,
        contactNumber: institution.contactNumber,
        city: institution.city ? { label: institution.city.name, value: institution.city.id } : null,
        categories: institution.categories?.map(c => ({ label: c.name, value: c.id })),
        managers: institution.managers?.map(u => ({ label: u.username, value: u.id }))
      });

      setLogoFile(null); // если редактирование, файл нужно перезагрузить, если пользователь выбирает новый
    } else {
      form.resetFields();
      setLogoFile(null);
    }
  }, [institution]);

  // =========================
  // Submit
  // =========================
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("rating", values.rating);
      formData.append("contactNumber", values.contactNumber);
      formData.append("cityId", values.city.value);

      values.categories.forEach(c => formData.append("categoryIds", c.value));
      values.managers.forEach(u => formData.append("managersIds", u.value));

      if (logoFile) {
        formData.append("file", logoFile);
      }

      if (isEdit) {
        await adminInstitutionsService.editInstitution(institution.id, formData);
      } else {
        await adminInstitutionsService.createInstitution(formData);
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      Modal.error({
        title: "Ошибка",
        content: "Не удалось сохранить"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin fullscreen />;

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Название заведения"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Адрес"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="city"
        label="Город"
        rules={[{ required: true }]}
      >
        <Select
          labelInValue
          showSearch={false}
          options={cities}
          loading={citiesLoading}
          placeholder="Выберите город"
          onOpenChange={open => open && loadCities()}
        />
      </Form.Item>

      <Form.Item name="rating" label="Рейтинг">
        <Input />
      </Form.Item>

      <Form.Item
        name="contactNumber"
        label="Контактный телефон"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="categories"
        label="Категории"
        rules={[{ required: true }]}
      >
        <Select
          mode="multiple"
          labelInValue
          showSearch={false}
          options={categories}
          loading={categoriesLoading}
          placeholder="Выберите категории"
          onOpenChange={open => open && loadCategories()}
        />
      </Form.Item>

      <Form.Item name="managers" label="Менеджеры">
        <Select
          mode="multiple"
          labelInValue
          showSearch={false}
          options={users}
          loading={usersLoading}
          placeholder="Выберите менеджеров"
          onOpenChange={open => open && loadUsers()}
        />
      </Form.Item>

      <Form.Item label="Логотип">
        <Upload
          listType="picture-card"
          showUploadList={false}
          beforeUpload={(file) => {
            setLogoFile(file); // сохраняем файл напрямую
            return false; // предотвращаем автоматическую загрузку
          }}
        >
          {logoFile ? (
            <img
              src={URL.createObjectURL(logoFile)}
              alt="logo"
              style={{ width: "100%" }}
            />
          ) : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {isEdit ? "Сохранить" : "Создать"}
      </Button>
    </Form>
  );
}
