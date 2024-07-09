import { PropsWithChildren } from "react";

export default function PageHeader(props: PropsWithChildren) {
  return (
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl dark:text-white">
      {props.children}
    </h1>
  );
}
