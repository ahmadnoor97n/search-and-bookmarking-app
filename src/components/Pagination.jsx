import React, { useContext } from "react";
import { RepoContext } from "../context/RepoContext";
import { Pagination } from "antd";

export const PaginationComponent = () => {
  const { state, dispatch } = useContext(RepoContext);

  const changePage = (newPage) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: newPage });
  };

  return (
    <Pagination
      defaultCurrent={1}
      current={state?.currentPage}
      pageSize={10}
      total={state?.totalRepos}
      onChange={changePage}
      showSizeChanger={false}
    />
  );
};
