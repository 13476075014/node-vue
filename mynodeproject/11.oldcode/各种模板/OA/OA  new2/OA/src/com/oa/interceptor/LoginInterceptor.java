/**   
* Copyright: Copyright (c) 2015 xlz
* 
* @ClassName: LoginInterceptor.java
* @Description: 用户登录验证拦截器
*
* @version: v1.0.0
* @author: xuyiping
* @date: 2015-4-20 上午9:37:24 
*
* Modification History:
* Date         Author          Version            Description
*---------------------------------------------------------*
* 2014-1-13     xuyiping           v1.0.0               修改原因
*/
package com.oa.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.oa.entity.User;
import com.oa.util.Constrants;

public class LoginInterceptor extends HandlerInterceptorAdapter {
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		Object obj = request.getSession().getAttribute(
				Constrants.USER_KEY);
		if (obj != null && obj instanceof User) {// 登陆成功---放行
			return true;
		}
		request.getRequestDispatcher("/WEB-INF/jsp/user/login.jsp")
				.forward(request, response);
		return false;
	}
}
