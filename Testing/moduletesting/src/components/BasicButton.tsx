"use client";
import { useState } from "react";
import styles from "./BasicButton.module.css";

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
  const [toggle, setToggle] = useState(false);
  return (
    <div
      onClick={onClick}
      className={styles.wrapper}
      style={
        { "--color": color, "--text-color": textColor } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
