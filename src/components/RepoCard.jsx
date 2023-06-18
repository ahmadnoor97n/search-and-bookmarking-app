import React from "react";
import { Card, Button } from "antd";
import { StarOutlined } from "@ant-design/icons";

export const RepoCard = ({ repo, onBookmark, isBookmark = false }) => {
  return (
    <Card
      title={repo.name}
      extra={
        <Button icon={<StarOutlined />} onClick={() => onBookmark(repo)}>
          {isBookmark ? "Remove Bookmark" : "Bookmark"}
        </Button>
      }
      style={{ width: "100%", marginBottom: 16 }}
    >
      <p>
        <strong>Owner:</strong> {repo.owner.login}
      </p>
      <p>
        <strong>Description:</strong> {repo.description}
      </p>
      <p>
        <strong>Stars:</strong> {repo.stargazers_count}
      </p>
    </Card>
  );
};
