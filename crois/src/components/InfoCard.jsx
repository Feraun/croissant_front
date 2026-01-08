import { Card, Divider, List, Typography, Tooltip, Button } from 'antd';
import styled from 'styled-components';
import { HeartOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
const { Meta } = Card;

const StyledCard = styled(Card) `
    display: inline-block;
    padding: 0;
    margin: 0;

    .ant-card-body{
        padding: 0;

    }
`

const StyledDivider = styled(Divider)`
    margin-bottom: 5px;
    margin-top: 5px;
`

const StyledRate = styled(Rate)`
    font-size: 10;
    margin-block-end: 0px;

    .ant-rate-star {
    font-size: 15px;
    
  }
`


export default function InfoCard({institution}) {
    return (

        <Card
            key={institution.id}
            hoverable
            title={institution.name}
            style={{ width: 300, height: 200 }}
            extra={
                <Tooltip title="В избранное">
                    <Button
                        type="text"
                        icon={ <HeartOutlined />}
                        // onClick для отправки на сервер
                    />
                </Tooltip>
            }
        >
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 3,
                xxl: 3,
            }}
            dataSource={institution.categories}
            renderItem={(item) => (
                <List.Item style={{
                    margin: 0
                }}>
                    {item.name}
                </List.Item>
            )}
        />
        <Typography.Paragraph>
            {institution.address}
            <StyledDivider/>
            <StyledRate disabled defaultValue={institution.rating} allowHalf/>
        </Typography.Paragraph>
        {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
        </Card>
    )
}