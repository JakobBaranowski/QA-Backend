module.exports = ({ env }) => ({
  email: {
    provider: 'smtp',
    providerOptions: {
      host: 'smtp.gmail.com',
      port: 465, //SMTP Port
      secure: true,
      username: 'jakob@baranowski.cc',
      password: env('GMAIL_PASS'),
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    },
    settings: {
      from: 'dev@baranowski.cc',
      replyTo: 'dev@baranowski.cc',
    },
  },

  upload: {
    provider: 'google-cloud-storage',
    providerOptions: {
      bucketName: 'eu.artifacts.quaralender-298309.appspot.com',
      publicFiles: false,
      uniform: false,
      basePath: '',
    },
  },

});