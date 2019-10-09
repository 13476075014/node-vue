package com.oa.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.oa.entity.Role;
import com.oa.entity.User;
import com.oa.entity.UserRole;
import com.oa.service.UserService;
import com.oa.util.Constrants;
import com.oa.util.PageQueryUtil;


@Scope("prototype")
@Service("userService")
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
public class UserServiceImpl extends BaseServiceImpl implements UserService {
	/**
	 * 管理人员登录
	 * 
	 * @param userName
	 *            账号
	 * @param password
	 *            登陆密码
	 * @return
	 * @throws Exception
	 */
	public User findUser(String userName, String password) throws Exception {
		Object[] objs = { userName, password };
		List<User> list = getBaseDao().find(
				"select du from User du where du.userName=? and du.password=?",
				objs);
		if (list != null && list.size() > 0) {
			return (User) list.get(0);
		} else {
			return null;
		}
	}
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
	public User findUser(String userName) throws Exception {
		Object[] objs = { userName};
		List<User> list = getBaseDao().find(
				"select du from User du where du.userName=?",
				objs);
		if (list != null && list.size() > 0) {
			return (User) list.get(0);
		} else {
			return null;
		}
	}

	/**
	 * 分页查询对应管理的系统用户--不包括超级管理员
	 * 
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findUserAll(PageQueryUtil page, User user)
			throws Exception {
		String hql;
		if (user.getUserType().intValue() == Constrants.SUPER_USER) {
			hql = "select u from User u where u.userType =? and u.isDel=?";
			return backPage(hql, page, new Object[] { Constrants.SIMPLE_USER, Constrants.DATA_NOT_DEL });
		} else {
			hql = "select u from User u where u.dpId=? and u.userType =? and u.isDel=?";
			return backPage(hql, page, new Object[] { user.getDpId(), Constrants.SIMPLE_USER, Constrants.DATA_NOT_DEL });
		}
	}

	/**
	 * 查询与用户信息对应所有角色
	 * 
	 * @param user
	 *            用户信息
	 * @return
	 * @throws Exception
	 */
	public List<Role> findRoleAllOfUser(User user) throws Exception {
		if (user.getUserType().intValue() == Constrants.SUPER_USER) {
			return getBaseDao().find("select r from Role r where r.roleType=?",
					new Object[] { Constrants.SYS_ROLE });
		} else {
			return getBaseDao().find(
					"select r from Role r where r.departmentId=?",
					user.getDpId());
		}
	}

	/**
	 * 检测用户账号唯一性
	 * 
	 * @param userName
	 * @return true：唯一 false：已存在
	 * @throws Exception
	 */
	public boolean validateUserName(String userName) throws Exception {
		Long count = getBaseDao().count(
				"select count(u.id) from User u where u.userName=?", userName);
		if (count != null && count.intValue() > 0) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * 根据ID删除角色信息
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void deleteRole(Serializable id) throws Exception {
		getBaseDao().executeHql("delete from Role ro where ro.id=?", id);
	}

	/**
	 * 分页查询用户对应所有角色
	 * 
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findRoleAll(PageQueryUtil page, User user)
			throws Exception {
		String hql;
		if (user.getUserType().equals(Constrants.SUPER_USER)) {
			hql = "select ro from Role ro where ro.roleType=?";
			return backPage(hql, page, new Object[] { Constrants.SYS_ROLE });
		} else {
			hql = "select ro from Role ro where ro.departmentId=? and ro.roleType=?";
			return backPage(hql, page, new Object[] { user.getDpId(), Constrants.DP_ROLE });
		}
	}

	/**
	 * 根据ID删除系统用户信息
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void deleteUser(Serializable id) throws Exception {
		getBaseDao().executeHql("delete from User u where u.id=?", id);
	}

	/**
	 * 根据用户编号查询已分配角色信息
	 * 
	 * @param userId
	 * @return
	 * @throws Exception
	 */
	public List<Role> findRolesByUserId(Integer userId) throws Exception {
		return getBaseDao()
				.find("select ro from Role ro,UserRole ur where ur.roleId=ro.id and ur.userId=?",
						userId);
	}

	/**
	 * 根据用户编号删除用户分配的角色信息
	 * 
	 * @param userId
	 * @throws Exception
	 */
	public void deleteRoleByUserId(Integer userId) throws Exception {
		getBaseDao().executeHql("delete from UserRole ur where ur.userId=?",
				userId);
	}

	/**
	 * 根据用户编号查找对应用户所有分配角色信息
	 * 
	 * @param userId
	 * @return
	 * @throws Exception
	 */
	public List<UserRole> findUserRolesByUserId(Integer userId)
			throws Exception {
		return getBaseDao().find(
				"select ur from UserRole ur where ur.userId=?", userId);
	}
	
}
