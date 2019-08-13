module.exports = {
    css: {
      loaderOptions: {
        sass: {
          data: `           
            @import "@/styles/common.scss";
          `
        }
      }
    },
    publicPath: process.env.NODE_ENV === 'production'
      ? '/Vue-eCommerce-App/'
      : '/'
  };