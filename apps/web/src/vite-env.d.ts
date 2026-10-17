/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Contact API origin (https in production, validated by env.schema.ts). */
  readonly VITE_API_URL?: string;
  /** Public site origin, for canonical URLs and Open Graph images. */
  readonly VITE_SITE_URL?: string;
}
