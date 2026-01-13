import { citiesService } from "../../services/CitiesService";
import TableComponent from "../../components/TableComponent";
import { Button, Space } from "antd";

const columns = [
  { title: "ID", dataIndex: "id", width: 80, sorter: true },
  { title: "Название", dataIndex: "name", sorter: true },
];

export default function CityTable() {
  const actions = (record, loadData) => (
    <Space>
      <Button type="link" onClick={() => console.log("edit", record)}>Редактировать</Button>
      <Button danger type="link" onClick={async () =>{
        await citiesService.deleteCity(record.id);
        loadData();}}>
        Удалить
      </Button>
    </Space>
  );

  return (
    <TableComponent
      columns={columns}
      fetchData={citiesService.getAllCities}
      actions={actions}
      searchPlaceholder="Поиск по названию"
    />
  );
}
