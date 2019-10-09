package com.oa.service;

import java.util.Map;

import com.oa.entity.SysNoticeStatus;
import com.oa.entity.User;
import com.oa.util.PageQueryUtil;

public interface NoticeService extends BaseService {
	/**
	 * 系统公告分页管理
	 */
	public Map<String, Object> findNoticeAll(PageQueryUtil page, User user)
			throws Exception;

	/**
	 * 查询最新公告信息
	 */
	public String findLatestNotice() throws Exception;
	
	/**
	 * 查询未读系统公告数量
	 * @return
	 * @throws Exception
	 */
	public Long findNoReadNoticeCount(Integer id) throws Exception;
	
	/**
	 * 查询未读系统公告
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findNoReadNotice(Integer id, Integer status, PageQueryUtil page) throws Exception;
	
	/**
	 * 保存已读信息
	 * @return
	 * @throws Exception
	 */
	public void saveNoticeStatus(SysNoticeStatus sysNoticeStatus) throws Exception;
	
	/**
	 * 根据公告id查询已读信息
	 * @return
	 * @throws Exception
	 */
	public SysNoticeStatus findNoticeStatusById(Integer noticeId, Integer userId) throws Exception;
	
	/**
	 * 根据公告id查询公告内容
	 * 
	 * @author MaYang
	 * @param id
	 *            公告id
	 * @return
	 * @throws Exception
	 */
	public String findNoticeContentById(Integer id) throws Exception;
	
}
