package com.oa.service;

import java.util.List;
import java.util.Map;

import com.oa.bean.DateEntity;
import com.oa.bean.EmployeeInfoBean;
import com.oa.util.PageQueryUtil;

public interface EmployeeService extends BaseService {

	public EmployeeInfoBean findMyInfo(Integer id) throws Exception;
	
	public Map<String, Object> findAddressByPage(EmployeeInfoBean employeeInfo, PageQueryUtil page) throws Exception;
	
	public List<EmployeeInfoBean> findAddressAll() throws Exception;
	
	public Map<String, Object> findMySalaryInfoByPage(DateEntity date,  PageQueryUtil page, Integer accountId) throws Exception;

	public Map<String, Object> findMyLeaveInfoByPage(DateEntity date, PageQueryUtil page, Integer id) throws Exception;
	
	public boolean isOnlyEmail(String email, Long id) throws Exception;
	
	public boolean isOnlyMobileNumber(String mobileNumber, Long id) throws Exception;
	
}
