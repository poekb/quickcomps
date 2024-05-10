"use client";
import CodeEditor from "@/components/CodeEditor";
import ComponentEditor from "@/components/ComponentEditor";
import { useState } from "react";

export default function Editor() {
  const [code, setCode] = useState("");
  return (
    <>
      <ComponentEditor></ComponentEditor>
    </>
  );
}
