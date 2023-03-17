import React, { useState } from "react";
import styles from "./SplittedTextItem.module.css";

interface SplittedTextItemProps {
  text: string;
  index: number;
  onCopy: () => void;
}

const SplittedTextItem: React.FC<SplittedTextItemProps> = ({
  text,
  index,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
  };

  return (
    <div className={styles.itemContainer}>
      <span className={styles.itemNumber}>{index + 1}.</span>
      <input type="text" value={text} readOnly className={styles.textInput} />
      <button
        onClick={handleCopy}
        className={copied ? styles.buttonCopied : ""}
      >
        {copied ? "✓" : "Copy to Clipboard"}
      </button>
    </div>
  );
};

export default SplittedTextItem;
