import { Typography, Divider, List } from "antd";

export default function InfoCardModal({institution}){
    return (
        <>
            <Typography.Title level={2}>{institution.name}</Typography.Title>
            <Divider />
            <Typography.Paragraph>Город: {institution.city.name}</Typography.Paragraph>
            <Typography.Paragraph>Адрес: {institution.address}</Typography.Paragraph>
            <Typography.Paragraph>Рейтинг: {institution.rating}</Typography.Paragraph>
            <Typography.Paragraph>Контакты: {institution.contact_number}</Typography.Paragraph>

            <List>

            </List>
        </>
    )
}