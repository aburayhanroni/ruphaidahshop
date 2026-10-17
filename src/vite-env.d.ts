/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_TIMEZONE?: string;
  readonly VITE_APP_DEFAULT_LOCALE?: string;
  readonly VITE_APP_CURRENCY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
