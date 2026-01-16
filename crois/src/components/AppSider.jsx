import { SearchOutlined, HomeOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Item from 'antd/es/list/Item';
const {  Sider } = Layout;
import { BarChartOutlined } from '@ant-design/icons';


const StyleSider = styled(Sider)`
  color: white;
  padding: 1rem;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: stretch;     /* кнопки одинаковой ширины */
  justify-content: flex-start; /* ВСЕГДА сверху */
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
  common: [
    {
      label: "Главная",
      path: "/main",
      icon: <HomeOutlined />,
      roles: ["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_MANAGER"],
    },
    {
      label: "Поиск",
      path: "/main/search",
      icon: <SearchOutlined />,
      roles: ["ROLE_CLIENT"],
    },
    {
      label: "Профиль",
      path: "/main/profile",
      icon: <UserOutlined />,
      roles: ["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_MANAGER"],
    },
  ],

  manager: [
    {
      label: "Боксы",
      path: "/main/boxes",
      icon: <HeartOutlined />,
      roles: ["ROLE_MANAGER"],
    },
    {
      label: "Статистика",
      path: "/main/statistics",
      icon: <BarChartOutlined />,
      roles: ["ROLE_MANAGER"],
    },
  ],

  admin: [
    {
      label: "Города",
      path: "/main/cities",
      icon: <HomeOutlined />,
      roles: ["ROLE_ADMIN"],
    },
  ],
};




export default function AppSider() {
  const { user } = useAuth();
  if (!user) return null;

  const authRoles = user.roles || [];

  const canAccess = (item) =>
    item.roles.some(role => authRoles.includes(role));

  const renderSection = (items) =>
    items
      .filter(canAccess)
      .map(item => (
        <Link to={item.path} style={{ width: "100%" }}>
          <CenteredButton
            key={item.path}
            to={item.path}
            block
          >
            {item.icon}
            {item.label}
          </CenteredButton>
        </Link>
      ));

  return (
    <StyleSider>
      {renderSection(menuConfig.common)}

      <div style={{ marginTop: "auto" }}>
        {renderSection(menuConfig.manager)}
        {renderSection(menuConfig.admin)}
      </div>
    </StyleSider>
  );
}
