/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Enable standalone output so Docker can run only the minimal server bundle.
  output: 'standalone',
}

export default nextConfig
