import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '**', // السماح بأي مصدر
          },
          {
            protocol: 'https',
            hostname: '**', // السماح بأي مصدر
          },
        ],
      },
};

export default withNextIntl(nextConfig);
