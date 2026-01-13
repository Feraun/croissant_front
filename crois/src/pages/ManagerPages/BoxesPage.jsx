import { boxService } from "../../services/boxService"
import TableComponent from "../../components/TableComponent";
import { Button, Space, Modal } from "antd";
import { useState } from "react";
import  CreateBoxModal  from "../../components/CreateBoxModal"

const columns = [
  { title: "ID", dataIndex: "id", width: 80, sorter: true },
  { title: "Название", dataIndex: "name", sorter: true },
    { title: "Описание", dataIndex: "description"},
    { title: "Цена", dataIndex: "price"},
    { title: "Статус", dataIndex: "boxStatus"},
    //{ title: "Покупатель", dataIndes: "owner"},
];

export default function BoxesPage() {

  const [modal, setModal] = useState(false)
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

  return (
    <>
      <TableComponent
        key={tableKey}
        columns={columns}
        fetchData = {(params) => boxService.getAllBoxes(1, params)}
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
        onCancel={() => setModal(false)}
        footer={null}
        destroyOnClose
      >
        <CreateBoxModal
          onClose={() => setModal(false)}
          onSuccess={refreshTable}
        />
      </Modal>
    </>
  );
}
