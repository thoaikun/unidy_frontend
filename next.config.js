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
            {
                hostname: 'www.news.cn',
            },
        ],
    },
}

module.exports = nextConfig
