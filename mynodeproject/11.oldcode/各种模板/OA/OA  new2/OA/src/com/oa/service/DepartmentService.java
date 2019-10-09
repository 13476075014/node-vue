package com.oa.service;

import java.util.List;
import java.util.Map;

import com.oa.entity.Deparment;
import com.oa.util.PageQueryUtil;

public interface DepartmentService extends BaseService {
	/**
	 * 查询所有系统权限部门
	 */
	public List<Deparment> findAll() throws Exception;

	/**
	 * 分页查询所有部门信息
	 * 
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findDpAll(PageQueryUtil page) throws Exception;
}
