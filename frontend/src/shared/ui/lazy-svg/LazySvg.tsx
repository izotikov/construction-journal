import type { CSSProperties } from 'react';
import { ReactSVG } from 'react-svg';

interface LazySvgProps {
  name: string;
  className?: string;
  width?: number;
  style?: CSSProperties;
  height?: number;
  onClick?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
}

export const LazySvg = ({
  name,
  className,
  style,
  height,
  width,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: LazySvgProps) => {
  return (
    <ReactSVG
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      src={name}
      className={className}
      style={style}
      beforeInjection={(svg) => {
        if (!width || !height) return;
        svg.setAttribute('width', `${width}px`);
        svg.setAttribute('height', `${height}px`);
      }}
    />
  );
};
