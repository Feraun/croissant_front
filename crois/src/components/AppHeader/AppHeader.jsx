import { Button, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
// eslint-disable-next-line no-unused-vars
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
  const pathname = location.pathname;

  const isMyInstitutionBoxes = pathname.startsWith("/main/myInstitutions/") && pathname.endsWith("/boxes");

  const hideAuthButtonRoutes = [
    "/login",
    "/main",
    "/main/profile",
    "/main/search",
    "/main/boxes",
    "/main/myInstitutions",
  ];

    const hideAuthButton = hideAuthButtonRoutes.includes(pathname) || isMyInstitutionBoxes;

    const hideRegButton = hideAuthButtonRoutes.includes(pathname) || isMyInstitutionBoxes;

    const hideLogoutButton = ['/', '/login', '/signup'];

    const showAuthButton = !hideAuthButton;
    const showRegButton = !hideRegButton;
    const showLogoutButton = !hideLogoutButton.includes(pathname);

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