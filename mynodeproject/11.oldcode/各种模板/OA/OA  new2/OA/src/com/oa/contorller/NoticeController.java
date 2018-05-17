/**   
 * Copyright: Copyright (c) 2015 master
 * 
 * @ClassName: NoticeController.java
 * @Description: 用户管理类
 *
 * @version: v1.0.0
 * @author: xuyiping
 * @date: 2015-4-20 上午9:37:24 
 *
 * Modification History:
 * Date         Author          Version            Description
 *---------------------------------------------------------*
 */
package com.oa.contorller;

import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.oa.entity.SysNotice;
import com.oa.entity.SysNoticeStatus;
import com.oa.menu.Module;
import com.oa.prev.Prev;
import com.oa.service.NoticeService;
import com.oa.util.Constrants;
import com.oa.util.Log4jLogger;
import com.oa.util.PageQueryUtil;
import com.oa.util.SystemUtil;

@Controller
@Scope("prototype")
@RequestMapping("/system/notice")
@Module("SysManager")
public class NoticeController extends BaseController {
	private static final Log4jLogger log = Log4jLogger
			.getLogger(NoticeController.class);
	
	@Resource
	private NoticeService noticeService;

	/**
	 * @Function: list
	 * @Description: 系统公告列表
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: yiping.xu
	 */
	@RequestMapping("/list")
	@Prev(module = "noticeManager", oprator = "all")
	public ModelAndView list(PageQueryUtil page) throws Exception {
		try {
			Map<String, Object> map = noticeService.findNoticeAll(page, getUserMessage());
			return backView("notice/list", map);
		} catch (Exception e) {
			log.error("find all notice error", e);
			throw e;
		}
	}

	/**
	 * @Function: addInit
	 * @Description: 系统公告添加初始化
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: yiping.xu
	 */
	@RequestMapping("/add")
	@Prev(module = "noticeManager", oprator = "add")
	public String addInit(PageQueryUtil page) throws Exception {
		try {
			return "notice/add";
		} catch (Exception e) {
			log.error("add notice init error", e);
			throw e;
		}
	}

	/**
	 * @Function: addSave
	 * @Description: 系统公告添加初始化
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: yiping.xu
	 */
	@RequestMapping("/addsv")
	@Prev(module = "noticeManager", oprator = "add")
	public ModelAndView addSave(String content, String title) throws Exception {
		try {
			if (SystemUtil.validparamsNULL(content, title)) {
				return returnView("您还有数据未填写", "notice/add");
			}
			SysNotice notice = new SysNotice(content, getUserMsg().getId(),
					Constrants.DATA_NOT_PUBLISH, new Date(),
					Constrants.DATA_NOT_DEL, title);
			noticeService.save(notice);
			return returnView("添加成功，请确认发布", "notice/add");
		} catch (Exception e) {
			log.error("add notice error", e);
			throw e;
		}
	}

	/**
	 * @Function: publish
	 * @Description: 系统公告发布
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: yiping.xu
	 */
	@RequestMapping("/publish")
	@ResponseBody
	@Prev(module = "noticeManager", oprator = "publish")
	public ModelMap publish(Integer id) throws Exception {
		ModelMap map = new ModelMap();
		try {
			if (SystemUtil.validparamsNULL(id)) {
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				map.put(Constrants.MESSAGE_TIP, "操作不合法");
				return map;
			}

			SysNotice notice = noticeService.get(SysNotice.class, id);
			if (notice == null
					|| notice.getStatus().intValue() == Constrants.DATA_PUBLISH
					|| notice.getIsDel().intValue() == Constrants.DATA_DEL) {
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				map.put(Constrants.MESSAGE_TIP, "操作不合法");
				return map;
			}
			notice.setStatus(Constrants.DATA_PUBLISH);
			noticeService.update(notice);
			map.put(Constrants.MESSAGE_TIP_FLAGS, true);
			map.put(Constrants.MESSAGE_TIP, "发布成功");
			return map;
		} catch (Exception e) {
			log.error("publish notice error", e);
			throw e;
		}
	}

	/**
	 * @Function: updateInit
	 * @Description: 系统公告添加初始化
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: yiping.xu
	 */
	@RequestMapping("/updateInit")
	@Prev(module = "noticeManager", oprator = "update")
	public String updateInit(Integer id) throws Exception {
		try {
			if (SystemUtil.validparamsNULL(id)) {
				return messageView("操作不合法");
			}
			SysNotice notice = noticeService.get(SysNotice.class, id);
			if (SystemUtil.validparamsNULL(notice)) {
				return messageView("操作不合法");
			}
			if (notice.getStatus() == Constrants.DATA_PUBLISH
					|| notice.getIsDel() == Constrants.DATA_DEL) {
				return messageView("数据已锁定，暂时无法更新");
			}
			getRequest().setAttribute("data", notice);
			return "notice/update";
		} catch (Exception e) {
			log.error("update notice init error", e);
			throw e;
		}
	}

