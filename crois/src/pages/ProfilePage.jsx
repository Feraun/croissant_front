import { useEffect, useState } from "react";
import { Typography, Avatar, Input, Button, Spin, message } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import styled from "styled-components";
import clientService from "../services/ClientService";

const StyledInput = styled(Input)`
  width: 100%;
  height: 40px;
`;

const StyledLineDiv = styled.div`
  display: flex;
  gap: 24px;
`;

const StyledColumnDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledTypographyParagraph = styled(Typography.Paragraph)`
  margin-bottom: 5px;
  margin-top: 30px;
`;

const SaveButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

function ProfilePage() {


  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await clientService.getUserData();
        const user = res.data;

        setForm({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          contactNumber: user.contactNumber,
        });
      // eslint-disable-next-line no-unused-vars
      } catch (e) {
        message.error("Не удалось загрузить профиль");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleChange = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      //await clientService.update(userId, form);
      message.success("Профиль сохранён");
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      message.error("Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Spin style={{ marginTop: 100 }} />;
  }

  return (
    <>
      <Typography.Title level={3}>
        Добро пожаловать, {form.username}
      </Typography.Title>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={<AntDesignOutlined />}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography.Text strong>
            {form.firstName} {form.lastName}
          </Typography.Text>
          <Typography.Text type="secondary">
            {form.email}
          </Typography.Text>
        </div>
      </div>

      <StyledLineDiv>
        <StyledColumnDiv>
          <StyledTypographyParagraph>Имя</StyledTypographyParagraph>
          <StyledInput
            value={form.firstName}
            onChange={handleChange("firstName")}
          />
        </StyledColumnDiv>

        <StyledColumnDiv>
          <StyledTypographyParagraph>Фамилия</StyledTypographyParagraph>
          <StyledInput
            value={form.lastName}
            onChange={handleChange("lastName")}
          />
        </StyledColumnDiv>
      </StyledLineDiv>

      <StyledLineDiv>
        <StyledColumnDiv>
          <StyledTypographyParagraph>Email</StyledTypographyParagraph>
          <StyledInput
            value={form.email}
            onChange={handleChange("email")}
          />
        </StyledColumnDiv>

        <StyledColumnDiv>
          <StyledTypographyParagraph>Номер телефона</StyledTypographyParagraph>
          <StyledInput
            value={form.contactNumber}
            onChange={handleChange("contactNumber")}
          />
        </StyledColumnDiv>
      </StyledLineDiv>

      <SaveButtonDiv>
        <Button
          type="primary"
          loading={saving}
          onClick={handleSave}
        >
          Сохранить
        </Button>
      </SaveButtonDiv>
    </>
  );
}

export default ProfilePage;
