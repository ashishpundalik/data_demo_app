class HttpHelper {
  static get(url, params) {
    let urlWithParams = HttpHelper.constructUrlFromParams(url, params);
    return fetch(urlWithParams).then((result) => {
      if(result.ok) {
        return result.json();
      }
      throw new Error({
        statusCode: result.status
      })
    });
  }

  static constructUrlFromParams(url, params) {
    let reconstructedUrl = url;
    for(let key in params) {
      reconstructedUrl += `/${key}=${params[key]}`;
    }
    return reconstructedUrl;
  }
}

export default HttpHelper;
