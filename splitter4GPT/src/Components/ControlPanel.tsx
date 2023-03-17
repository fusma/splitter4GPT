import React, { useState } from "react";
import styles from "./ControlPanel.module.css";

interface ControlPanelProps {
  onPaste: () => void;
  onHideCopied: (hide: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onPaste,
  onHideCopied,
}) => {
  const [hideCopied, setHideCopied] = useState(false);

  const handlePaste = () => {
    onPaste();
  };

  const handleHideCopiedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hide = event.target.checked;
    setHideCopied(hide);
    onHideCopied(hide);
  };

  const isBing = navigator.userAgent.indexOf("Bing") !== -1;

  return (
    <div className={styles.controlPanel}>
      <button onClick={handlePaste}>Paste from Clipboard</button>
      <label>
        <input
          type="checkbox"
          checked={hideCopied}
          onChange={handleHideCopiedChange}
        />
        Hide copied parts
      </label>
      <a href="https://chat.openai.com/chat" target="_blank" rel="noreferrer">
        Open ChatGPT
      </a>
      {isBing && (
        <a href="https://www.bing.com" target="_blank" rel="noreferrer">
          Open Bing
        </a>
      )}
    </div>
  );
};

export default ControlPanel;
