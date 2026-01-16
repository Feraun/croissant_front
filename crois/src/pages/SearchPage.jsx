import "../App.css"
import AppHeader from "../components/AppHeader/AppHeader";
import AppFooter from "../components/AppFooter/AppFooter";
import { Layout, Input, List} from 'antd';
import AppSider from "../components/AppSider";
import InfoCard from "../components/InfoCard";
import SearchCard from "../components/SearchCard";
import { useState } from "react";
import { data } from "../../data";


function SearchPage() {
  const [searchValue, setSearchValue] = useState("");

  const dataForSearch = data.filter((i) =>
    i.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
        <SearchCard onSearch={setSearchValue} />
        <List
            style={{ marginTop: 24 }}
            grid={{ gutter: 24, column: 4 }}
            dataSource={dataForSearch}
            renderItem={(item) => (
            <List.Item>
                <InfoCard institution={item} />
            </List.Item>
            )}
        />
    </>
  );
}


export default SearchPage;