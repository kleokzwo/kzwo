export const APP_CONFIG = {
    production: false,
    environment: 'WEB',
    bit2: {
      url: 'https://chainz.cryptoid.info/btc2/api.dws',
      apiKey: 'c535662a5103',
      wallet: {
        rootUrl: '',
        details: {
          url: 'https://chainz.cryptoid.info/explorer/address.summary2.dws?coin=btc2',
        },
        topWallet: {
          url: 'https://chainz.cryptoid.info/explorer/index.wallets.dws?coin=btc2',
        },
        info: {
          url: 'https://chainz.cryptoid.info/btc2/api.dws?q=addressinfo&a=',
        },
        price: {
          url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-2&vs_currencies=usd'
        }
      },
    },

    backend: {
      user: {
        url: 'http://localhost:3000/users',
      },
      auth: {
        url: 'http://localhost:3000/auth'
      }
    },
  };
