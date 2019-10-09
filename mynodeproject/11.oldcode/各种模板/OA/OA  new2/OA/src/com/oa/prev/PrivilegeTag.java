/**   
* Copyright: Copyright (c) 2015 xlz
* 
* @ClassName: PrivilegeTag.java
* @Description: 自定义权限控制标签，处理页面细粒度权限控制
*
* @version: v1.0.0
* @author: xuyiping
* @date: 2015-4-21 上午9:37:24 
*
* Modification History:
* Date         Author          Version            Description
*---------------------------------------------------------*
* 2014-1-13     xuyiping           v1.0.0               修改原因
*/
package com.oa.prev;

import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import com.oa.entity.Privilege;
import com.oa.entity.PrivilegePK;
import com.oa.util.Constrants;
public class PrivilegeTag extends TagSupport {
	/**
	 * 功能
	 */
	private String oprator;
	/**
	 * 模块
	 */
	private String module;

	@SuppressWarnings("unchecked")
	@Override
	public int doStartTag() throws JspException {
		PrivilegePK privilegePK = new PrivilegePK(this.module, this.oprator);
		List<Privilege> list = (List<Privilege>) pageContext.getSession()
				.getAttribute(Constrants.USER_PRIVILEGE_KEY);
		Privilege pri = new Privilege(privilegePK);
		if (list != null && list.contains(pri)) {
			return EVAL_BODY_INCLUDE;
		} else {
			return SKIP_BODY;
		}
	}

	public String getOprator() {
		return oprator;
	}

	public void setOprator(String oprator) {
		this.oprator = oprator;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

}
