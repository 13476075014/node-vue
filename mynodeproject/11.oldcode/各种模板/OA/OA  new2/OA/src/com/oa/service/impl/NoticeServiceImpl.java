package com.oa.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.oa.bean.NoticeBean;
import com.oa.entity.SysNoticeStatus;
import com.oa.entity.User;
import com.oa.service.NoticeService;
import com.oa.util.Constrants;
import com.oa.util.PageQueryUtil;

@Service("noticeService")
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
public class NoticeServiceImpl extends BaseServiceImpl implements NoticeService {
	/**
	 * 系统公告分页管理
	 */
	public Map<String, Object> findNoticeAll(PageQueryUtil page, User user)
			throws Exception {
		String hql = "select new com.oa.bean.NoticeBean(p,u.userName,u.nickName) "
				+ " from SysNotice p,User u where p.userId=u.id "
				+ " and p.isDel=? order by p.createTime desc";
		return backPage(hql, page, new Object[] { Constrants.DATA_NOT_DEL });
	}

	/**
	 * 查询最新公告信息
	 */
	public String findLatestNotice() throws Exception {
		PageQueryUtil page = new PageQueryUtil(1, 1);
		List<String> list = getBaseDao()
				.findByPage("select p.title from SysNotice p where p.isDel=? and p.status=? order by p.createTime desc",
						page,
						new Object[] { Constrants.DATA_NOT_DEL,
								Constrants.DATA_PUBLISH });
		if (list != null && list.size() > 0) {
			return list.get(0);
		} else {
			return null;
		}
	}

	/**
	 * 查出未读公告记录数
	 * 
	 * @author MaYang
	 * @param id
	 *            用户id
	 * @return
	 * @throws Exception
	 */
	public Long findNoReadNoticeCount(Integer id) throws Exception {
		String hql = "select ns.sysNoticeId from SysNoticeStatus ns, User u where ns.userId = u.id and u.id=?";
		List<Integer> noticeIds = getBaseDao().find(hql, id);

		String chql = null;
		Map<String, List<Integer>> map = null;
		if (noticeIds == null || noticeIds.size() == 0) {
			chql = "";
		} else {
			chql = "and n.id not in (:ids)";
			map = new HashMap<String, List<Integer>>();
			map.put("ids", noticeIds);
		}

		String countHql = "select count(n.id) from SysNotice n where n.userId !=? and n.status=? and n.isDel=? "
				+ chql;
		Long count = getBaseDao().count(countHql, map, id,
				Constrants.DATA_PUBLISH, Constrants.DATA_NOT_DEL);
		return count;
	}

	/**
	 * 分页查询未读公告
	 * 
	 * @author MaYang
	 * @param id
	 *            用户id
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> findNoReadNotice(Integer id, Integer status,
			PageQueryUtil page) throws Exception {
		/*
		 * if (status != Constrants.READ_ALL && status != Constrants.READ_NO &&
		 * status != Constrants.READ_YES) { return null; }
		 */
		String hql = "select ns.sysNoticeId from SysNoticeStatus ns, User u where ns.userId = u.id and u.id=?";
		List<Integer> noticeIds = getBaseDao().find(hql, id);

		String chql = null;
		Map<String, List<Integer>> map = null;
		String hql2 = null;
		Map<String, Object> mapPage;

		if (status == Constrants.READ_ALL) {
			hql2 = "select new com.oa.bean.NoticeBean(n.id, n.title, u.nickName, n.createTime, n.userId) "
					+ "from SysNotice n, User u where n.userId=u.id and n.status=? and n.isDel=? order by n.createTime desc";
			mapPage = backPage(hql2, page, Constrants.DATA_PUBLISH,
					Constrants.DATA_NOT_DEL);
			for (NoticeBean nb : (List<NoticeBean>) mapPage
					.get(Constrants.LIST)) {
				if (noticeIds.contains(nb.getId()) || nb.getUserId() == id) {
					nb.setReadStatus(Constrants.READ_YES);
				} else {
					nb.setReadStatus(Constrants.READ_NO);
				}
			}
		} else {
			if (status == Constrants.READ_YES) {
				if (noticeIds == null || noticeIds.size() == 0) {
					chql = "and n.userId =?";
				} else {
					chql = "and (n.userId =? or n.id in (:ids))";
					map = new HashMap<String, List<Integer>>();
					map.put("ids", noticeIds);
				}
			}
			if (status == Constrants.READ_NO) {
				if (noticeIds == null || noticeIds.size() == 0) {
					chql = "and n.userId !=?";
				} else {
					chql = "and n.userId !=? and n.id not in (:ids)";
					map = new HashMap<String, List<Integer>>();
					map.put("ids", noticeIds);
				}
			}
			hql2 = "select new com.oa.bean.NoticeBean(n.id, n.title, u.nickName, n.createTime) "
					+ "from SysNotice n, User u where n.userId=u.id and n.status=? and n.isDel=? "
					+ chql + " order by n.createTime desc";
			mapPage = backPageHasMap(hql2, page, map, Constrants.DATA_PUBLISH,
					Constrants.DATA_NOT_DEL, id);
		}
		return mapPage;
	}

	/**
	 * 保存公告已读信息
	 * 
	 * @author MaYang
	 * @param sysNoticeStatus
	 *            用户公告已读信息
	 * @return
	 * @throws Exception
	 */
	public void saveNoticeStatus(SysNoticeStatus sysNoticeStatus)
			throws Exception {
		getBaseDao().save(sysNoticeStatus);
	}

	/**
	 * 根据公告id查询已读信息
	 * 
	 * @author MaYang
	 * @param noticeId
	 *            公告id
	 * @return
	 * @throws Exception
	 */
	public SysNoticeStatus findNoticeStatusById(Integer noticeId, Integer userId)
			throws Exception {
		String hql = "select s from SysNoticeStatus s where s.sysNoticeId=? and userId=?";
		List<SysNoticeStatus> list = getBaseDao().find(hql,
				new Object[] { noticeId, userId });
		if (list != null && list.size() != 0) {
			return list.get(0);
		}
		return null;
	}

	/**
	 * 根据公告id查询公告内容
	 * 
	 * @author MaYang
	 * @param id
	 *            公告id
	 * @return
	 * @throws Exception
	 */
	public String findNoticeContentById(Integer id) throws Exception {
		List<String> list = getBaseDao()
				.find("select s.noticeContent from SysNotice s where s.id = ? and s.isDel = ?",
						new Object[] { id, Constrants.DATA_NOT_DEL });
		if (list != null && list.size() != 0) {
			return list.get(0);
		}
		return null;
	}

}
