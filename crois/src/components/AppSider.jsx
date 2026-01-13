import { SearchOutlined, HomeOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Item from 'antd/es/list/Item';
const {  Sider } = Layout;

const StyleSider = styled(Sider) `
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-radius: 10px;
`;


const CenteredButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 95%; /* если хочешь, чтобы кнопка занимала всю ширину сайдера */
  height: 35px; /* можно задать фиксированную высоту */
  gap: 6px; /* расстояние между иконкой и текстом */
  padding: 1rem;

  margin-bottom: 10px;
`;

// eslint-disable-next-line react-refresh/only-export-components
export const menuConfig = {
  ROLE_CLIENT: [
    { label: "Главная", path: "/main", icon: <HomeOutlined />, },
    { label: "Поиск", path: "/main/search", icon: <SearchOutlined />, },
    { label: "Профиль", path: "/profile", icon: <UserOutlined />, }
  ],
  ROLE_ADMIN: [
    { label: "Админка", path: "/admin" },
    { label: "Пользователи", path: "/admin/users" }
  ],
  ROLE_MANAGER: [
    { label: "Боксы", path: "/boxes" },
    { label: "Статистика продаж", path: "/statystics" }
  ]
};


export default function AppSider(){

    const {user} = useAuth();

    if(!user) return null;

    const roles = Array.isArray(user?.roles) ? user.roles : [];

    const menuItems = roles.flatMap(role => menuConfig[role] || []);

    return (
        <StyleSider>

            {menuItems.map(item=>(
                <Link key={item.path} to={item.path}>
                <CenteredButton>
                    {item.icon}
                    {item.label}
                </CenteredButton>
                </Link>
            ))}
    
        </StyleSider>
    )
}