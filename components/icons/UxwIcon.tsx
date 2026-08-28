import React from 'react';
import { cn } from '@/lib/utils';

export interface UxwIconProps extends React.SVGAttributes<SVGElement> {
  size?: number | string;
}

/**
 * Base wrapper for UXWing SVG icons.
 * Icons from uxwing.com — free for commercial use, no attribution required.
 * Color via Tailwind `text-*` classes using fill="currentColor".
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
      className={cn('shrink-0 inline-block', className)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}
