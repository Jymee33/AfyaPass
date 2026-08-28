/**
 * AfyaPass Sidebar & UI Icons
 * Official SVG icon components sourced directly from uxwing.com
 * (Free for commercial use, no attribution required).
 * Each icon renders as an inline SVG with viewBox="0 0 24 24" and Tailwind `fill-current` / `text-*` support.
 */
import React from 'react';
import { UxwIcon, UxwIconProps } from './UxwIcon';

export type IconComponent = React.ElementType<{ className?: string }>;

/* ─── OVERVIEW ──────────────────────────────────────────────────── */

/** Dashboard — Dashboard Customization Icon (uxwing.com/dashboard-customization-icon/) */
export function IcDashboard(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm15 0h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
    </UxwIcon>
  );
}

/** Activity — Line Chart Icon (uxwing.com/line-chart-icon/) */
export function IcActivity(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
      <path d="M3 3v18h18v-2H5V3z" />
    </UxwIcon>
  );
}

/** Bell — Notification Bell Icon (uxwing.com/notification-bell-icon/) */
export function IcBell(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
    </UxwIcon>
  );
}

/** Home — Home House Icon (uxwing.com/home-house-icon/) */
export function IcHome(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </UxwIcon>
  );
}

/* ─── PATIENTS ──────────────────────────────────────────────────── */

/** Users — Multiple Users Silhouette Icon (uxwing.com/multiple-users-silhouette-icon/) */
export function IcUsers(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </UxwIcon>
  );
}

/** UserPlus — Add New User Icon (uxwing.com/add-new-user-icon/) */
export function IcUserPlus(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </UxwIcon>
  );
}

/** User — Single User Icon (uxwing.com/user-icon/) */
export function IcUser(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </UxwIcon>
  );
}

/** UserCheck — User Verified Icon (uxwing.com/user-verified-icon/) */
export function IcUserCheck(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M9 17l3-2.94c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9l-3-3zm2-5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4M15.47 20.5L12 17l1.4-1.41 2.07 2.08 5.13-5.17 1.4 1.41z" />
    </UxwIcon>
  );
}

/** UserX — Remove User Icon (uxwing.com/remove-user-icon/) */
export function IcUserX(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M14 8c0-2.21-1.79-4-4-4S6 5.79 6 8s1.79 4 4 4 4-1.79 4-4zM2 18v2h12.17c-.11-.31-.17-.65-.17-1 0-.47.09-.92.24-1.34C13.18 16.16 10.53 15 10 15c-2.67 0-8 1.34-8 3zm19.54-4.12l-1.41-1.41-2.12 2.12-2.12-2.12-1.41 1.41 2.12 2.12-2.12 2.12 1.41 1.41 2.12-2.12 2.12 2.12 1.41-1.41-2.12-2.12z" />
    </UxwIcon>
  );
}
