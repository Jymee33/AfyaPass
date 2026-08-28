/**
 * AfyaPass Sidebar & UI Icons
 * Official SVG icon components sourced directly from uxwing.com
 * (Free for commercial use, no attribution required).
 * Each icon renders as an inline SVG with viewBox="0 0 24 24" and Tailwind `fill-current` / `text-*` support.
 */
import React from 'react';
import { UxwIcon, UxwIconProps } from './UxwIcon';

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

/* ─── LABORATORY ────────────────────────────────────────────────── */

/** Flask — Lab Research Icon (uxwing.com/lab-research-icon/) */
export function IcFlask(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M9.5 10V4h5v6l4.74 5.17A2.88 2.88 0 0 1 17.12 20H6.88a2.88 2.88 0 0 1-2.12-4.83L9.5 10zM8.5 4h7M6 14c3.5 2 4 0 6 0s2.5 2 6 0" />
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

/* ─── REFERRALS ─────────────────────────────────────────────────── */

/** Arrow incoming (down-left) */
export function IcArrowIncoming(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M20 4v12h-2V7.41L5.41 20 4 18.59 16.59 6H8V4h12z" transform="rotate(90 12 12)" />
    </UxwIcon>
  );
}

/** Arrow outgoing (up-right) */
export function IcArrowOutgoing(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M6 6v2h8.59L3.29 19.29l1.41 1.41L16 9.41V18h2V6H6z" />
    </UxwIcon>
  );
}

/* ─── FACILITIES ────────────────────────────────────────────────── */

/** Hospital — Hospital Icon (uxwing.com/hospital-icon/) */
export function IcHospital(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
    </UxwIcon>
  );
}

/* ─── CARD ──────────────────────────────────────────────────────── */

/** Credit / ID Card — Credit Card Icon (uxwing.com/credit-card-icon/) */
export function IcCard(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
    </UxwIcon>
  );
}

/* ─── PRIVACY & SECURITY ────────────────────────────────────────── */

/** Shield — Shield Icon (uxwing.com/shield-icon/) */
export function IcShield(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
    </UxwIcon>
  );
}

/** ScrollText / Log File — Log File Icon (uxwing.com/log-file-icon/) */
export function IcScrollText(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </UxwIcon>
  );
}

/* ─── ADMINISTRATION ────────────────────────────────────────────── */

/** UserCog — User Setting / Gear Icon */
export function IcUserCog(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" transform="scale(0.5) translate(24, 24)" />
    </UxwIcon>
  );
}

/** Lock — Lock Icon (uxwing.com/lock-icon/) */
export function IcLock(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </UxwIcon>
  );
}

/** Gear / Settings — Gear Setting Icon (uxwing.com/gear-setting-icon/) */
export function IcSettings(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </UxwIcon>
  );
}

/* ─── UI CONTROLS ───────────────────────────────────────────────── */

/** Chevron Left */
export function IcChevronLeft(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </UxwIcon>
  );
}

/** Chevron Up */
export function IcChevronUp(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
    </UxwIcon>
  );
}

/** Check */
export function IcCheck(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </UxwIcon>
  );
}

/** Plus */
export function IcPlus(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </UxwIcon>
  );
}

/** Search */
export function IcSearch(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </UxwIcon>
  );
}

/** Menu (hamburger) */
export function IcMenu(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </UxwIcon>
  );
}
