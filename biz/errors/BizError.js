/**
 * Created by frank on 16/1/28.
 */
class BizError {
  constructor (error) {
    this.code = error.status;

    switch (error.status) {
      case 0:
        this.message = error.data;
        break;
      case 401:
        this.message = '认证授权失败,请登录';
        break;
      case 403:
      case 405:
        this.message = '无权限访问，请求失败';
        break;
      case 429:
        this.message = '因为访问频繁，你已经被限制访问，稍后重试';
        break;
      case 510:
        this.code = error.data.code;
        this.message = error.data.message;
        break;
      default:
        this.code = 503;
        this.message = '服务异常,稍后重试';
    }

    this.metadata = error;
  }
}

export default BizError;
