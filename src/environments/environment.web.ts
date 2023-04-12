export class Environment {
    root: {
        production: false;
        apiUrl: 'http://localhost:3000/api';
        authTokenKey: 'auth_token';
        environment: 'WEB';
    };

    /**
     * Docs: https://chainz.cryptoid.info/api.dws
     * https://chainz.cryptoid.info/btc2/api.dws?q=totalbc
     */

    bit2: {
        url: 'https://chainz.cryptoid.info/btc2/api.dws';
        wallet: {
            rootUrl: '';
            details: {
                url: 'https://chainz.cryptoid.info/explorer/address.summary2.dws?coin=btc2';
            };
            topWallet: {
                url: 'https://chainz.cryptoid.info/explorer/index.wallets.dws?coin=btc2';
            };
            info: {
                url: 'https://chainz.cryptoid.info/btc2/api.dws?q=addressinfo&a=';
            };
        };
    };

    backend: {
      user: {
        url: 'http://localhost:3000/users';
      };
    };

  };
