/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/HomePage',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
