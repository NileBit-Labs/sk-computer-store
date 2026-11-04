/** @type {import('next').NextConfig} */
console.log("NEXT_PUBLIC_SANITY_DATASET from config:", process.env.NEXT_PUBLIC_SANITY_DATASET);

const nextConfig = {
    images: {
        domains: ["cdn.sanity.io"], 
      },
};

module.exports = nextConfig;
