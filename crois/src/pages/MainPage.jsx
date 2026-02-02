// пример адаптации для карточек клиента
import { List, Modal, Input, Pagination, Spin } from "antd";
import { useState, useEffect } from "react";
import InfoCard from "../components/InfoCards/InfoCardClient"
import InfoCardModal from "../components/InfoCardModal";
import clientService from "../services/ClientService";

export default function ClientInstitutionsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);

  const [modalLoading, setModalLoading] = useState(false);

  const loadData = async (override = {}) => {
    setLoading(true);
    const params = {
      page: override.page ?? page - 1,
      size: override.pageSize ?? pageSize,
      name: override.search ?? search,
    };
    try {
      const res = await clientService.getAllInstitutionByClient(params);
      setData(res.data.items);
      setTotal(res.data.totalItems);
      if (override.page) setPage(override.page + 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, search]);

  const openModal = async (id) => {
    setModalLoading(true);
    try {
      const res = await clientService.getInstitutionByIdByClient(id);
      setSelected(res.data); // сохраняем полный объект заведения
    } catch (err) {
      console.error("Ошибка при загрузке заведения:", err);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <>
      <Input.Search
        placeholder="Поиск"
        allowClear
        enterButton
        style={{ marginBottom: 24, width: 300 }}
        onSearch={value => {
          setSearch(value);
          setPage(1);
          loadData({ search: value, page: 0 });
        }}
      />

      {loading ? (
        <Spin style={{ marginTop: 100 }} />
      ) : (
        <List
          grid={{ gutter: 24, column: 4 }}
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id} style={{ display: "flex", justifyContent: "center" }}>
                <InfoCard 
                  institution={item}
                  onClick={() => openModal(item.id)} 
                />
            </List.Item>
          )}
        />
      )}

      <Pagination
        current={page}
        pageSize={pageSize}
        total={total}
        onChange={setPage}
        style={{ marginTop: 24, textAlign: "center" }}
      />

      <Modal
        open={!!selected}
        onCancel={() => setSelected(null)}
        footer={null}
      >
        {modalLoading ? (
          <Spin tip="Загрузка..." />
        ) : (
          <InfoCardModal institution={selected} />
        )}
      </Modal>
    </>
  );
}
