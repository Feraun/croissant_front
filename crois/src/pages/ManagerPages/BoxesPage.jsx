import { boxService } from "../../services/boxService"
import TableComponent from "../../components/TableComponent";
import { Button, Space, Modal } from "antd";
import { useState } from "react";
import  CreateBoxModal  from "../../components/CreateBoxModal"
import { useParams } from "react-router-dom";


const columns = [
    { title: "ID", dataIndex: "id", width: 80, sorter: true },
    { title: "Название", dataIndex: "name", sorter: true },
    { title: "Описание", dataIndex: "description"},
    { title: "Цена", dataIndex: "price"},
    { title: "Количество", dataIndex: "quantity"},
];

export default function BoxesPage() {

  const [modal, setModal] = useState(false)
  const { institutionId } = useParams();
  const [tableKey, setTableKey] = useState(0);

  const actions = (record) => (
    <Space>
      <Button type="link" onClick={() => console.log("edit", record)}>Редактировать</Button>
      
      {/* <Button danger type="link" onClick={async () =>{
        await citiesService.delete(record.id);
        loadData();}}>
        Удалить
      </Button> */}
    </Space>
  );

  //const institutionId = 123;

  const refreshTable = () => {
    setTableKey(prev => prev + 1);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleSuccess = () => {
    refreshTable();
  };


  return (
    <>
      <TableComponent
        key={tableKey}
        columns={columns}
        fetchData = {(params) => boxService.getAllBoxes(institutionId, params)}
        actions={actions}
        searchPlaceholder="Поиск по названию"
      />
      <Button
        onClick={() => setModal(true)}
      >
        Добавить бокс
      </Button>

      <Modal
        open={modal}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
      >
        <CreateBoxModal
            onClose={handleCloseModal}
            onSuccess={handleSuccess}
            institutionId={institutionId}
        />
      </Modal>
    </>
  );
}
