import * as ts from "typescript";
import React from "react";
import * as babel from "babel-standalone";

export default function ComponentPreview({
  code,
  format,
}: {
  code: string;
  format: string;
}) {
  let jsCode = "; " + tsCompile(code);

  const imports = jsCode.match(findImports);

  jsCode = jsCode.replace(findImports, "");
  jsCode = jsCode.replace(findExportDefault, "; return ");
  jsCode = jsCode.replace(findExports, "; ");

  jsCode = jsCode.substring(2);

  return (
    <div className="w-full">
      {jsCode}
      {imports?.map((v: string, i: number) => {
        return (
          <>
            <br></br>
            {i}. - {v}
          </>
        );
      })}
    </div>
  );
}

const findImports = /import.+?[^\\]".+?[^\\]";/g;
const findExportDefault = /;[^"]*export default /;
const findExports = /;[^";]+?export[^"]+?;/g;

function tsCompile(
  source: string,
  options: ts.TranspileOptions | null = null
): string {
  if (null === options) {
    options = {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.ReactNative,
        removeComments: true,
        newLine: ts.NewLineKind.LineFeed,
      },
    };
  }
  return ts.transpileModule(source, options).outputText;
}
