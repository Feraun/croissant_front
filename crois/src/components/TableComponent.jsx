import { Table, Input, Space, Button } from "antd";
import { useState, useEffect } from "react";

const { Search } = Input;

export default function TableComponent({
  columns,

  fetchData, // функция запроса на сервер

  searchPlaceholder,

  rowKey = "id",

  actions,

  initialPageSize = 5
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: initialPageSize,
    total: 0,
  });

  const [sorter, setSorter] = useState({});
  const [search, setSearch] = useState("");

    const loadData = async (override = {}) => {

        setLoading(true);

        const sortField = override.sorter?.field ?? sorter.field;
        const sortOrder = override.sorter?.order ?? sorter.order;

        const params = {
            page: override.page ?? (pagination.current - 1),
            size: override.pageSize ?? pagination.pageSize,
            name: override.search ?? search,
        };

        if (sortField && sortOrder) {
            params.sortBy = sortField;
            params.direction = sortOrder === "descend" ? "desc" : "asc";
        }

        try {
            const response = await fetchData(params);

            setData(response.data.items ?? []);

            setPagination(p => ({
                ...p,
                total: response.data.totalItems ?? 0,
                current: params.page + 1,
                pageSize: params.size,
            }));
        } catch (err) {
            console.error("Error loading table data:", err);
        } finally {
            setLoading(false);
        }
    };


  // обработка сортировки и пагинации
    const handleTableChange = (newPagination, _, newSorter) => {
        setPagination(prev => ({
            ...prev,
            current: newPagination.current,
            pageSize: newPagination.pageSize,
        }));

        setSorter({
            field: newSorter.field,
            order: newSorter.order,
        });
    };



  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize, sorter.field, sorter.order, search]);

  const mergedColumns = actions
    ? [
        ...columns,
        {
          title: "Действия",
          render: (_, record) => actions(record, loadData),
        },
      ]
    : columns;

  return (
    <>
      <Search
        placeholder={searchPlaceholder}
        allowClear
        onSearch={value => {
          setPagination(p => ({ ...p, current: 1 }));
          setSearch(value);
          loadData({ search: value, page: 0 }); // сразу подгружаем новые данные
        }}
        style={{ width: 300, marginBottom: 16 }}
      />

      <Table
        rowKey={rowKey}
        columns={mergedColumns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
}
