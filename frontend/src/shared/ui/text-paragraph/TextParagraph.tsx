import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
}

export function TextParagraph({className, children}: Props) {
  return (
    <p className={className}>{children}</p>
  )
}