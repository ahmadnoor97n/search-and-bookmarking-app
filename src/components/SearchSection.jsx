import React, { useContext, useState } from "react";
import { Input } from "antd";
import { RepoContext } from "../context/RepoContext";

export const SearchBar = () => {
  const { Search } = Input;
  const { state, dispatch } = useContext(RepoContext);
  const [input, setInput] = useState("");

  const handleSearch = (value) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: value });
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  };
  return (
    <Search
      placeholder="Search for GitHub repositories"
      enterButton="Search"
      size="large"
      onSearch={handleSearch}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      loading={state?.isLoading}
    />
  );
};
