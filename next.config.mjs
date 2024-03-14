/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Habilitar CORS para todas las solicitudes a la API
        source: "/api/urls", // Puedes ajustar la ruta según tu configuración
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Permitir solicitudes desde cualquier origen
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,DELETE,PUT", // Métodos HTTP permitidos
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization, jwt", // Encabezados permitidos
          },
        ],
      },
    ];
  },
};

export default nextConfig;
