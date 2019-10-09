package com.oa.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.oa.bean.DateEntity;
import com.oa.bean.EmployeeInfoBean;
import com.oa.service.EmployeeService;
import com.oa.util.Constrants;
import com.oa.util.PageQueryUtil;
import com.oa.util.TimeUtil;

@Service("employeeService")
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
public class EmployeeServiceImpl extends BaseServiceImpl implements
		EmployeeService {

	public EmployeeInfoBean findMyInfo(Integer id) throws Exception {
		String hql = "select new com.oa.bean.EmployeeInfoBean(p.name, p.idCard, p.age, p.gender, p.entryTime, p.mobileNumber, p.email, u.userName,"
				+ " p.performance, p.positionSalary, p.baseSalary, p.qqNumber) FROM EmployeeInfo p, User u where p.accountId=u.id and p.accountId=? "
				+ "and p.isDel=?";
		return getBaseDao().getOne(hql,
				new Object[] { (long) id, Constrants.DATA_NOT_DEL });
	}

	public Map<String, Object> findAddressByPage(EmployeeInfoBean employeeInfo,
			PageQueryUtil page) throws Exception {
		// 条件过多推荐使用stringBuffer
		String chql = " where p.isDel = ?";
		String hql = "select new com.oa.bean.EmployeeInfoBean(p.name, p.mobileNumber, p.email, p.qqNumber) from EmployeeInfo p";
		List<Object> conditions = new ArrayList<Object>();
		conditions.add(Constrants.DATA_NOT_DEL);
		if (employeeInfo.getName() != null
				&& !"".equals(employeeInfo.getName().trim())) {
			chql += " and p.name like ?";
			conditions.add("%" + employeeInfo.getName().trim() + "%");
		}
		// 当子查询中含有from字句时请大写FROM，不然会出错
		return backPage(hql + chql, page, conditions.toArray());
	}

	public List<EmployeeInfoBean> findAddressAll() throws Exception {
		String hql = "select new com.oa.bean.EmployeeInfoBean(p.name, p.mobileNumber, p.email, p.qqNumber) from EmployeeInfo p where p.isDel = ?";
		return getBaseDao().find(hql, Constrants.DATA_NOT_DEL);
	}

	public Map<String, Object> findMySalaryInfoByPage(DateEntity date,
			PageQueryUtil page, Integer accountId) throws Exception {
		// 条件过多推荐使用stringBuffer
		String chql = " where p.employeeId = e.id and p.isDel = ? and e.accountId = ? ";
		String hql = "select new com.oa.bean.EmployeeSalaryBean(e.name, p.grantTime, p.insuranceMoney, p.performance, p.taxMoney, p.leaveMoney, "
				+ "p.totalMoney, p.moneyNumber, p.otherMoney) from EmployeeSalary p, EmployeeInfo e";
		List<Object> conditions = new ArrayList<Object>();
		conditions.add(Constrants.DATA_NOT_DEL);
		conditions.add((long) accountId);
		if (date != null) {
			if (date.getStartTime() != null && !"".equals(date.getStartTime())) {
				Date date1 = TimeUtil.toDate(date.getStartTime(), 1);
				chql += "and p.grantTime >= ?";
				conditions.add(date1);
			}
			if (date.getEndTime() != null && !"".equals(date.getEndTime())) {
				Date date2 = TimeUtil.getAfterDate(TimeUtil.toDate(
						date.getEndTime(), 1));
				chql += "and p.grantTime < ?";
				conditions.add(date2);
			}
		}
		// 当子查询中含有from字句时请大写FROM，不然会出错
		return backPage(hql + chql + "order by p.grantTime desc", page,
				conditions.toArray());
	}

	public Map<String, Object> findMyLeaveInfoByPage(DateEntity date,
			PageQueryUtil page, Integer id) throws Exception {
		// 条件过多推荐使用stringBuffer
		String chql = " where p.employeeId = e.id and p.isDel = ? and e.accountId = ? and p.endStatus = ? ";
		String hql = "select new com.oa.bean.LeaveRecordsBean(e.name, p.startTime, p.endTime, p.allHour) "
				+ "from LeaveRecords p, EmployeeInfo e";
		List<Object> conditions = new ArrayList<Object>();
		conditions.add(Constrants.DATA_NOT_DEL);
		conditions.add((long) id);
		conditions.add(Constrants.LEAVE_END_YES);
		if (date != null) {
			if (date.getStartTime() != null && !"".equals(date.getStartTime())) {
				Date date1 = TimeUtil.toDate(date.getStartTime(), 1);
				chql += "and p.startTime >= ?";
				conditions.add(date1);
			}
			if (date.getEndTime() != null && !"".equals(date.getEndTime())) {
				Date date2 = TimeUtil.getAfterDate(TimeUtil.toDate(
						date.getEndTime(), 1));
				chql += "and p.startTime < ?";
				conditions.add(date2);
			}
		}
		// 当子查询中含有from字句时请大写FROM，不然会出错
		return backPage(hql + chql + " order by p.startTime desc", page,
				conditions.toArray());
	}

	public boolean isOnlyEmail(String email, Long id) throws Exception {
		String hql = "select count(1) from EmployeeInfo p where p.email = ? and p.isDel =?";
		List<Object> list = new ArrayList<Object>();
		list.add(email);
		list.add(Constrants.DATA_NOT_DEL);
		if (id != null) {
			hql = hql + " and p.id != ?";
			list.add(id);
		}
		long count = getBaseDao().count(hql, list.toArray());
		return count == 0;
	}

	public boolean isOnlyMobileNumber(String mobileNumber, Long id)
			throws Exception {
		String hql = "select count(1) from EmployeeInfo p where p.mobileNumber = ? and p.isDel =?";
		List<Object> list = new ArrayList<Object>();
		list.add(mobileNumber);
		list.add(Constrants.DATA_NOT_DEL);
		if (id != null) {
			hql = hql + " and p.id != ?";
			list.add(id);
		}
		long count = getBaseDao().count(hql, list.toArray());
		return count == 0;
	}
	
}
