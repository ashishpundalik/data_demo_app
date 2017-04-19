import ServerConfig from '../config/ServerConfig.js';

class HttpHelper {
  static get(apiMethod, params) {
    let urlWithParams = HttpHelper.constructUrlFromParams(apiMethod, params);
    return fetch(urlWithParams).then((result) => {
      if(result.ok) {
        return result.json();
      }
      throw new Error({
        statusCode: result.status
      })
    });
  }

  static constructUrlFromParams(apiMethod, params) {
    let reconstructedUrl = `${ServerConfig.httpUrl}/${apiMethod}`;
    for(let key in params) {
      reconstructedUrl += `/${key}=${params[key]}`;
    }
    return reconstructedUrl;
  }
}

export default HttpHelper;
