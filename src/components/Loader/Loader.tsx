import React from "react";

import s from "./Loader.module.scss";

interface LoaderProps {
  className?: string;
  size?: string | number;
}

export const Loader = ({ className, size = 44 }: LoaderProps) => {
  const cssSize = typeof size === "number" ? size + "px" : size;

  return (
    <div className={className}>
      <div style={{ fontSize: `calc(${cssSize} / 4)` }} className={s.Loader} />
    </div>
  );
};
