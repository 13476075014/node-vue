/**   
 * Copyright: Copyright (c) 2015 lianxin
 * 
 * @ClassName: MenuStatusInterceptor.java
 * @Description: 后台页面菜单状�?请求后置处理拦截�?
 *
 * @version: v1.0.0
 * @author: master
 * @date: 2015-6-4 下午3:22:50
 *
 * Modification History:
 * Date         Author          Version            Description
 *---------------------------------------------------------*
 */package com.oa.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.oa.menu.Module;

public class MenuStatusInterceptor extends HandlerInterceptorAdapter {

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		HandlerMethod method = (HandlerMethod) handler;
		Module model = method.getBean().getClass().getAnnotation(Module.class);
		if(model == null){
			request.setAttribute("module", "UserSysManager");
		}else{
			request.setAttribute("module", model.value());
		}
	}

	

}
