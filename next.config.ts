import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
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
