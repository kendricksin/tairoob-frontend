interface ImportMetaEnv {
    readonly VITE_DB_SERVER: string
    readonly VITE_API_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }