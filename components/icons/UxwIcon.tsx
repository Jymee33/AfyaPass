import React from 'react';
import { cn } from '@/lib/utils';

export interface UxwIconProps extends React.SVGAttributes<SVGElement> {
  size?: number | string;
}

/**
 * Base wrapper for UXWing SVG icons.
 * All icons accept className for Tailwind coloring via `fill-current` / `text-*`.
 */
export function UxwIcon({
  children,
  viewBox = '0 0 24 24',
  size = '1em',
  className,
  ...props
}: UxwIconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      fill="currentColor"
      className={cn('shrink-0', className)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}
