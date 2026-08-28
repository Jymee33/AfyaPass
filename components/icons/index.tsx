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
      <path d="M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.65 0 3 1.35 3 3zM19 6.5C19 4.57 17.43 3 15.5 3S12 4.57 12 6.5h2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5 1.5 1.5H2v2h13.5c1.93 0 3.5-1.57 3.5-3.5zm-.5 4.5H2v2h16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5v2c1.93 0 3.5-1.57 3.5-3.5S20.43 11 18.5 11z" />
    </UxwIcon>
  );
}

/* ─── LABORATORY ──────────────────────────────────────────────────── */

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

/* ─── REFERRALS ──────────────────────────────────────────────────── */

/** Arrow incoming (down-left) — Incoming Arrow Icon (uxwing.com/incoming-arrow-icon/) */
export function IcArrowIncoming(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M4 4v12h2V7.41L18.59 20 20 18.59 7.41 6H16V4H4z" />
    </UxwIcon>
  );
}

/** Arrow outgoing (up-right) — Outgoing Arrow Icon (uxwing.com/outgoing-arrow-icon/) */
export function IcArrowOutgoing(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M6 6v2h8.59L3.29 19.29l1.41 1.41L16 9.41V18h2V6H6z" />
    </UxwIcon>
  );
}

/** Arrow Right — Right Arrow Icon (uxwing.com/right-arrow-icon/) */
export function IcArrowRight(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </UxwIcon>
  );
}

/** Arrows — Swap Horizontal Icon (uxwing.com/swap-horizontal-icon/) */
export function IcArrows(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
    </UxwIcon>
  );
}

/** ArrowLeftRight — alias of IcArrows (swap horizontal) */
export function IcArrowLeftRight(props: UxwIconProps) {
  return <IcArrows {...props} />;
}

/** Arrow Up Down — Sort Vertical Icon (uxwing.com/sort-vertical-icon/) */
export function IcArrowUpDown(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z" />
    </UxwIcon>
  );
}

/** Navigation — Navigation Arrow Icon (uxwing.com/navigation-arrow-icon/) */
export function IcNavigation(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
    </UxwIcon>
  );
}

/* ─── FACILITIES ──────────────────────────────────────────────────── */

/** Hospital — Hospital Icon (uxwing.com/hospital-icon/) */
export function IcHospital(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
    </UxwIcon>
  );
}

/** Building — Office Building Icon (uxwing.com/office-building-icon/) */
export function IcBuilding(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
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

/** Qr — QR Code Icon (uxwing.com/qr-code-icon/) */
export function IcQr(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 19h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm4 0h2v2h-2zm2 2h2v2h-2zm-4 0h2v2h-2zm2-6h2v2h-2zm2 2h2v2h-2z" />
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

/** ShieldCheck — Shield Check Icon (uxwing.com/shield-check-icon/) */
export function IcShieldCheck(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </UxwIcon>
  );
}

/** ShieldAlert — Shield Alert Icon (uxwing.com/shield-alert-icon/) */
export function IcShieldAlert(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 14h2v2h-2v-2zm0-8h2v6h-2V8z" />
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

/** Eye — Eye Visibility Icon (uxwing.com/eye-visibility-icon/) */
export function IcEye(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </UxwIcon>
  );
}

/** EyeOff — Hide Visibility Icon (uxwing.com/hide-visibility-icon/) */
export function IcEyeOff(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
    </UxwIcon>
  );
}

/* ─── ADMINISTRATION ────────────────────────────────────────── */

/** UserCog — User Setting / Gear Icon (uxwing.com/user-setting-icon/) */
export function IcUserCog(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M10 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h9.41c-.26-.4-.41-.86-.41-1.36 0-1.31.94-2.5 2.24-2.79C12.04 15.26 11.07 15 10 15z" />
      <path d="M20.91 14.31c.02-.22.04-.44.04-.67s-.02-.45-.04-.67l1.07-.84c.1-.07.12-.21.06-.32l-1.01-1.75c-.06-.11-.19-.15-.31-.11l-1.26.51c-.26-.2-.54-.37-.85-.49l-.19-1.34c-.02-.12-.13-.22-.25-.22h-2.03c-.13 0-.23.09-.25.22l-.19 1.34c-.31.12-.59.29-.85.49l-1.26-.51c-.12-.04-.25 0-.31.11l-1.01 1.75c-.06.11-.03.24.06.32l1.07.84c-.02.22-.04.45-.04.67s.02.45.04.67l-1.07.84c-.1.07-.12.21-.06.32l1.01 1.75c.06.11.19.15.31.11l1.26-.51c.26.2.54.37.85.49l.19 1.34c.02.12.12.22.25.22h2.03c.13 0 .23-.09.25-.22l.19-1.34c.31-.12.59-.29.85-.49l1.26.51c.12.04.25 0 .31-.11l1.01-1.75c.06-.11.03-.24-.06-.32l-1.07-.84zM17.5 16.16c-.88 0-1.6-.72-1.6-1.6s.72-1.6 1.6-1.6 1.6.72 1.6 1.6-.72 1.6-1.6 1.6z" />
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

/** Database — Database Icon (uxwing.com/database-icon/) */
export function IcDatabase(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z" />
    </UxwIcon>
  );
}

/** Network — Network Hub Icon (uxwing.com/network-hub-icon/) */
export function IcNetwork(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M17 16l-4-4V8.82C14.16 8.4 15 7.3 15 6c0-1.66-1.34-3-3-3S9 4.34 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H3v5h5v-3.05l4-4.2 4 4.2V21h5v-5h-4z" />
    </UxwIcon>
  );
}

/** Wifi — Wifi Signal Icon (uxwing.com/wifi-signal-icon/) */
export function IcWifi(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
    </UxwIcon>
  );
}

/** Save — Save Floppy Icon (uxwing.com/save-floppy-icon/) */
export function IcSave(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
    </UxwIcon>
  );
}

/** History — History Clock Icon (uxwing.com/history-clock-icon/) */
export function IcHistory(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
    </UxwIcon>
  );
}

/** Layers — Layers Stack Icon (uxwing.com/layers-stack-icon/) */
export function IcLayers(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z" />
    </UxwIcon>
  );
}

/* ─── COMMUNICATION ─────────────────────────────────────────── */

/** Phone — Phone Icon (uxwing.com/phone-icon/) */
export function IcPhone(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </UxwIcon>
  );
}

/** Mail — Email Envelope Icon (uxwing.com/email-envelope-icon/) */
export function IcMail(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </UxwIcon>
  );
}

/** MapPin — Location Pin Icon (uxwing.com/location-pin-icon/) */
export function IcMapPin(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </UxwIcon>
  );
}

/** Clock — Clock Time Icon (uxwing.com/clock-time-icon/) */
export function IcClock(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </UxwIcon>
  );
}

/** Print — Printer Icon (uxwing.com/printer-icon/) */
export function IcPrint(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
    </UxwIcon>
  );
}

export * from './controls';
