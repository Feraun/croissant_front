import { adminCitiesService } from "../../../services/AdminCitiesService";
import TableComponent from "../../../components/TableComponent";
import { Button, Space, Modal } from "antd";
import { useState } from "react";
import EditCityModal from "./EditCityModal";

const columns = [
  { title: "ID", dataIndex: "id", width: 80, sorter: true },
  { title: "Название", dataIndex: "name", sorter: true },
  { title: "Регион", dataIndex: "region", sorter: true},
];

export default function CityTable() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  const refreshTable = () => {
    setTableKey(prev => prev + 1);
  };

  const actions = (record, loadData) => (
    <Space>
      <Button
        type="link"
        onClick={async () => {
          const city = await adminCitiesService.getCityById(record.id);
          setSelectedCity(city.data);
          setModalOpen(true);
        }}
      >
        Редактировать
      </Button>

      <Button
        danger
        type="link"
        onClick={async () => {
          await adminCitiesService.deleteCity(record.id);
          loadData();
        }}
      >
        Удалить
      </Button>
    </Space>
  );

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            setSelectedCity(null); // режим создания
            setModalOpen(true);
          }}
        >
          Добавить город
        </Button>
      </Space>

      <TableComponent
        key={tableKey}
        columns={columns}
        fetchData={adminCitiesService.searchCities}
        actions={actions}
        searchPlaceholder="Поиск по названию"
      />

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <EditCityModal
          city={selectedCity}
          onSuccess={() => {
            setModalOpen(false);
            refreshTable();
          }}
        />
      </Modal>
    </>
  );
}
