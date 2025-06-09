import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    // Only enable turbopack in development if explicitly requested
    turbo: process.env.NODE_ENV === 'development' && process.env.DISABLE_TURBO !== 'true' ? {
      // Turbopack configuration for development
    } : undefined,
  },
  
  // Production optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  
  // Environment variables that should be available to the client
  env: {
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK || 'testnet',
  },
  
  // Output configuration for different deployment targets
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
  
  // Security headers for production
  async headers() {
    if (process.env.NODE_ENV !== 'production') return [];
    
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
