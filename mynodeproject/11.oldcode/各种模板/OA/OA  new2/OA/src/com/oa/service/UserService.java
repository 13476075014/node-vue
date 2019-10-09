package com.oa.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.oa.entity.Role;
import com.oa.entity.User;
import com.oa.entity.UserRole;
import com.oa.util.PageQueryUtil;


public interface UserService extends BaseService {
	/**
	 * 会员登录
	 * 
	 * @param userName
	 *            账号
	 * @param password
	 *            登陆密码
	 * @return
	 * @throws Exception
	 */
	public User findUser(String userName, String password) throws Exception;
	/**
	 * 根据账号查找用户信息
	 * 
	 * @param userName
	 *            账号
	 * @param password
	 *            登陆密码
	 * @return
	 * @throws Exception
	 */
	public User findUser(String userName) throws Exception;

	/**
	 * 根据ID删除角色信息
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void deleteRole(Serializable id) throws Exception;

	/**
	 * 分页查询用户对应所有角色
	 * 
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findRoleAll(PageQueryUtil page, User user)
			throws Exception;

	/**
	 * 查询与用户信息对应所有角色
	 * 
	 * @param user
	 *            用户信息
	 * @return
	 * @throws Exception
	 */
	public List<Role> findRoleAllOfUser(User user) throws Exception;

	/**
	 * 分页查询所有系统用户--不包括超级管理员
	 * 
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findUserAll(PageQueryUtil page, User user)
			throws Exception;

	/**
	 * 检测用户账号唯一性
	 * 
	 * @param userName
	 * @return
	 * @throws Exception
	 */
	public boolean validateUserName(String userName) throws Exception;

	/**
	 * 根据ID删除系统用户信息
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void deleteUser(Serializable id) throws Exception;

	/**
	 * 根据用户编号查询已分配角色信息
	 * 
	 * @param userId
	 * @return
	 * @throws Exception
	 */
	public List<Role> findRolesByUserId(Integer userId) throws Exception;

	/**
	 * 根据用户编号删除用户分配的角色信息
	 * 
	 * @param userId
	 * @throws Exception
	 */
	public void deleteRoleByUserId(Integer userId) throws Exception;

	/**
	 * 根据用户编号查找对应用户所有分配角色信息
	 * 
	 * @param userId
	 * @return
	 * @throws Exception
	 */
	public List<UserRole> findUserRolesByUserId(Integer userId)
			throws Exception;
	
}
