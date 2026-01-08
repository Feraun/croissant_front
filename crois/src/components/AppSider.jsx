import { SearchOutlined, HomeOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import styled from "styled-components";
import { Link } from 'react-router-dom';
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


export default function AppSider(){
    return (
        <StyleSider>

            <Link to="/main">
                <CenteredButton>
                    <HomeOutlined />
                    Главная
                </CenteredButton>
            </Link>
            
            <Link to="/main/search">
                <CenteredButton>
                    <SearchOutlined />
                    Поиск заведений
                </CenteredButton>
            </Link>

            <CenteredButton>
                <HeartOutlined />
                Избранное
            </CenteredButton>

            <Link to="/profile">
                <CenteredButton>
                    <UserOutlined />
                    Профиль
                </CenteredButton>
            </Link>

        </StyleSider>
    )
}