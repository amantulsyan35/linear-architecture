/** @type {import('next').NextConfig} */

export default {
  reactStrictMode: true,
  webpack: (config) => {
    if (!config.experiments) {
      config.experiments = {};
    }
    config.experiments.topLevelAwait = true;
    return config;
  },
};
