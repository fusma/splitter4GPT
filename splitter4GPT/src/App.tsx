import React, { useState } from "react";
import SplittedTextItem from "./Components/SplittedTextItem";
import styles from "./App.module.css";

const splitText = (text: string, maxLength: number): string[] => {
  const result = [];
  for (let i = 0; i < text.length; i += maxLength) {
    result.push(text.slice(i, i + maxLength));
  }
  return result;
};

const TextSplitter: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [splittedTexts, setSplittedTexts] = useState<string[]>([]);
  const [hideCopied, setHideCopied] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleSplitText = () => {
    setSplittedTexts(splitText(inputText, 2000));
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    setInputText(text);
  };

  const toggleHideCopied = () => {
    setHideCopied(!hideCopied);
  };

  const reset = () => {
    setInputText("");
    setSplittedTexts([]);
  };

  const shareApp = () => {
    const shareData = {
      title: "ChatGPT Text Splitter",
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  const isBing = navigator.userAgent.includes("Bing");

  return (
    <div className={styles.container}>
      <div className={styles.controlPanel}>
        <button onClick={pasteFromClipboard}>Paste From Clipboard</button>
        <label>
          <input
            type="checkbox"
            checked={hideCopied}
            onChange={toggleHideCopied}
          />
          コピーした部分は表示しない(Hide copied parts)
        </label>
        <button
          onClick={() => window.open("https://chat.openai.com/chat", "_blank")}
        >
          Open ChatGPT
        </button>
        {isBing && (
          <button onClick={() => window.open("https://www.bing.com", "_blank")}>
            Open Bing
          </button>
        )}
        <button onClick={reset}>Reset</button>
      </div>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        rows={10}
        className={styles.textArea}
      ></textarea>
      <button onClick={handleSplitText}>Split Text</button>
      {splittedTexts.map((text, index) => (
        <SplittedTextItem
          key={index}
          index={index}
          text={text}
          onCopy={() => handleCopyToClipboard(text)}
        />
      ))}
      <div className={styles.footer}>
        <button onClick={shareApp}>Share App</button>
        <span>
          Created by{" "}
          <a
            href="https://twitter.com/OpenKinako"
            target="_blank"
            rel="noopener noreferrer"
          >
            @OpenKinako
          </a>{" "}
          with GPT-4
        </span>
      </div>
    </div>
  );
};

export default TextSplitter;
