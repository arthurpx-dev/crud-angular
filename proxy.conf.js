// Define a configuração do proxy para o ambiente de desenvolvimento
const PROXY_CONFIG = [
  {
    // Define o caminho de origem que será interceptado pelo proxy
    "/api": {
      // O alvo para onde as solicitações serão redirecionadas
      target: "http://spring-boot:8080",
      // Define se o proxy deve usar HTTPS. No seu caso, você está usando HTTP, então isso é `false`
      secure: false,
      // Altera o cabeçalho `Origin` para que a origem da solicitação pareça ser a mesma do backend
      changeOrigin: true,
    },
  },
];

// Exporta a configuração para que o Angular CLI possa usá-la
module.exports = PROXY_CONFIG;
