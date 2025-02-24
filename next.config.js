/** @type {import('next').NextConfig} */
console.log("NEXT_PUBLIC_SANITY_DATASET from config:", process.env.NEXT_PUBLIC_SANITY_DATASET);

const nextConfig = {
    images: {
        domains: ["cdn.sanity.io"], 
      },
      typescript: {
        ignoreBuildErrors: true, // Disables TypeScript errors during build
      },
};

module.exports = nextConfig;
