import fetch from 'dva/fetch';

function checkStatus(response) {
  // 判断请求的结果是否成功如果成功返回结果
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  
  // new Error()创建错误对象，并且返回错误信息
  const error = new Error(response.statusText);
  error.response = response;
  // throw 抛出一个自定义的异常，当前函数执行将被停止(throw之后的语句不会执行)并且控制将被传递到调用堆栈中的第一个catch块。如果调用者函数中没有catch块，程序将会终止。
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
// async 异步操作的函数 等同于 function* await 等同于yield
export default async function request(url, options) {
  // 执行请求数据的方法 fetch(url, options) 并传入地址和参数 返回response请求结果
  const response = await fetch(url, options);
  // 把fetch请求的结果传递给checkStatus处理请求结果
  // 调用checkStatus()
  checkStatus(response);

  // 将response转为json格式
  const data = await response.json();
 
  // 定义一个ret对象
  const ret = {
    data,
    headers: {},
  };

  // headers相当于 response/request 的头信息，可以修改它，或者针对不同的结果做不同的操作。
  // get() 方法从Headers对象中返回指定header的第一个值. 如果Header对象中不存在请求的header,则返回 null.
  // 判断response.headers的值是否存在
  if (response.headers.get('x-total-count')) {
    // 设置ret.headers对象的信息
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }
  

  // 返回ret
  return ret;
}