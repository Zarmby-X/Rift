/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Habilitar CORS para todas las solicitudes a la API
        source: "/api/urls", // Puedes ajustar la ruta según tu configuración
        "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization, jwt"
        }
      ],
      },
    ];
  },
};

export default nextConfig;
