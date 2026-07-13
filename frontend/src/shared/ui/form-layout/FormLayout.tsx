import React from 'react'
import { FieldSet } from '@shared/ui/shadcn/field/Field'
import { cn } from '@shared/model/utils';

type Props = {
  children: React.ReactNode,
  className?: string;
}

export default function FormLayout({children, className}: Props) {
  return (
     <div className="bg-surface-contrast border border-surface rounded-2xl p-8 shadow-2xl shadow-black/50">
      <FieldSet className={cn('space-y-4 ', className)}>{children}</FieldSet>
     </div>
    
  )
}