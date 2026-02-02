import AppFooter from "../components/AppFooter/AppFooter"
import AppHeader from "../components/AppHeader/AppHeader"
import '../App.css';
import { Button, Checkbox, Form, Input, Layout, Flex, Modal, Spin } from 'antd';
import { Content } from "antd/es/layout/layout";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/AuthService";



function AuthPage(){
    const [form] = Form.useForm();
    const [loading, setLoading] = useState()
    const navigate = useNavigate()

    const { setUser } = useAuth();

    const onFinish = async (values) => {
        const payload = {
            username: values.username,
            password: values.password,
        };

        setLoading(true);

        try {
            const response = await authService.login(payload);

            //сохранить токен в локалсторадж
            localStorage.setItem('token', response.data.token);

            
            //достаем юзера из токена
            const decodedUser = jwtDecode(localStorage.getItem("token"));

            //закидываем юзера в AuthContext
            setUser(decodedUser);


            setLoading(false);

            navigate('/main');

        } catch (error) {

            console.error('Login error:', error.response?.data || error.message);
            console.log(error.response?.data?.message || 'Login error');
            setLoading(false);

            Modal.error({
                title: 'Ошибка входа',
                content: error.response?.data?.message || 'Данные введены неверно',
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
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a href="">Forgot password</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                        or <Link to={"/signup"}> Register now</Link>
                    </Form.Item>
                </Form>
            </Content>
            <AppFooter/>
        </Layout>
    )
}

export default AuthPage