import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com', // Эгер сүрөттөр Google Drive'дан болсо
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
