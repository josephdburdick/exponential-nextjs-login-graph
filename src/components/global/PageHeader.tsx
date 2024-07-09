import { PropsWithChildren } from 'react'

export default function PageHeader(props: PropsWithChildren) {
  return (
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl lg:text-6xl">
      {props.children}
    </h1>
  )
}
