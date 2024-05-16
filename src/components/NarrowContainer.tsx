import React from "react";
import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
}

const NarrowContainer: React.FC<ContainerProps> = ({ children }) => {
  const containerClasses = clsx("mx-auto max-w-6xl  p-6 lg:px-8 ");
  return <div className={containerClasses}>{children}</div>;
};

export default NarrowContainer;
