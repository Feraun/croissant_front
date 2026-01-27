import { useState, useEffect } from "react";
import {Input, Spin, List, Pagination} from "antd";
import InfoCardManager from "../../components/InfoCards/InfoCardManager";
import managerService from "../../services/ManagerService";
import { useNavigate } from "react-router-dom";



export default function MyInstitutionsPage(){

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  //const [selected, setSelected] = useState(null);

  //const [modalLoading, setModalLoading] = useState(false);

  const loadData = async (override = {}) => {
    setLoading(true);
    const params = {
      page: override.page ?? page - 1,
      size: override.pageSize ?? pageSize,
      name: override.search ?? search,
    };
    try {
      const res = await managerService.getMyInstitutions(params);
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
                <InfoCardManager
                  institution={item}
                  onClick={() => navigate(`/main/myInstitutions/${item.id}/boxes`)}
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
    </>
  );

}