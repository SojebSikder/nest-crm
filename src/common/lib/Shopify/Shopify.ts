import * as url from 'url';
import * as crypto from 'crypto';

import { Fetch } from '../Fetch';
/**
 * Shopify api
 */
export class Shopify {
  private _appId: string;
  private _appSecret: string;

  constructor({ appId, appSecret }: { appId: string; appSecret: string }) {
    this._appId = appId;
    this._appSecret = appSecret;
  }

  /**
   * Install shopify app to shopify shop
   * @param appScope
   * @param appStoreToken
   * @param redirect_url
   * @param shop
   * @param appDomain
   * @returns
   */
  install({
    appScope,
    appStoreToken,
    shop,
    appDomain,
  }: {
    appScope: string;
    appStoreToken: string;
    shop: string;
    appDomain: string;
  }) {
    const appId = this._appId;
    const appSecret = this._appSecret;

    shop = shop;
    appScope = appScope;
    appDomain = appDomain;
    appStoreToken = appStoreToken;

    //build the url
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${appId}&scope=${appScope}&redirect_uri=${appDomain}/api/shopify/auth`;

    //Do I have the token already for this store?
    //Check database
    //For tutorial ONLY - check .env variable value
    if (appStoreToken.length > 0) {
      //   res.redirect('/shopify/app?shop=' + shop);
      return '/shopify/app?shop=' + shop;
    } else {
      // go here if you don't have the token yet
      // res.redirect(installUrl);
      return installUrl;
    }
  }
  /**
   * Authtenticate to shopify
   * @param shop
   * @param code
   * @param address_url
   * @returns
   */
  async auth({
    shop,
    code,
    address_url,
  }: {
    shop: string;
    code: string;
    address_url: string;
  }) {
    let securityPass = false;
    const appId = this._appId;
    const appSecret = this._appSecret;
    shop = shop;
    code = code;

    const regex = /^[a-z\d_.-]+[.]myshopify[.]com$/;

    if (shop.match(regex)) {
      console.log('regex is ok');
      securityPass = true;
    } else {
      //exit
      securityPass = false;
    }

    // 1. Parse the string URL to object
    const urlObj = url.parse(address_url);
    // 2. Get the 'query string' portion
    const query = urlObj.search.slice(1);
    // TODO fix this
    if (this.verify(appSecret, query)) {
      //get token
      console.log('get token');
      securityPass = true;
    } else {
      //exit
      securityPass = false;
    }

    if (securityPass && regex) {
      //Exchange temporary code for a permanent access token
      const accessTokenRequestUrl =
        'https://' + shop + '/admin/oauth/access_token';
      const accessTokenPayload = {
        client_id: appId,
        client_secret: appSecret,
        code,
      };

      // request
      //   .post(accessTokenRequestUrl, { json: accessTokenPayload })
      //   .then((accessTokenResponse) => {
      //     const accessToken = accessTokenResponse.access_token;
      //     console.log('shop token ' + accessToken);

      //     // res.redirect('/shopify/app?shop=' + shop);
      //     return '/shopify/app?shop=' + shop;
      //   })
      //   .catch((error) => {
      //     //   res.status(error.statusCode).send(error.error.error_description);
      //     throw error;
      //   });

      try {
        const _header = {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'application/json',
          },
        };
        const request = await Fetch.post(
          accessTokenRequestUrl,
          accessTokenPayload,
          _header,
        );
        if (request) {
          const accessToken = request.data.access_token;
          console.log('shop token ' + accessToken);

          // res.redirect('/shopify/app?shop=' + shop);
          return '/api/shopify?shop=' + shop;
        }
      } catch (error) {
        // res.status(error.statusCode).send(error.error.error_description);
        throw error;
      }
    } else {
      // res.redirect('/installerror');
      return '/installerror';
    }
  }

  verify(appSecret, query) {
    appSecret = appSecret;

    const payload = query;
    const algorithm = 'sha256';

    // HMAX generation for install callback
    const hmac = crypto.createHmac(algorithm, appSecret);
    hmac.update(JSON.stringify(payload));

    // HMAC in hex code
    const isValid = hmac.digest('hex');

    // // HMAC generation for webhook callbacks
    // crypto
    //   .createHmac(algorithm, appSecret)
    //   .update(payload)
    //   // base64 encoded HMAC
    //   .digest('base64');

    return isValid;
  }
  // verify(appSecret, query) {
  //   appSecret = appSecret;
  //   // `payload` is a string with the content to calculate the HMAC digest signature
  //   // and `digest` the signature to verify (compare)
  //   const payload = query;
  //   const digest = '';
  //   const algorithm = 'sha256';
  //   const hmac = crypto.createHmac(algorithm, appSecret);
  //   hmac.update(payload);

  //   const isValid = hmac.digest('hex') === digest;

  //   return isValid;
  // }
}
