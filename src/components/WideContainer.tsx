import React from "react";
import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
}

const WideContainer: React.FC<ContainerProps> = ({ children }) => {
  const containerClasses = clsx(
    "mx-auto max-w-9xl items-center justify-between p-6 lg:px-8 pt-24 ",
  );
  return <div className={containerClasses}>{children}</div>;
};

export default WideContainer;
