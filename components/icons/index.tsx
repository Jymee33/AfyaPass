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

/* ─── CLINICAL ──────────────────────────────────────────────────── */

/** Stethoscope — Stethoscope Icon (uxwing.com/stethoscope-icon/) */
export function IcStethoscope(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M19 8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m-7 8c-3.31 0-6-2.69-6-6V3h2v7c0 2.21 1.79 4 4 4s4-1.79 4-4V3h2v7c0 3.31-2.69 6-6 6zm7-10c-1.66 0-3 1.34-3 3 0 1.31.84 2.41 2 2.83V14c0 2.76-2.24 5-5 5s-5-2.24-5-5v-1.17c1.16-.42 2-1.52 2-2.83 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 1.31.84 2.41 2 2.83V14c0 3.87 3.13 7 7 7s7-3.13 7-7v-2.17c1.16-.42 2-1.52 2-2.83 0-1.66-1.34-3-3-3z" />
    </UxwIcon>
  );
}

/** FileText — Medical Report Icon (uxwing.com/medical-report-icon/) */
export function IcFileText(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-7-3h2v-2h2v-2h-2v-2h-2v2H9v2h2v2z" />
    </UxwIcon>
  );
}

/** FilePlus — Add Document Icon (uxwing.com/add-document-icon/) */
export function IcFilePlus(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z" />
    </UxwIcon>
  );
}

/** FileKey — Key File Icon (uxwing.com/key-file-icon/) */
export function IcFileKey(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </UxwIcon>
  );
}

/** Pill / Capsule — Capsule Pill Icon (uxwing.com/capsule-pill-icon/) */
export function IcPill(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M4.22 11.29l7.07-7.07c2.34-2.34 6.14-2.34 8.49 0 2.34 2.34 2.34 6.14 0 8.49l-7.07 7.07c-2.34 2.34-6.14 2.34-8.49 0-2.34-2.35-2.34-6.15 0-8.49zm1.41 1.41c-1.56 1.56-1.56 4.1 0 5.66 1.56 1.56 4.1 1.56 5.66 0l2.12-2.12-5.66-5.66-2.12 2.12z" />
    </UxwIcon>
  );
}

/** HeartPulse / Heart Beat — Heart Beat Icon (uxwing.com/heart-beat-icon/) */
export function IcHeartPulse(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      <path d="M3 12h3.5l1.5-3 3 6 2-5 1 2H21" />
    </UxwIcon>
  );
}

/** Heart — Heart Icon (uxwing.com/heart-icon/) */
export function IcHeart(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </UxwIcon>
  );
}

/** Thermometer — Thermometer Icon (uxwing.com/thermometer-icon/) */
export function IcThermometer(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-2h2v2h-2v-2zm0-3h2v2h-2V8zm0-3h2v2h-2V5z" />
    </UxwIcon>
  );
}

/** Wind — Wind Icon (uxwing.com/wind-icon/) */
export function IcWind(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.65 0 3 1.35 3 3zM19 6.5C19 4.57 17.43 3 15.5 3S12 4.57 12 6.5h2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5H2v2h13.5c1.93 0 3.5-1.57 3.5-3.5zm-.5 4.5H2v2h16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5v2c1.93 0 3.5-1.57 3.5-3.5S20.43 11 18.5 11z" />
    </UxwIcon>
  );
}

/* ─── LABORATORY ────────────────────────────────────────────────── */

/** Flask — Lab Research Icon (uxwing.com/lab-research-icon/) */
export function IcFlask(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M9.5 10V4h5v6l4.74 5.17A2.88 2.88 0 0 1 17.12 20H6.88a2.88 2.88 0 0 1-2.12-4.83L9.5 10zM8.5 4h7M6 14c3.5 2 4 0 6 0s2.5 2 6 0" />
    </UxwIcon>
  );
}

/** TestTube — Test Tube Icon (uxwing.com/test-tube-icon/) */
export function IcTestTube(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z" />
    </UxwIcon>
  );
}

/** ClipboardCheck — Clipboard Check Icon (uxwing.com/clipboard-check-icon/) */
export function IcClipboard(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </UxwIcon>
  );
}
