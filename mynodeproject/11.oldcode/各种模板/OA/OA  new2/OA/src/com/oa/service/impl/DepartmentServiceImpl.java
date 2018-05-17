package com.oa.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.oa.entity.Deparment;
import com.oa.service.DepartmentService;
import com.oa.util.Constrants;
import com.oa.util.PageQueryUtil;

@Scope("prototype")
@Service("departmentService")
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
public class DepartmentServiceImpl extends BaseServiceImpl implements
		DepartmentService {

	/**
	 * 查询所有系统权限部门
	 */
	@Override
	public List<Deparment> findAll() throws Exception {
		return getBaseDao().find(
				"select dp from Deparment dp where dp.isDel=?",
				Constrants.DATA_NOT_DEL);
	}

	/**
	 * 分页查询所有部门信息
	 * 
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findDpAll(PageQueryUtil page) throws Exception {
		String hql = "select dp from Deparment dp where dp.isDel=?";
		return backPage(hql, page, new Object[] { Constrants.DATA_NOT_DEL });
	}

}
