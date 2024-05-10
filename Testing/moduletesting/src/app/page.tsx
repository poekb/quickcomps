"use client";
import * as ts from "typescript";
import React from "react";
import * as babel from "babel-standalone";

function tsCompile(
  source: string,
  options: ts.TranspileOptions | null = null
): string {
  // Default options -- you could also perform a merge, or use the project tsconfig.json
  if (null === options) {
    options = {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.ReactNative,
      },
    };
  }
  return ts.transpileModule(source, options).outputText;
}

function Test({ children, props }: { children: React.ReactNode; props?: {} }) {
  const jsxText = tsCompile(`
 export default function BasicButton({
  children,
  color,
  textColor,
  onClick,
}: {
  children: React.ReactNode;

  color?: string;
  textColor?: string;
  onClick?: () => any;
}) {
  
  //[test, setTest] = useState(false);

  return (
    <div
      onClick={onClick}
      className="wrapper"
      style={
        { "--color": color, "--text-color": textColor } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

`);

  const babelCode =
    babel.transform(jsxText, {
      presets: ["react", "es2017"],
    })?.code || "";

  console.log(babelCode);

  const code = babelCode?.replace('"use strict";', "").trim();
  //const func = new Function("React", `return ${code}`);
  const func = new Function(
    "React",
    `
    var useState = React.useState
    return function BasicButton(_a) {
    [test, setTest] = useState(false);
    var children = _a.children,
        color = _a.color,
        textColor = _a.textColor,
        onClick = _a.onClick;
    return React.createElement(
        "div",
        { onClick: onClick, className: "wrapper", style: { "--color": color, "--text-color": textColor } },
        children
    );
}`
  );
  const App = func(React);
  return (
    <>
      <style>
        {`.wrapper {
  --color: #0084ff;
  --text-color: #fff;
  padding: 1rem;
  background: var(--color);
  width: fit-content;
  border-radius: 1rem;
  color: var(--text-color);
  font-weight: bold;
  margin: 0.25rem;
  box-shadow: #00000065 0.25rem 0.25rem 0.5rem;
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
}
.wrapper:hover {
  scale: 1.05;
}

.wrapper:active {
  box-shadow: #00000065 0.0625rem 0.0625rem 0.1rem;
  translate: 0.125rem 0.125rem;
}
`}
      </style>
      <App {...props}>{children}</App>
    </>
  );
}

async function Testing(route: string) {
  const lib = await import("react");
  const dom = await import("react-dom");
  //console.log(lib);
}

export default function Home() {
  Testing("./layout");
  return (
    <div>
      <Test props={{ color: "#000", textColor: "#9999ff" }}>A</Test>
    </div>
  );
}
