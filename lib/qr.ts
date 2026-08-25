import { QrPayload } from '@/types';

/**
 * Utility functions for AfyaPass QR Code parsing and validation.
 * 
 * SECURITY MANDATE:
 * - QR codes MUST NEVER contain patient medical records, personal identity details,
 *   allergies, or diagnosis history.
 * - QR codes only contain an opaque AfyaPass Reference ID and cryptographic signature.
 * - Scanning a QR code does NOT automatically unlock records without authorized 
 *   healthcare worker authentication and active patient consent.
 */

export function parseAfyaPassQrCode(qrRawContent: string): { success: boolean; payload?: QrPayload; error?: string } {
  try {
    if (!qrRawContent) {
      return { success: false, error: 'Empty QR code content' };
    }

    // Handle standard URL format: https://afyapass.kenya.gov.ke/scan?id=AFY-KE-MUR-2026-98421
    if (qrRawContent.startsWith('http://') || qrRawContent.startsWith('https://')) {
      const url = new URL(qrRawContent);
      const patientId = url.searchParams.get('id');
      if (patientId) {
        return {
          success: true,
          payload: {
            v: 1,
            id: patientId,
            sig: url.searchParams.get('sig') || 'demo-signature',
            exp: Date.now() + 3600000,
          },
        };
      }
    }

    // Handle JSON format: {"v":1,"id":"AFY-KE-MUR-2026-98421","sig":"..."}
    if (qrRawContent.trim().startsWith('{')) {
      const parsed = JSON.parse(qrRawContent) as QrPayload;
      if (!parsed.id) {
        return { success: false, error: 'Invalid QR JSON: Missing AfyaPass Patient ID' };
      }
      return { success: true, payload: parsed };
    }

    // Handle direct AfyaPass ID string format: AFY-KE-MUR-2026-98421
    if (qrRawContent.startsWith('AFY-')) {
      return {
        success: true,
        payload: {
          v: 1,
          id: qrRawContent.trim(),
          sig: 'demo-signature',
          exp: Date.now() + 3600000,
        },
      };
    }

    return { success: false, error: 'Unrecognized AfyaPass QR code format' };
  } catch (err) {
    return { success: false, error: `Failed to parse QR code: ${(err as Error).message}` };
  }
}

export function generateDemoQrString(patientId: string): string {
  return `https://afyapass.health/scan?id=${encodeURIComponent(patientId)}&v=1&sig=demo_hmac_sig`;
}
