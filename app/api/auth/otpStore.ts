export interface OtpRecord {
  otp: string;
  expiresAt: number;
}

const g = globalThis as unknown as {
  __hopestOtpStore?: Map<string, OtpRecord>;
};

if (!g.__hopestOtpStore) {
  g.__hopestOtpStore = new Map<string, OtpRecord>();
}

export const otpStore = g.__hopestOtpStore;
