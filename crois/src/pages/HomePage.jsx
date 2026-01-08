import AppFooter from "../components/AppFooter/AppFooter"
import AppHeader from "../components/AppHeader/AppHeader"
import { Layout } from "antd"
import '../App.css';
import { Content } from "antd/es/layout/layout";



function HomePage(){
    return (
        <Layout class="page">
            <AppHeader authButton/>
            <Content class="page-content"></Content>
           
            <AppFooter/>
        </Layout>
    )
}

export default HomePage