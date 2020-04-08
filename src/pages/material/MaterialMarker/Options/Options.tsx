import React from "react";
import options from "../Atom/Atom";
import Dragger from "@components/magic/Dragger/Dragger";

import styles from "./Options.module.less";

export default function Options() {
  return (
    <div className={styles.options}>
      {options.map(item => (
        <div key={item.type} className={styles.option}>
          <div className={styles.describe}>
            <p className={styles.text}>{item.name}</p>
          </div>
          <Dragger source="MaterialMarker" type={item.type}>
            <item.preview />
          </Dragger>
        </div>
      ))}
    </div>
  );
}
