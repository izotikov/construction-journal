import { LazySvg } from "@shared/ui/lazy-svg/LazySvg";
import ExclamationMarkSvg from '@shared/ui/assets/svg/exclamationMark.svg';
import { memo } from "react";

type Props = {
  className?: string;
  width?: number;
  height?: number;
}

export const ExclamationMark = memo(({
  className,
  width = 20,
  height = 20,
}: Props) => {
  return (
    <LazySvg
      name={ExclamationMarkSvg}
      width={width}
      height={height}
      className={className}
    />
  )
},
)