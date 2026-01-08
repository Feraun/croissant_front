import { Layout, Typography, Avatar, Input, Modal, Button } from "antd"
import AppSider from "../components/AppSider"
import AppHeader from "../components/AppHeader/AppHeader"
import AppFooter from "../components/AppFooter/AppFooter"
import { Content } from "antd/es/layout/layout"
import { AntDesignOutlined } from '@ant-design/icons';
import styled from "styled-components"
import { useState } from "react"
import PaymentDataModal from "../components/PaymentDataModal"

const data =[
    {
        "id": "1",
        "username": "johndoe",
        "password_id": "f1e2d3c4-b5a6-7890-cdef-0987654321ab",
        "roles": [
            {
            "name": "USER",
            },
            {
            "name": "ADMIN",
            }
        ],
        "selected_institution": [
            {
            "id": "inst-001",
            "name": "Tech University",
            "location": "Stockholm"
            }
        ],
        "firstname": "John",
        "lastname": "Doe",
        "contact_number": "+46701234567",
        "paymentHistory": [
            {
            "id": "pay-001",
            "amount": 99.99,
            "date": "2025-12-01",
            "method": "Credit Card"
            }
        ],
        "boxes": [
            {
            "id": "box-001",
            "type": "Standard",
            "status": "Active"
            }
        ],
        "created_at": "2026-01-06",
        'email': "email@address.com"
    }
]


const StyledInput = styled(Input)`
    width: 100%;
    height: 40px;
`

const StyledLineDiv = styled.div`
    display: flex;
    gap: 24px;
`
const StyledColumnDiv = styled.div`
    flex: 1; 
    display: flex;
    flex-Direction: column;
`

const StyledTypographyParagraph = styled(Typography.Paragraph)`
    margin-Bottom: 5px;
    margin-Top: 30px;
`

const StyledButton = styled(Button)`
    margin-top: 30px;
    width: 25%;
`
const SaveButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end; /* прижимает содержимое к правому краю */
    margin-top: 24px; 
`

function ProfilePage(){

    const [modal, setModal] = useState(false)

    const userData = data[0];

    return (
        <Layout class="page">
            <AppHeader/>
            <Layout>
                <AppSider/>
                <Content className="page-content">
                    <div>
                        <Typography.Title level={3}>Добро пожаловать, {userData.firstname}</Typography.Title>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            <Avatar
                                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                icon={<AntDesignOutlined />}
                            />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Typography.Text strong>{userData.firstname} {userData.lastname}</Typography.Text>
                                <Typography.Text type="secondary">{userData.email}</Typography.Text>
                            </div>
                        </div>
                        <StyledLineDiv>
                            <StyledColumnDiv>
                                <StyledTypographyParagraph>
                                    Имя
                                </StyledTypographyParagraph>
                                <StyledInput
                                    defaultValue = {userData.firstname}
                                />
                            </StyledColumnDiv>
                            <StyledColumnDiv>
                                <StyledTypographyParagraph>
                                    Фамилия
                                </StyledTypographyParagraph>
                                <StyledInput
                                    defaultValue = {userData.lastname}
                                />
                            </StyledColumnDiv>
                        </StyledLineDiv>
                        <StyledLineDiv>
                            <StyledColumnDiv>
                                <StyledTypographyParagraph>
                                    eMail
                                </StyledTypographyParagraph>
                                <StyledInput
                                    defaultValue = {userData.email}
                                />
                            </StyledColumnDiv>
                            <StyledColumnDiv>
                                <StyledTypographyParagraph>
                                    Номер телефона
                                </StyledTypographyParagraph>
                                <StyledInput
                                    defaultValue = {userData.contact_number}
                                />
                            </StyledColumnDiv>
                        </StyledLineDiv>
                    </div>

                    <StyledButton
                        onClick = {() => setModal(true)}
                    >
                        Платёжная информация
                    </StyledButton>

                    <SaveButtonDiv>
                        <Button >
                            Сохранить
                        </Button>
                    </SaveButtonDiv>
                    

                </Content>
            </Layout>
            <AppFooter/>

            <Modal
                open={modal}
                onCancel={() => setModal(false)}
                footer={null}
            >
                <PaymentDataModal/>
            </Modal>

        </Layout>

        
    )
}

export default ProfilePage