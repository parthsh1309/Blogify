const conf = {
  databaseBaseUrl: String(import.meta.env.VITE_DATABASE_BASE_URL),
  RTEApiKey : String(import.meta.env.VITE_RTE_API_KEY),
  copyLinkUrl : String(import.meta.env.VITE_COPY_BLOG_BASEURL),
};

export default conf;
