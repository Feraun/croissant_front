import { Form, Button, Input, Spin, Modal, InputNumber, Result } from "antd";
import { boxService } from "../services/boxService";
import { useState } from "react";

export default function CreateBoxModal({ onClose, onSuccess }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const onFinish = async (values) => {
        const payload = {
            name: values.name,
            description: values.description,
            price: values.price,
            randomly: true,
        };

        setLoading(true);

        try {
            await boxService.createBox(1, payload); // тут можно institutionId передавать динамически
            setLoading(false);
            setSubmitted(true); // переключаем на Result
            form.resetFields();
            
            onSuccess()
        } catch (error) {
            setLoading(false);
            console.error('Add error:', error.response?.data || error.message);

            Modal.error({
                title: 'Ошибка добавления',
                content: error.response?.data?.message || 'Попытка добавления не удалась!',
            });
        }
    };

    if (loading) return <Spin fullscreen />;

    if (submitted) {
        return (
            <Result
                status="success"
                title="Новый бокс добавлен"
                extra={[
                    <Button type="primary" key="close" onClick={onClose}>
                        Close
                    </Button>
                ]}
            />
        );
    }

    return (
        <Form
            form={form}
            name="create-box"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <Form.Item name="name" label="Название" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="description" label="Описание" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="price" label="Цена">
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Добавить бокс
                </Button>
            </Form.Item>
        </Form>
    );
}
