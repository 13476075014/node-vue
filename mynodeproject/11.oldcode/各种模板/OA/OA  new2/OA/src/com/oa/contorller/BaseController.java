package com.oa.contorller;


import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.oa.entity.User;
import com.oa.service.BaseService;
import com.oa.util.Constrants;

public class BaseController {
	protected String message = "";
	protected boolean result = false;
	protected boolean errorFlags = false;
	protected String menuStatus = "am-in";
	
	@Resource
	protected BaseService baseService;
	
	protected User getUserMsg() {
		return getUserMessage();
	}
	
	protected User getUserMessage(){
		return (User) getSession().getAttribute(Constrants.USER_KEY);
	}
	
	protected HttpSession getSession(){
		return getRequest().getSession();
	}

	public String getMenuStatus() {
		return menuStatus;
	}

	public void setMenuStatus(String menuStatus) {
		this.menuStatus = menuStatus;
	}

	/**
	 * 
	 * @Function: backView
	 * @Description: 返回结果类型
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: master
	 * @date: 2015-5-13 下午1:31:44
	 * 
	 *        Modification History: Date Author Version Description
	 *        ---------------------------------------------------------*
	 *        2014-1-14 xuyiping v1.0.0 修改原因
	 */
	public ModelAndView backView(String view, Map map) {
		ModelAndView v = new ModelAndView(view);
		v.addAllObjects(map);
		return v;
	}
	
	protected ModelAndView reView(String string, ModelAndView list) {
		list.addObject(Constrants.MESSAGE_TIP_FLAGS, true);
		list.addObject(Constrants.MESSAGE_TIP, message);
		return list;
	}
	
	public ModelAndView messageViewNew(String message) {
		return new ModelAndView("error/message").addObject(Constrants.MESSAGE_TIP, message);
	}

	/**
	 * 
	 * @Function: messageView
	 * @Description: 信息提示视图
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: master
	 * @date: 2015-5-15 下午2:54:29
	 * 
	 *        Modification History: Date Author Version Description
	 *        ---------------------------------------------------------*
	 */
	public String messageView(String message) {
		getRequest().setAttribute(Constrants.MESSAGE_TIP, message);
		return "error/message";
	}
	
	/**
	 * 
	 * @Function: successView
	 * @Description: 返回信息提示视图
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: master
	 * @date: 2015-5-15 下午2:54:29
	 * 
	 *        Modification History: Date Author Version Description
	 *        ---------------------------------------------------------*
	 */
	public ModelAndView returnView(String message,String view) {
		return new ModelAndView(view).addObject(Constrants.MESSAGE_TIP_FLAGS, true)
				.addObject(Constrants.MESSAGE_TIP, message);
	}
	
	/**
	 * 得到request对象
	 */
	protected HttpServletRequest getRequest() {
		return ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
	}
	
}
