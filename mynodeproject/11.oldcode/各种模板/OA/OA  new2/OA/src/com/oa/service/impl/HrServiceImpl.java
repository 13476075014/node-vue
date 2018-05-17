package com.oa.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.oa.entity.EmployeeInfo;
import com.oa.service.HrService;
import com.oa.util.Constrants;
import com.oa.util.PageQueryUtil;
import com.oa.util.StringTools;
import com.oa.vo.EmployeeInfoVo;

@Service("hrService")
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
public class HrServiceImpl extends BaseServiceImpl implements HrService {

	public Map<String, Object> statisticsGender() {
		String hql = "select count(case WHEN p.gender = 0 then 0 END),count(case WHEN p.gender =1 THEN 0 END) "
				+ "FROM EmployeeInfo p where p.isDel=?";
		Object[] objects = getBaseDao().getOne(hql, Constrants.DATA_NOT_DEL);
		long countMan = (Long) objects[0];
		long countWman = (Long) objects[1];
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("countMan", countMan);
		map.put("countWman", countWman);
		return map;
	}

	public Map<String, Object> findEmployeeInfoByPage(EmployeeInfo info,
			PageQueryUtil page) {
		StringBuilder sql = new StringBuilder();
		sql.append("select p.id,p.name,p.gender,p.age,p.entry_time entryTime,u.user_name userName from employee_info p left join sys_user u")
		.append(" on p.account_id = u.id where p.is_del=?");
		List<Object> list = new ArrayList<Object>();
		list.add(Constrants.DATA_NOT_DEL);
		if(!StringTools.isEmpty(info.getName())){
			sql.append(" and p.name like ?");
			list.add("%" + info.getName().trim() + "%");
		}
		if(info.getGender() != null && info.getGender() != 2){
			sql.append(" and p.gender = ?");
			list.add(info.getGender());
		}
		sql.append(" order by p.entry_time desc");
		//当子查询中含有from字句时请大写FROM，不然会出错
		return backPageSql(sql.toString(), EmployeeInfoVo.class, page, list.toArray());
	}

	@Override
	public Integer deleteEmployeeInfo(Long id) throws Exception {
		String hql = "update EmployeeInfo p set p.isDel = ? where p.id = ?";
		return getBaseDao().executeHql(hql, Constrants.DATA_DEL, id);
	}

}
