package com.oa.service;

import java.util.List;

import com.oa.entity.PrevRole;
import com.oa.entity.Privilege;
import com.oa.entity.Role;
import com.oa.entity.User;

public interface PrivilegeService extends BaseService {
	/**
	 * 根据用户ID查询对应用户可授权所有权限
	 * 
	 * @param userId
	 *            用户ID
	 * @return 若是平台超级管理员返回所有权限信息
	 * @throws Exception
	 */
	public List<Privilege> findAllPrev(Integer userId) throws Exception;

	/**
	 * 根据用户ID查询对应用户可授权所有权限--不关联
	 * 
	 * @param user
	 *            用户信息 
	 * @return 若是平台超级管理员返回所有权限信息
	 * @throws Exception
	 */
	public List<Privilege> findAllPrevToUser(User user) throws Exception;

	/**
	 * 查询指定角色授权信息编号
	 * 
	 * @param roleId
	 * @return
	 * @throws Exception
	 */
	public Integer[] findPrevArray(Integer roleId) throws Exception;

	/**
	 * 保存授权信息
	 * 
	 * @param list
	 * @param role
	 * @param user
	 * @throws Exception
	 */
	public void savePrev(List<PrevRole> list, Role role, User user)
			throws Exception;
}