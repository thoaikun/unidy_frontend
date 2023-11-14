/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'img.evbuc.com',
            },
            {
                hostname: 'cdn-jimnf.nitrocdn.com',
            },
        ],
    },
}

module.exports = nextConfig
