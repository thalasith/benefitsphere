import React from "react";
import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const containerClasses = clsx(
    "mx-auto max-w-7xl items-center justify-between p-6 lg:px-8 pt-24 min-h-screen",
  );
  return <div className={containerClasses}>{children}</div>;
};

export default Container;
