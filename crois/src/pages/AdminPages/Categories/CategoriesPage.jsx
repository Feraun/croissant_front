import adminCategoriesOfInstitutionService from "../../../services/AdminCategoriesService";
import TableComponent from "../../../components/TableComponent";
import { Button, Space, Modal } from "antd";
import { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";

const columns = [
  { title: "ID", dataIndex: "id", width: 80, sorter: true },
  { title: "Название", dataIndex: "name", sorter: true },
  { title: "Описание", dataIndex: "description", sorter: true},
];

export default function CityTable() {
  const [selectedCategory, setSelectedCategory] = useState(null);
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
          const city = await adminCategoriesOfInstitutionService.getCategoryById(record.id);
          setSelectedCategory(city.data);
          setModalOpen(true);
        }}
      >
        Редактировать
      </Button>

      <Button
        danger
        type="link"
        onClick={async () => {
          await adminCategoriesOfInstitutionService.deleteCategory(record.id);
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
            setSelectedCategory(null); // режим создания
            setModalOpen(true);
          }}
        >
          Добавить категорию
        </Button>
      </Space>

      <TableComponent
        key={tableKey}
        columns={columns}
        fetchData={adminCategoriesOfInstitutionService.searchCategories}
        actions={actions}
        searchPlaceholder="Поиск по названию"
      />

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <EditCategoryModal
          category={selectedCategory}
          onSuccess={() => {
            setModalOpen(false);
            refreshTable();
          }}
        />
      </Modal>
    </>
  );
}