	/**
	 * @Function: update
	 * @Description: 系统公告更新
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: yiping.xu
	 */
	@RequestMapping("/update")
	@Prev(module = "noticeManager", oprator = "update")
	public ModelAndView update(Integer id, String content, String title)
			throws Exception {
		try {
			if (SystemUtil.validparamsNULL(content, id, title)) {
				return messageViewNew("您还有数据未填写");
			}
			SysNotice notice = noticeService.get(SysNotice.class, id);
			if (notice != null
					&& notice.getStatus() == Constrants.DATA_NOT_PUBLISH
					&& notice.getIsDel() == Constrants.DATA_NOT_DEL) {
				notice.setNoticeContent(content);
				notice.setTitle(title);
				noticeService.update(notice);
			}
			return returnView("修改成功", "notice/update");
		} catch (Exception e) {
			log.error("update notice error", e);
			throw e;
		}
	}

	/**
	 * @Function: delete
	 * @Description: 系统公告删除
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: yiping.xu
	 */
	@RequestMapping("/delete")
	@Prev(module = "noticeManager", oprator = "delete")
	public ModelAndView delete(Integer id, PageQueryUtil page) throws Exception {
		try {
			if (!SystemUtil.validparamsNULL(id)) {
				SysNotice notice = noticeService.get(SysNotice.class, id);
				if (notice != null) {
					notice.setIsDel(Constrants.DATA_DEL);
					noticeService.update(notice);
				}
			}
			return reView("删除成功", list(page));
		} catch (Exception e) {
			log.error("delete notice error", e);
			throw e;
		}
	}

	/**
	 * @Function: latest
	 * @Description: 系统最新公告
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: yiping.xu
	 */
	@RequestMapping("/latest")
	@ResponseBody
	public ModelMap latest() throws Exception {
		try {
			String title = noticeService.findLatestNotice();
			ModelMap map = new ModelMap("title", title);
			/*notice == null ? "": notice.getNoticeContent().length() > 20 ? (HTMLUtils.subStringHTML(notice.getNoticeContent(),20) + "...") : notice
					.getNoticeContent())*/
			return map;
		} catch (Exception e) {
			log.error("find latest notice error", e);
			throw e;
		}
	}

	/**
	 * @Function: noReadNoticeCount
	 * @Description: 查询系统未读公告数目
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: MaYang
	 */
	@ResponseBody
	@RequestMapping("/noReadNoticeCount")
	public ModelMap noReadNoticeCount() throws Exception {
		ModelMap map = new ModelMap();
		Integer id = getUserMsg().getId();
		try {
			if (!SystemUtil.validparamsNULL(id)) {
				Long noticeCount = noticeService.findNoReadNoticeCount(id);
				map.put("noticeCount", noticeCount);
			}
			return map;
		} catch (Exception e) {
			log.error("find notice no read count error", e);
			throw e;
		}
	}

	/**
	 * @Function: noReadList
	 * @Description: 系统公告未读公告分页查询
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: MaYang
	 */
	@RequestMapping("/noReadList")
	public ModelAndView noReadList(Integer status, PageQueryUtil page) throws Exception {
		Map<String, Object> map = null;
		try {
			if(status == null){
				status = Constrants.READ_ALL;
			}
			Integer id = getUserMsg().getId();
			map = noticeService.findNoReadNotice(id, status, page);
			return backView("notice/noReadList", map).addObject("status", status);
		} catch (Exception e) {
			log.error("find no read notice error", e);
			throw e;
		}

	}
	
	/**
	 * @Function: saveSysNoticeStatus
	 * @Description: 保存阅读记录
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: MaYang
	 */
	@ResponseBody
	@RequestMapping("/saveSysNoticeStatus")
	public ModelMap saveSysNoticeStatus(Integer id) throws Exception {
		SysNoticeStatus sns = null;
		ModelMap map = null;
		try{
			map = new ModelMap();
			if(id == null){
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				return map;
			}
			Integer userId = getUserMsg().getId();
			sns = noticeService.findNoticeStatusById(id, userId);
			if(sns == null){
				sns = new SysNoticeStatus();
				sns.setSysNoticeId(id);
				sns.setUserId(userId);
				sns.setCreateTime(new Date());
				noticeService.saveNoticeStatus(sns);
			}
			String noticeContent = noticeService.findNoticeContentById(id);
			map.put(Constrants.MESSAGE_TIP_FLAGS, true);
			map.put("noticeContent", noticeContent);
			return map;
		} catch(Exception e) {
			log.error("save sys notice status error", e);
			throw e;
		}
		
	}
	
	/**
	 * @Function: checkNoticeStatus
	 * @Description: 保存阅读记录
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: MaYang
	 */
	@RequestMapping("/checkNoticeStatus")
	public void checkNoticeStatus(Integer id) throws Exception {
		SysNoticeStatus sns = null;
		try{
			Integer userId = getUserMsg().getId();
			sns = noticeService.findNoticeStatusById(id, userId);
			if(sns == null){
				sns = new SysNoticeStatus();
				sns.setSysNoticeId(id);
				sns.setUserId(userId);
				sns.setCreateTime(new Date());
				noticeService.saveNoticeStatus(sns);
			}
		} catch(Exception e) {
			log.error("save sys notice status error", e);
			throw e;
		}
	}
	
}
