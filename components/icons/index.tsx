/**
 * AfyaPass Sidebar & UI Icons
 * Official SVG icon components sourced directly from uxwing.com
 * (Free for commercial use, no attribution required).
 * Each icon renders as an inline SVG with viewBox="0 0 24 24" and Tailwind `fill-current` / `text-*` support.
 */
import React from 'react';
import { UxwIcon, UxwIconProps } from './UxwIcon';

export type IconComponent = React.ElementType<{ className?: string }>;

/* ─── OVERVIEW ──────────────────────────────────── */

/** Dashboard — Dashboard Customization Icon (uxwing.com/dashboard-customization-icon/) */
export function IcDashboard(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm15 0h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
    </UxwIcon>
  );
}
