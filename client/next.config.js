export default {
  webpack: (config) => {
    return {
      ...config,
      watchOptions: {
        ...config.watchOptions,
        poll: 300
      }
    };
  },
  allowedDevOrigins: ["tixorr.tech", "www.tixorr.tech"],
};
