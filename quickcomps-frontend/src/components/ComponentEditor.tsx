"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import { LogoCss, LogoJS, LogoTS } from "./Logos";
import ComponentPreview from "./ComponentPreview";

export default function ComponentEditor() {
  const [code, setCode] = useState(`//Write your code here:`);

  const [selected, setSelected] = useState(0);

  const [codeHeight, setCodeHeight] = useState(10 + 21 * 20);
  return (
    <>
      <div className="w-full relative">
        <div className="w-full min-h-9 bg-zinc-800 flex flex-row justify-start items-end gap-1 overflow-x-auto pl-2 pr-2">
          <FileMarker
            name="Button"
            format="tsx"
            selected={selected === 0}
            select={() => setSelected(0)}
          ></FileMarker>
          <FileMarker
            name="Button.module"
            format="css"
            selected={selected === 1}
            select={() => setSelected(1)}
          ></FileMarker>
          <FileMarker
            name="Button"
            format="jsx"
            selected={selected === 2}
            select={() => setSelected(2)}
          ></FileMarker>
        </div>
        <div
          className=" bg-zinc-900 overflow-hidden"
          style={{ height: codeHeight }}
        >
          <div
            className="overflow-y-auto overflow-x-auto"
            style={{ height: codeHeight }}
          >
            <CodeEditor
              lineBreaks={false}
              language="tsx"
              setCode={(code) => setCode(code)}
            >
              {code}
            </CodeEditor>
          </div>
        </div>
        <HeightDragBar
          codeHeight={codeHeight}
          setCodeHeight={setCodeHeight}
        ></HeightDragBar>
        <ComponentPreview code={code} format="tsx"></ComponentPreview>
      </div>
    </>
  );
}

function HeightDragBar({
  codeHeight,
  setCodeHeight,
}: {
  codeHeight: number;
  setCodeHeight: Dispatch<SetStateAction<number>>;
}) {
  const [dragging, setDragging] = useState(false);
  const [prev, setPrev] = useState(0);

  const shift = (ev: MouseEvent) => {
    if (dragging) {
      setCodeHeight(Math.max(codeHeight + ev.clientY - prev, 50));
    }

    setPrev(ev.clientY);
  };

  const stopDragging = () => {
    setDragging(false);

    setCodeHeight(Math.round((codeHeight - 10) / 21) * 21 + 10);
  };

  useEffect(() => {
    document.addEventListener("mousemove", shift);

    return () => {
      document.removeEventListener("mousemove", shift);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  return (
    <div
      className="w-full h-3 bg-zinc-800 transition-all hover:bg-zinc-600 select-none cursor-s-resize"
      onMouseDown={() => setDragging(true)}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      {dragging && <div className=" absolute inset-0"></div>}
    </div>
  );
}

const formatToLogo = new Map([
  ["jsx", LogoJS],
  ["tsx", LogoTS],
  ["css", LogoCss],
]);

function FileMarker({
  name,
  format,
  selected,
  select,
}: {
  name: string;
  format: string;
  selected?: boolean;
  select: () => any;
}) {
  const LogoElement = formatToLogo.get(format);
  return (
    <>
      <div
        className={
          "flex items-center bg-zinc-700 h-9 hover:bg-zinc-900 transition-all rounded-t-xl cursor-pointer " +
          (selected && "!bg-zinc-900 ")
        }
      >
        <div
          onClick={select}
          className="flex flex-row h-full gap-3 p-2 pb-1 items-center"
        >
          {typeof LogoElement !== "undefined" && (
            <LogoElement height="1rem"></LogoElement>
          )}
          <div className=" text-zinc-200 font-bold text-base">
            {name + "." + format}
          </div>
        </div>
      </div>
    </>
  );
}
