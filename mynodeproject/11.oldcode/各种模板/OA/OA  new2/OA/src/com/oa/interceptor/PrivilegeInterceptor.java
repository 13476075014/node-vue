/**   
* Copyright: Copyright (c) 2015 xlz
* 
* @ClassName: PrivilegeInterceptor.java
* @Description: 系统功能权限验证拦截�?
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

import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.oa.entity.Privilege;
import com.oa.entity.PrivilegePK;
import com.oa.entity.User;
import com.oa.prev.Prev;
import com.oa.service.PrivilegeService;
import com.oa.util.Constrants;

public class PrivilegeInterceptor extends HandlerInterceptorAdapter {
	@Autowired
	protected @Qualifier("prevService")
	PrivilegeService prevService;
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		Method method = getCurrentMethod(handler);
		Prev privilegeAnotation = method.getAnnotation(Prev.class);
		if (privilegeAnotation != null) {
			String oprator = privilegeAnotation.oprator();
			String module = privilegeAnotation.module();

			PrivilegePK privilegePK = new PrivilegePK(module, oprator);
			Privilege pri = new Privilege(privilegePK);
			User user = (User) request.getSession().getAttribute(Constrants.USER_KEY);
			List<Privilege> privilegeList = prevService
					.findAllPrevToUser(user);
			request.getSession()
					.setAttribute(Constrants.USER_PRIVILEGE_KEY, privilegeList);
			if (privilegeList != null && privilegeList.contains(pri)) {
				return true;
			} else {
				if (request.getHeader("X-Requested-With") != null
						&& request.getHeader("X-Requested-With")
								.equalsIgnoreCase("XMLHttpRequest")) {//是ajax请求
					response.setCharacterEncoding("text/html;charset=UTF-8");
					response.setContentType("text/html;charset=UTF-8");
					PrintWriter writer =  response.getWriter();
					StringBuffer jsonTip = new StringBuffer("{\"result\":");
					jsonTip.append(false).append(",\"tip\":\"您无权操作\"}");
					writer.print(jsonTip.toString());
					return false;
				}else{//非ajax请求
					return false;
				}
			}
		} else {
			return true;
		}
	}

	private Method getCurrentMethod(Object invocation)
			throws Exception {
		HandlerMethod method = (HandlerMethod) invocation;
		return method.getMethod();
	}
}
