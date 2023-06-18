import React, { useContext, useCallback } from "react";
import { RepoContext } from "../context/RepoContext";
import { RepoCard } from "./RepoCard";
import { Spin } from "antd";
import { EmptyState } from "./EmptyState";

export const RepoList = ({ isBookmark }) => {
  const { state, dispatch } = useContext(RepoContext);

  const bookmarkRepo = useCallback(
    (repo) => {
      dispatch({ type: "SET_BOOKMARKS", payload: [...state.bookmarks, repo] });
    },
    [state, dispatch]
  );

  const removeBookmark = useCallback(
    (id) => {
      dispatch({
        type: "SET_BOOKMARKS",
        payload: state?.bookmarks.filter((item) => item?.id !== id),
      });
    },
    [state, dispatch]
  );

  const isBookmarked = useCallback(
    (id) => {
      return state?.bookmarks.some((item) => item?.id === id);
    },
    [state]
  );

  if (state?.isLoading) {
    return (
      <div className="loading-container">
        <Spin />
      </div>
    );
  }

  const reposList = isBookmark ? state?.bookmarks : state?.repos;

  return (
    <ul className="repo-list">
      {reposList.length ? (
        reposList.map((repo) => (
          <RepoCard
            repo={repo}
            key={repo.id}
            onBookmark={
              isBookmarked(repo.id)
                ? () => removeBookmark(repo.id)
                : () => bookmarkRepo(repo)
            }
            isBookmark={isBookmarked(repo.id)}
          />
        ))
      ) : (
        <EmptyState />
      )}
    </ul>
  );
};
