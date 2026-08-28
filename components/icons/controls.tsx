import React from 'react';
import { UxwIcon, UxwIconProps } from './UxwIcon';

/* ─── TRENDS & CHARTS ───────────────────────────────────────────── */

/** TrendingUp — Trending Up Icon (uxwing.com/trending-up-icon/) */
export function IcTrendingUp(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
    </UxwIcon>
  );
}

/** TrendingDown — Trending Down Icon (uxwing.com/trending-down-icon/) */
export function IcTrendingDown(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z" />
    </UxwIcon>
  );
}

/** BarChart — Bar Chart Icon (uxwing.com/bar-chart-icon/) */
export function IcBarChart(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
    </UxwIcon>
  );
}

/* ─── STATUS ───────────────────────────────────────────────────── */

/** Alert — Warning Triangle Icon (uxwing.com/warning-triangle-icon/) */
export function IcAlert(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </UxwIcon>
  );
}

/** AlertCircle — Error Circle Icon (uxwing.com/error-circle-icon/) */
export function IcAlertCircle(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </UxwIcon>
  );
}

/** CheckCircle — Check Circle Icon (uxwing.com/check-circle-icon/) */
export function IcCheckCircle(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </UxwIcon>
  );
}

/** XCircle — Close Circle Icon (uxwing.com/close-circle-icon/) */
export function IcXCircle(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
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

/** Chevron Right — Chevron Right Icon (uxwing.com/chevron-right-icon/) */
export function IcChevronRight(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
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

/** X — Close Icon (uxwing.com/close-icon/) */
export function IcX(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </UxwIcon>
  );
}

/** Filter — Filter Funnel Icon (uxwing.com/filter-funnel-icon/) */
export function IcFilter(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
    </UxwIcon>
  );
}

/** More — More Horizontal Icon (uxwing.com/more-horizontal-icon/) */
export function IcMore(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </UxwIcon>
  );
}

/** Refresh — Refresh Reload Icon (uxwing.com/refresh-reload-icon/) */
export function IcRefresh(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    </UxwIcon>
  );
}

/** RotateCcw — Rotate Counterclockwise Icon (uxwing.com/rotate-counterclockwise-icon/) */
export function IcRotateCcw(props: UxwIconProps) {
  return (
    <UxwIcon viewBox="0 0 24 24" {...props}>
      <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
    </UxwIcon>
  );
}
