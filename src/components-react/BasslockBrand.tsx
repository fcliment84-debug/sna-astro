import React from "react";

const BasslockBrand = ({ className = "" }: { className?: string }) => (
  <span className={`font-extrabold italic ${className}`} style={{ fontFamily: "'Inter', sans-serif" }}>
    Basslock<sup style={{ fontSize: "40%", verticalAlign: "super", fontStyle: "italic" }}>®</sup>
  </span>
);

export const styledBasslock = (text: string, className?: string): React.ReactNode => {
  const parts = text.split(/(Basslock®)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    part === "Basslock®" ? <BasslockBrand key={i} className={className} /> : part
  );
};

export default BasslockBrand;
