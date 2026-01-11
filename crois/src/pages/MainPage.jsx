import "../App.css"
import AppHeader from "../components/AppHeader/AppHeader";
import AppFooter from "../components/AppFooter/AppFooter";
import { Layout, List, Modal} from 'antd';
import AppSider from "../components/AppSider";
import InfoCard from "../components/InfoCard";
import { data } from "../../data";
import InfoCardModal from "../components/InfoCardModal";
import { useState } from "react";


const { Content } = Layout;



function MainPage() {

    const [institution, setInstitution] = useState(null)
    const [modal, setModal] = useState(false)


    return (
        <Layout class="page">
            <AppHeader >Header</AppHeader>
            <Layout>

                <AppSider/>

                <Content class="page-content">
                    <List
                        grid={{ gutter: 32, column: 4 }}
                        dataSource={data}
                        
                        renderItem={(item) => (
                        <List.Item
                            onClick={() => {
                                setInstitution(item)
                                setModal(true)
                            }}
                        >
                            <InfoCard
                                key={item.id}
                                institution={item}
                            />
                        </List.Item>
                        )}
                    />

                    <Modal
                        open={modal}
                        onCancel={() => setModal(false)}
                        footer={null}
                    >
                        <InfoCardModal institution={institution}/>
                    </Modal>

                </Content>
            </Layout>
            <AppFooter>Footer</AppFooter>
        </Layout>
    )
}

export default MainPage;