"use client";
import Editor from "react-simple-code-editor";
import { highlight, languages, Grammar } from "prismjs";
import "./CodeEditor.css";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";

import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import React from "react";

const hightlightWithLineNumbers = (
  code: string,
  grammar: Grammar,
  language: string
) =>
  highlight(code, grammar, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");
// Then register the languages you need

export default function CodeEditor({
  language,
  children, //code
  lineBreaks,
  setCode,
}: {
  language: string;
  children: string;
  lineBreaks?: boolean;
  setCode: (code: string) => any;
}) {
  return (
    <span
      style={
        {
          "--whitespace": lineBreaks ? "break-spaces" : "pre",
        } as React.CSSProperties
      }
    >
      <Editor
        className="editor"
        textareaId="codeArea"
        value={children}
        padding={10}
        onValueChange={(code) => setCode(code)}
        highlight={(code) =>
          hightlightWithLineNumbers(code, languages[language], language)
        }
        style={{
          fontFamily: "monospace",
          fontSize: 14,
          overflow: "visible",
        }}
      />
    </span>
  );
}
