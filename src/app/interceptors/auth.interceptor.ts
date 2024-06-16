import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('paso por interceptor')

  const cloneRequest = req.clone({
    setHeaders: {
      'Content-type': 'application/json',
      'Authorization': localStorage.getItem('token') || ""
    }
  })

  return next(cloneRequest);
};
