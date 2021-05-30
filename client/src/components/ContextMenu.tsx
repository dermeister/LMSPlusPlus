import React from "react";
import ReactDOM from "react-dom";
import { Models } from "../models";
import autorender from "./autorender";
import styles from "./ContextMenu.module.css";
import { Overlay } from "./Overlay";

interface ContextMenuProps {
  model: Models.ContextMenu;
  children: React.ReactNode;
}

function onContextMenu(e: React.MouseEvent): void {
  e.preventDefault();
  e.stopPropagation();
}

export function ContextMenu({ model, children }: ContextMenuProps): JSX.Element {
  return autorender(() => {
    if (!model.isOpened) return <></>;

    return ReactDOM.createPortal(
      <Overlay onClose={() => model.close()}>
        <menu
          onContextMenu={onContextMenu}
          className={styles.contextMenu}
          style={{ left: model.x, top: model.y }}
        >
          {children}
        </menu>
      </Overlay>,
      document.getElementById("context-menu") as Element
    );
  });
}
