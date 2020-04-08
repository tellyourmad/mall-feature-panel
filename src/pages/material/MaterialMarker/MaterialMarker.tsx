import React from "react";
import { RouteComponentProps } from "react-router";

import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { Provider } from "mobx-react";
import MaterialStore from "@store/material.store";

import { Divider } from "antd";

import GragScroller from "@src/components/GragScroller/GragScroller";

import Plane from "./Plane/Plane";
import AtomInfo from "./AtomInfo/AtomInfo";
import BasicInfo from "./BasicInfo/BasicInfo";
import Layers from "./Layers/Layers";
import Options from "./Options/Options";

import styles from "./MaterialMarker.module.less";

const store = new MaterialStore(null, {
  minWidth: 100,
  minHeight: 100
});

type TParams = {
  id: string;
};

interface IMaterialMarkerProps extends RouteComponentProps<TParams> {}

export default class MaterialMarker extends React.Component<
  IMaterialMarkerProps
> {
  componentDidMount() {
    console.log(this.props.match.params.id);

    // debugger;
    // var oReq = new XMLHttpRequest();
    // oReq.open(
    //   "GET",
    //   "https://anyshare.moreeasi.com:9029/anyshares3accesstestbucket/088CF110E09640D8B103F24A2D031552/E3158C8ACA7C4A929EFD4931F71D64CD-0?x-eoss-length=16072&userid=AKIAI6IFWLK557WYM23A&Expires=1586316197&Signature=Pdk8HQ3YFMA%2bI%2f2eD1NA8JbRpWo%3d&x-as-userid=a4a0eb5e-700a-11ea-88a5-005056ae1dfe",
    //   true
    // );
    // // oReq.setRequestHeader(
    // //   "Content-type",
    // //   "application/x-www-form-urlencoded; charset=utf-8"
    // // );
    // oReq.responseType = "multipart/form-data";
    // oReq.onload = function(oEvent) {
    //   debugger;
    //   if (this.status === 200) {
    //     const data = this.response;
    //     const url = window.URL.createObjectURL(
    //       new Blob([data], {
    //         type: "application/zip"
    //       })
    //     );
    //     const link = document.createElement("a");
    //     link.style.display = "none";
    //     link.href = url;
    //     link.setAttribute("download", "excel.pdf");
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   }
    // };
    // oReq.send();

    // var request = new XMLHttpRequest();
    // request.open(
    //   "GET",
    //   "https://anyshare.moreeasi.com:9029/anyshares3accesstestbucket/088CF110E09640D8B103F24A2D031552/E3158C8ACA7C4A929EFD4931F71D64CD-0?x-eoss-length=16072&userid=AKIAI6IFWLK557WYM23A&Expires=1586313705&Signature=G5XeyRIwul2YWrUNC7NEXKu6DrY%3d&x-as-userid=a4a0eb5e-700a-11ea-88a5-005056ae1dfe",
    //   true
    // ); //地址替换为自己dat文件的地址
    // request.responseType = "blob";
    // request.onload = function() {
    //   debugger;
    //   var reader = new FileReader();
    //   reader.readAsArrayBuffer(request.response);
    //   reader.onload = function(e) {
    //     debugger;
    //     var DAT_data = e.target?.result;
    //     console.log("DAT_data:" + DAT_data);
    //   };
    // };
    // request.send();

    // TODO ajax获取
    // store.init()
  }

  render() {
    return (
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.materialMarker}>
            {/* 左边 */}
            <div className={styles.left}>
              <Divider>元素添加</Divider>
              <p className={styles.tips}>鼠标点击添加元素</p>
              <Options />
              <Divider>图层</Divider>
              <p className={styles.tips}>可通过鼠标拖动调整图层排序</p>
              <Layers />
            </div>

            {/* 中间 */}
            <GragScroller className={styles.middle}>
              <div>
                <Plane />
              </div>
            </GragScroller>

            {/* 右边 */}
            <div className={styles.right}>
              <Divider>模板编辑</Divider>
              <BasicInfo />
              <Divider>元素添加</Divider>
              <AtomInfo />
            </div>
          </div>
        </DndProvider>
      </Provider>
    );
  }
}
