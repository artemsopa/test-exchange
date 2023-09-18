/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_EXCHANGE_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
