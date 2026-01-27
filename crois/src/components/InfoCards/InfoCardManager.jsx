import { Card, Divider, List, Typography, Tooltip, Button, Tag } from 'antd';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';
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

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px; /* расстояние между чипсами */
`;

export default function InfoCard({ institution, onClick }) { // <-- добавили onClick
    return (
        <div onClick={onClick} style={{ cursor: "pointer" }}>
            <Card
                key={institution.id}
                hoverable
                title={institution.name}
                style={{ width: 300, height: 200 }}
                extra={
                    <Tooltip title="Редактировать заведение">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            // onClick для отправки на сервер
                        />
                    </Tooltip>
                }
            >
                <Typography.Paragraph>
                    {institution.address}
                    <StyledDivider />
                    <StyledRate disabled defaultValue={institution.rating} allowHalf />
                </Typography.Paragraph>
            </Card>
        </div>
    );
}
