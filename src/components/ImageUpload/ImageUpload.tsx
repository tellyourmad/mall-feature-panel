import React from "react";
import { Upload, message, Button } from "antd";
import {
  DeleteOutlined,
  LoadingOutlined,
  UploadOutlined
} from "@ant-design/icons";
import styles from "./ImageUpload.module.less";
import { UploadChangeParam } from "antd/lib/upload";

type ImageUrl = string | null | ArrayBuffer;

function getBase64(
  img: File | Blob | undefined,
  callback: (imgUrl: ImageUrl) => void
) {
  if (typeof img === "undefined") {
    callback(null);
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: { type: string; size: number }) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

interface IImageUploadProps {
  name: string;
  value?: any;
  onChange?: (imageUrl: ImageUrl) => void;
}

interface IImageUploadState {
  loading: boolean;
}
export default class ImageUpload extends React.Component<
  IImageUploadProps,
  IImageUploadState
> {
  state = {
    loading: false
  };

  handleChange = (info: UploadChangeParam) => {
    switch (info.file.status) {
      case "uploading":
        this.setState({ loading: true });
        return;
      case "done":
        getBase64(info.file.originFileObj, imageUrl => {
          this.setState({ loading: false });
          this.props.onChange && this.props.onChange(imageUrl || "");
        });
        break;
    }
  };

  componentWillUnmount() {
    // TODO 组件被销毁时要cancel掉“上传ajax”
  }

  render() {
    const { loading } = this.state;
    const { name, value } = this.props;
    if (loading) {
      return (
        <Button disabled>
          <LoadingOutlined /> 上传中
        </Button>
      );
    }
    if (value) {
      return (
        <Button
          danger
          onClick={() => this.props.onChange && this.props.onChange("")}
        >
          <DeleteOutlined /> 点击删除
        </Button>
      );
    }
    return (
      <Upload
        name={name}
        showUploadList={false}
        className={styles.imageUpload}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange.bind(this)}
      >
        <Button>
          <UploadOutlined /> 点击上传
        </Button>
      </Upload>
    );
  }
}
