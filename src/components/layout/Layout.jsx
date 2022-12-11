import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./layout.scss";
import { DarkModeContext } from "../../context/Darkmode";
import { Layout, Button, Switch, Modal } from "antd";
import {
  HomeOutlined,
  GithubOutlined,
  InfoCircleOutlined,
  ShareAltOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer } = Layout;

const HeaderSection = ({ children }) => {
  const navigate = useNavigate();

  const { darkModeBtn, darkModeClass } = useContext(DarkModeContext);
  const defaultChecked =
    localStorage.getItem("darkmode") === "true" ? true : false;

  const confirm = () => {
    Modal.confirm({
      icon: <InfoCircleOutlined style={{ color: "#08c" }} />,
      title: "설문조사를 생성하시겠습니까?",
      onOk() {
        navigate("/create");
      },
      cancelText: "취소",
      okText: "확인",
    });
  };

  return (
    <Layout className={darkModeClass}>
      <Header>
        <div className="header-section">
          <Button
            type="text"
            icon={<HomeOutlined style={{ fontSize: "24px" }} />}
            onClick={() => navigate("/")}
            style={{ fontWeight: "600", fontSize: "20px" }}
          >
            YEJIN
          </Button>
        </div>

        <div>
          <Switch
            defaultChecked={defaultChecked}
            onClick={(e) => darkModeBtn(e)}
          />
          <Button
            style={{ marginLeft: "10px" }}
            type="primary"
            onClick={confirm}
          >
            설문조사 생성
          </Button>
        </div>
      </Header>
      <Content>{children}</Content>
      <Footer>
        <Button type="text" shape="circle" icon={<ShareAltOutlined />} />
        <Button type="text" shape="circle" icon={<InstagramOutlined />} />
        <Button type="text" shape="circle" icon={<GithubOutlined />} />
      </Footer>
    </Layout>
  );
};

export default HeaderSection;
