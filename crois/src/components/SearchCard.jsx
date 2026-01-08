import Input from "antd/es/input/Input"
const { Search } = Input;

export default function SearchCard({onSearch}){
    return (
    <Search
      placeholder="Поиск заведения"
      allowClear
      enterButton
      onChange={(e) => onSearch(e.target.value)}
      onSearch={onSearch}
        style={{
            width: "100%",
        }}
    />
  );
}