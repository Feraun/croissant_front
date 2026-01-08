import "../App.css"
import AppHeader from "../components/AppHeader/AppHeader";
import AppFooter from "../components/AppFooter/AppFooter";
import { Layout, Input, List} from 'antd';
import AppSider from "../components/AppSider";
import InfoCard from "../components/InfoCard";
import SearchCard from "../components/SearchCard";
import { useState } from "react";
import { data } from "../../data";


const { Header, Footer, Sider, Content } = Layout;


function SearchPage() {

    const [searchValue, setSearchValue] = useState("");

    const dataForSearch = data.filter((institution) =>
        institution.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <Layout class="page">
            <AppHeader >Header</AppHeader>
            <Layout>
                <AppSider/>
                <Content class="page-content">
                    <SearchCard onSearch={setSearchValue}/>
                    <List
                        style={{ marginTop: 24 }}
                        grid={{ gutter: 24, column: 4 }}
                        dataSource={dataForSearch}
                        renderItem={(item) => (
                        <List.Item>
                            <InfoCard institution={item} />
                        </List.Item>
                        )}
                    />
                </Content>
            </Layout>
            <AppFooter>Footer</AppFooter>
        </Layout>
    )
}

export default SearchPage;