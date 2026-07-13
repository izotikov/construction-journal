import React from 'react'
import { ExclamationMark } from '@shared/ui/svg-react-icons/exclamation-mark/ExclamationMark'
import { cn } from '@shared/model/utils';

type Props = {
  errorDescription: string;
  className?: string;
}

export const ErrorField = ({errorDescription, className}: Props) => {
  return (
    <div className={cn('text-xs text-text-error flex items-center gap-1', className)}>
      <ExclamationMark width={14} height={14} />
      {errorDescription}
    </div>
  )
}