import React from "react";
import clsx from "clsx";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const baseClasses = "px-20 py-6";
  const combinedClasses = clsx(baseClasses, className);
  return <main className={combinedClasses}>{children}</main>;
};

export default Container;
