import { createClient } from '@base44/sdk';

export const base44 = createClient({
  appId: import.meta.env.VITE_BASE44_APP_ID || "6a07339ebcbdda7eb30e6ca4",
  headers: {
    'api_key': import.meta.env.VITE_BASE44_API_KEY || "52d3473b8d174b0692c6ab60d29f776f"
  }
});