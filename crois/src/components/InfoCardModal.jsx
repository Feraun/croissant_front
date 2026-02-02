import { Typography, Divider, Card, Tag, Tooltip, Button } from "antd";
import styled from "styled-components";
import clientService from "../services/ClientService";

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

const BoxesWrapper = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
`;

const BoxCard = styled(Card)`
  min-width: 220px;
  flex: 0 0 auto;
`;

export default function InfoCardModal({ institution }) {
  if (!institution) return null;

  return (
    <>
      <Typography.Title level={2}>{institution.name}</Typography.Title>
      <Divider />

      <Typography.Paragraph>
        Город: {institution.city?.name || "Не указано"}
      </Typography.Paragraph>
      <Typography.Paragraph>Адрес: {institution.address}</Typography.Paragraph>
      <Typography.Paragraph>Рейтинг: {institution.rating}</Typography.Paragraph>
      <Typography.Paragraph>Контакты: {institution.contactNumber}</Typography.Paragraph>

      {/* Категории */}
      <Divider>Категории</Divider>
      <TagsWrapper>
        {institution.categories && institution.categories.length > 0 ? (
          institution.categories.map((cat) => (
            <Tooltip title={cat.description} key={cat.name}>
              <Tag color="blue" style={{ cursor: "pointer" }}>
                {cat.name}
              </Tag>
            </Tooltip>
          ))
        ) : (
          <Tag color="gray">Нет категорий</Tag>
        )}
      </TagsWrapper>

      {/* Боксы */}
      {institution.boxes && institution.boxes.length > 0 && (
        <>
          <Divider>Боксы</Divider>
          <BoxesWrapper>
            {institution.boxes.map((box, index) => (
              <BoxCard key={index} title={box.name}>
                <Typography.Paragraph>{box.description}</Typography.Paragraph>
                <Typography.Paragraph>Цена: {box.price} ₽</Typography.Paragraph>
                <Typography.Paragraph>Остаток: {box.quantity} </Typography.Paragraph>
                <Button
                  type="primary"
                  onClick={ () => clientService.buyBox(parseInt(box.id, 10))}
                  >
                  Купить
                </Button>
              </BoxCard>
            ))}
          </BoxesWrapper>
        </>
      )}
    </>
  );
}
