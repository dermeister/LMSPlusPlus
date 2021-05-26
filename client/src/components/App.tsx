import React from "react";

import autorender from "./autorender";
import { AppModel } from "../models/AppModel";
import { Activities } from "./Activities";
import { Workspace } from "./Workspace";
import styles from "./App.module.css";

interface AppProps {
  model: AppModel;
}

function content(model: AppModel): JSX.Element {
  return (
    <>
      <Activities model={model.activities} />
      <Workspace model={model} />
    </>
  );
}

export function App({ model }: AppProps): JSX.Element {
  return autorender(() => <div className={styles.app}>{content(model)}</div>);
}
