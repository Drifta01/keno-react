/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Only apply this rule on the server-side
        if (isServer) {
            // Mark sqlite3 as an external module
            config.externals.push('sqlite3');
        }

        // Important: return the modified config
        return config;
    },
};

export default nextConfig;