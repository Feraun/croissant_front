import {
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  Modal,
  Select,
  Space,
  Spin
} from 'antd';
import { Content } from "antd/es/layout/layout";
import AppHeader from '../components/AppHeader/AppHeader';
import AppFooter from '../components/AppFooter/AppFooter';
import '../App.css';
import { authService } from '../services/api'; 
import { useState } from 'react';

const validateMessages = {
    required: "${label} is required",
    types:{
        number: "${label} is not valid number",
        email: '${label} is not a valid'
    },
    number: {
        range: "${label} must be between ${min} and ${max}"
    },
}

function RegPage() {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
        <Select
            style={{ width: 100 }}
            defaultValue={'RUS: +7'}
            options={[
            { label: 'RUS: +7', value: '7_rus' },
            { label: 'KZH: +7', value: '7_kzh' },
            ]}
        />
        </Form.Item>
    );

    const onFinish = async (values) => {
        const payload = {
        email: values.email,
        username: values.username,
        password: values.password,
        firstName: values.firstname,
        lastName: values.lastname,
        contactNumber: values.phone,
        };

        setLoading(true);

        try {
            await authService.registration(payload);
        // const response = await authService.registration(payload);
        // console.log('Registration successful!');
        // console.log('API response:', response.data);
            setLoading(false);

            Modal.success({
                title: 'Успех',
                content: 'Регистрация прошла успешно!',
            });

            form.resetFields(); // очищаем форму
        } catch (error) {

            console.error('Registration error:', error.response?.data || error.message);
            console.log(error.response?.data?.message || 'Registration failed');
            setLoading(false);

            Modal.error({
                title: 'Ошибка регистрации',
                content: error.response?.data?.message || 'Попытка регистрации не удалась!',
            });
        }
    };
    

    if(loading){
        return <Spin fullscreen />
    }
    
    return (
        <Layout class="page">
            <AppHeader/>
            <Content class="centered-content">
                <Form
                form={form}
                name="register"
                onFinish={onFinish}
                validateMessages={validateMessages}
                style={{ maxWidth: 600 }}
                scrollToFirstError
                >

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                        { 
                            type: 'email', 
                            required: true },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label="Username"
                        //tooltip="What do you want others to call you?"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="firstname"
                        label="Firstname"
                        //tooltip="What do you want others to call you?"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        label="Lastname"
                        //tooltip="What do you want others to call you?"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[{ required: true}]}
                    >
                        {/* Demo only, real usage should wrap as custom component */}

                        <Space.Compact block>
                            {prefixSelector}
                        <Input style={{ width: '100%' }} />
                        </Space.Compact>

                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                        {
                            validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                        ]}
                    >
                        <Checkbox>
                        I have read the <a href="">agreement</a>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Register
                        </Button>
                    </Form.Item>

                </Form>
            </Content>
            <AppFooter/>
        </Layout>
    );
};
export default RegPage;