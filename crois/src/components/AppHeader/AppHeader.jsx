import { Button, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link, useLocation } from "react-router-dom";
import styled from 'styled-components';
import './AppHeader.css';

const StyleLink = styled(Link)({
  textDecoration: 'none',
  color: "black",

  ':hover': {
    textDecoration: 'underline',
    color: "black",
  },

  ':active': {
    textDecoration: 'underline',
    color: "black",
  },

  '::before': {
    textDecoration: 'underline',
    color: "black",
  }

});

export default function AppHeader(){
    const location = useLocation()

    const hideAuthButtonRoutes = ['/login', '/main', '/profile'];

    const hideRegButtonRoutes = ['/signup', '/main', '/profile'];

    const hideLogoututton = ['/', '/login', '/signup'];

    const showAuthButton = !hideAuthButtonRoutes.includes(location.pathname);

    const showRegButton = !hideRegButtonRoutes.includes(location.pathname);

    const showLogoutButton = !hideLogoututton.includes(location.pathname);

    function LogOut() {
      localStorage.removeItem("token")
    }

    return (
        <>
            <Header class="headerStyle">
                <Typography.Paragraph class="title"><StyleLink to={"/"}>Круасон</StyleLink></Typography.Paragraph>
                <div class="right_nav">
                    {showAuthButton && <Link to="/login"><Button >Log In</Button></Link>}
                    {showRegButton && <Link to="/signup"><Button>Sign Up</Button></Link>}
                    {showLogoutButton && <Link to="/"><Button onClick={LogOut}>LogOut</Button></Link>}
                </div>
            </Header>
        </>
    )
}