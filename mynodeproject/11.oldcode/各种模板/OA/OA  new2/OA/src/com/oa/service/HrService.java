package com.oa.service;

import java.util.Map;

import com.oa.entity.EmployeeInfo;
import com.oa.util.PageQueryUtil;

public interface HrService extends BaseService {

	public Map<String, Object> statisticsGender();
	
	public Map<String, Object> findEmployeeInfoByPage(EmployeeInfo info, PageQueryUtil page);
	
	public Integer deleteEmployeeInfo(Long id) throws Exception;
	
}
