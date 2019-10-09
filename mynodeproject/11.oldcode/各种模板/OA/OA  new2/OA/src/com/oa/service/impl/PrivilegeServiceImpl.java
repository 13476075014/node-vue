/**   
* Copyright: Copyright (c) 2015 xlz
* 
* @ClassName: PrivilegeServiceImpl.java
* @Description: 权限处理业务类
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
package com.oa.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.oa.entity.PrevRole;
import com.oa.entity.Privilege;
import com.oa.entity.Role;
import com.oa.entity.User;
import com.oa.service.PrivilegeService;
import com.oa.util.Constrants;

/**
 * @description 权限业务层
 * @author yiping.xu
 * @date 2014-7-24
 * 
 */
@Scope("prototype")
@Service("prevService")
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
public class PrivilegeServiceImpl extends BaseServiceImpl implements
		PrivilegeService {
	/**
	 * 根据用户ID查询对应用户可授权所有权限
	 * 
	 * @param userId
	 *            用户ID
	 * @return 若是平台超级管理员返回所有权限信息
	 * @throws Exception
	 */
	public List<Privilege> findAllPrev(Integer userId) throws Exception {
		User user = getBaseDao().get(User.class, userId);
		if (user == null) {
			return new ArrayList<Privilege>();
		}
		/**
		 * 超级管理员返回所有权限信息
		 */
		if (user.getUserType().equals(Constrants.SUPER_USER)) {
			return getBaseDao().findCache(
					"select p from Privilege p where p.parentId=?",
					Constrants.PREV_PARENT_DOM);
		}
		List<Privilege> list = getBaseDao()
				.findCache("select p from Privilege p,PrevRole pr,UserRole ur "
						+ "where p.id=pr.prevId and pr.roleId=ur.roleId and ur.userId=?",
						new Object[] { userId });
		Map<Integer, Set<Privilege>> map = new HashMap<Integer, Set<Privilege>>();
		for (Privilege p : list) {
			if (map.get(p.getParentId()) == null) {
				Set<Privilege> ls = new HashSet<Privilege>();
				ls.add(p);
				map.put(p.getParentId(), ls);
			} else {
				map.get(p.getParentId()).add(p);
			}
		}
		Set<Integer> keys = map.keySet();
		for (Integer key : keys) {
			Set<Privilege> ps = map.get(key);
			Iterator<Privilege> tor = ps.iterator();
			while (tor.hasNext()) {
				Privilege pk = tor.next();
				pk.setPrevs(map.get(pk.getId()));
			}
		}
		return new ArrayList<Privilege>(map.get(Constrants.PREV_PARENT_DOM));
	}

	/**
	 * 根据用户ID查询对应用户可授权所有权限--不关联
	 * 
	 * @param user
	 *            用户信息
	 * @return 若是平台超级管理员返回所有权限信息
	 * @throws Exception
	 */
	public List<Privilege> findAllPrevToUser(User user) throws Exception {
		if (user == null) {
			return new ArrayList<Privilege>();
		}
		/**
		 * 超级管理员返回所有权限信息
		 */
		if (user.getUserType().equals(Constrants.SUPER_USER)) {
			return getBaseDao().findCache("from Privilege");
		}
		return getBaseDao()
				.findCache("select p from Privilege p,PrevRole pr,UserRole ur "
						+ "where p.id=pr.prevId and pr.roleId=ur.roleId and ur.userId=?",
						user.getId());
	}


	/**
	 * 保存授权信息
	 * @param list
	 * @param role
	 * @param user
	 * @throws Exception
	 */
	public void savePrev(List<PrevRole> list, Role role,User user) throws Exception {
		if(user.getUserType().equals(Constrants.SUPER_USER) && 
				role.getRoleType().equals(Constrants.SYS_ROLE)){
			List<PrevRole> prevRo = getBaseDao().
					find("select pr from PrevRole pr where pr.roleId=?",
							new Object[]{role.getId()});//被更改权限的部门管理员所有权限
			List<PrevRole> prevRoOther = getBaseDao().
					find("select pr from PrevRole pr,Role ro where pr.roleId=ro.id " +
							"and pr.roleId !=? and ro.departmentId=? and ro.roleType=?",
							new Object[]{role.getId(),role.getDepartmentId(),
							Constrants.SYS_ROLE});//同一部门其他管理员拥有权限
			prevRoOther.addAll(list);
			List<Integer> prevs = new ArrayList<Integer>();
			if(prevRo != null && prevRo.size() > 0){
				for(PrevRole p:prevRo){
					if(!prevRoOther.contains(p)){
						prevs.add(p.getPrevId());
					}
				}
				if(prevs.size() > 0){
					Map<String,List<Integer>> map = new HashMap<String,List<Integer>>();
					map.put("params", prevs);
					List<PrevRole> prevRoDelete = getBaseDao().find("select pr from PrevRole pr," +
							"Role ro where pr.roleId=ro.id and ro.departmentId=? and ro.roleType=? and pr.prevId in(:params)"
							,map,new Object[]{role.getDepartmentId(),Constrants.DP_ROLE});
					if(prevRoDelete != null && prevRoDelete.size() > 0){
						getBaseDao().batchDeleteEnity(prevRoDelete);
					}
				}
			}
			
		}
		getBaseDao().executeHql("delete from PrevRole pr where pr.roleId=?",
				role.getId());
		if (list != null && list.size() > 0) {
			getBaseDao().batchAddEnity(list);
		}
	}

	/**
	 * 查询指定角色授权信息编号
	 * 
	 * @param roleId
	 * @return
	 * @throws Exception
	 */
	public Integer[] findPrevArray(Integer roleId) throws Exception {
		List<Integer> list = getBaseDao().find(
				"select pr.prevId from PrevRole pr where pr.roleId=?", roleId);
		if (list != null && list.size() > 0) {
			return list.toArray(new Integer[0]);
		} else {
			return new Integer[0];
		}
	}
}
