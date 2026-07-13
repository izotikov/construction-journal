import { memo } from 'react';
import PersonIconSvg from '@shared/ui/assets/svg/personIcon.svg';
import { LazySvg } from '@shared/ui/lazy-svg/LazySvg';

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

export const PersonIcon = memo(
  ({
    className,
    width = 40,
    height = 40,
  }: Props) => {
    return (
      <LazySvg
          name={PersonIconSvg}
          width={width}
          height={height}
          className={className}
        />
    );
  },
);
