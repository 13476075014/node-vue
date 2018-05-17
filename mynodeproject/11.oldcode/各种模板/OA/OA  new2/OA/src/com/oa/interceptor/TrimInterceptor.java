package com.oa.interceptor;

import java.lang.reflect.Method;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.MethodParameter;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.oa.prev.Trim;

public class TrimInterceptor extends HandlerInterceptorAdapter {
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		MethodParameter[] parameters = ((HandlerMethod)handler).getMethodParameters();
		for(int i = 0; i<parameters.length; i++){
			Trim trim = parameters[0].getParameterAnnotation(Trim.class);
			if(trim != null){
				
			}
		}
		return true;
	}

	private Method getCurrentMethod(Object invocation)
			throws Exception {
		HandlerMethod method = (HandlerMethod) invocation;
		return method.getMethod();
	}
}
