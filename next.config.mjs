/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@uploadthing/react", "uploadthing"],
	experimental: {
		optimizePackageImports: ['react-icons', 'lucide-react', 'framer-motion'],
	},
};

export default nextConfig;
