import originJsonp from 'jsonp';

let jsonp = (url: any, data: any, option: any) => {
  return new Promise((resolve, reject) => {
    originJsonp(buildUrl(url, data), option, (err: any, data: any) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

function buildUrl(url: any, data: any) {
  let params = [];
  for (let k in data) {
    params.push(`${k}=${data[k]}`);
  }
  let param = params.join('&');
  if (url.indexOf('?') === -1) {
    url += '?' + param;
  } else {
    url += '&' + param;
  }
  return url;
}

export default jsonp;
