import {
  DeleteFilled,
  EditOutlined,
  GlobalOutlined,
  HeartFilled,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Card, Col } from "antd";
import React, { useState } from "react";
import { EditUserDetail } from "./EditUserDetail";

export const UserDetail = ({ user, deleteUser, handleUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const heartStyle = { color: "#ff0000", fontSize: 20 };
  return (
    <>
      <Col xs={24} sm={24} md={8} lg={8} xl={6} key={user.id}>
        <Card
          cover={
            <img
              alt="example"
              src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
              height={200}
              width={200}
            />
          }
          actions={[
            liked ? (
              <HeartFilled
                key="heart"
                style={heartStyle}
                onClick={() => setLiked(false)}
                data-testid="heart-filled"
              />
            ) : (
              <HeartOutlined
                key="heart"
                style={heartStyle}
                onClick={() => setLiked(true)}
                data-testid="heart-outline"
              />
            ),
            <EditOutlined
              key="edit"
              style={{ fontSize: 18 }}
              onClick={() => setIsOpen(true)}
              data-testid="edit-user"
            />,
            <DeleteFilled
              key="delete"
              style={{ fontSize: 18 }}
              onClick={() => deleteUser(user.id)}
              data-testid="delete-user"
            />,
          ]}
          style={{ margin: 15 }}
        >
          <h3>{user.name}</h3>
          <div className="info">
            <MailOutlined style={{ fontSize: 18 }} />
            <p>{user.email}</p>
          </div>
          <div className="info">
            <PhoneOutlined style={{ fontSize: 18 }} />
            <p>{user.phone}</p>
          </div>
          <div className="info">
            <GlobalOutlined style={{ fontSize: 18 }} />
            <p>{user.website}</p>
          </div>
        </Card>
      </Col>
      <EditUserDetail
        user={user}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        handleUpdate={handleUpdate}
      />
    </>
  );
};
