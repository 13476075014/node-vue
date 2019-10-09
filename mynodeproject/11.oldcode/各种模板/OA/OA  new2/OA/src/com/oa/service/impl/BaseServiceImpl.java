/**   
* Copyright: Copyright (c) 2015 xlz
* 
* @ClassName: BaseServiceImpl.java
* @Description: 基础业务处理类
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

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.oa.dao.BaseDAO;
import com.oa.service.BaseService;
import com.oa.util.Constrants;
import com.oa.util.PageQueryUtil;

/**
 * 
 * @author yiping.xu 基础业务层
 * @param <T>
 */
@Service("baseService")
@Scope("prototype")
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
public class BaseServiceImpl implements BaseService {
	private BaseDAO baseDao;

	@Override
	public Serializable save(Object o) throws Exception {
		return getBaseDao().save(o);
	}

	@Override
	public void delete(Object o) throws Exception {
		getBaseDao().delete(o);

	}

	@Override
	public void update(Object o) throws Exception {
		getBaseDao().update(o);
	}

	@Override
	public void saveOrUpdate(Object o) throws Exception {
		getBaseDao().saveOrUpdate(o);

	}

	@Override
	public <T> T get(Class<T> c, Serializable id) throws Exception {
		return getBaseDao().get(c, id);
	}
	/**
	 * 获得一个对象
	 * 
	 * @param c
	 *            对象类型
	 * @param id
	 * @return Object
	 */
	public <T> T load(Class<T> c, Serializable id) throws Exception{
		return getBaseDao().load(c, id);
	}
	/**
	 * 批量保存序列化对象
	 * 
	 * @param <T>
	 * @param list
	 * @throws Exception
	 */
	@Override
	public <T> void batchSaveBean(List<T> list) throws Exception {
		getBaseDao().batchAddEnity(list);
	}
	
	public BaseDAO getBaseDao() {
		return baseDao;
	}

	@Autowired
	public void setBaseDao(@Qualifier("baseDAO") BaseDAO baseDao) {
		this.baseDao = baseDao;
	}

	/**
	 * 为传入的StringBuffer对象添加where或者and
	 * 
	 * @author MaYang
	 * @param sb   传入的StringBuffer对象，为其添加where或者and
	 * @param flag 标识符，当为false时，添加where，反之添加and
	 * @throws Exception
	 */
	protected boolean addWhereOrAnd(StringBuffer sb, boolean flag) throws Exception{
		if(flag == false){
			sb.append(" where ");
		}else{
			sb.append(" and ");
		}
		return true;
	}
	
	/**
	 * hql语句分页共用方法
	 * 
	 * @author yang.ma
	 * @param hql   
	 * @param page
	 * @param objects 
	 * @throws Exception
	 */
	protected <T> Map<String, Object> backPage(String hql, PageQueryUtil page, Object... objects) {
		return backPageHasMap(hql, page, null, objects);
	}
	
	/**
	 * hql语句分页共用方法
	 * 
	 * @author yang.ma
	 * @param hql   
	 * @param page
	 * @param objects 
	 * @throws Exception
	 */
	protected <T, V> Map<String, Object> backPageHasMap(String hql, PageQueryUtil page, Map<String, List<V>> mapCoditions, Object... objects) {
		long count;
		if(objects != null && objects.length > 0){
			count = getBaseDao().count("select count(1) " + subsHql(hql), mapCoditions, objects);
		} else {
			count = getBaseDao().count("select count(1) " + subsHql(hql), mapCoditions);
		}
		page.setTotalSize((int)count);
		if(page.getCurrentPage() > page.getTotalPage()){
			page.setCurrentPage(page.getTotalPage());
		}
		List<T> list;
		if(objects != null && objects.length > 0){
			list = getBaseDao().findByPage(hql, mapCoditions, page, objects);
		} else {
			list = getBaseDao().findByPage(hql, mapCoditions, page);
		}	
		Map<String, Object> map = new HashMap<String, Object>();
		page.setTotalSize((int) count);
		map.put(Constrants.LIST, list);
		map.put(Constrants.COUNT, count);
		map.put(Constrants.PAGE, page);
		map.put(Constrants.PAGE_STRING, pageString(page));
		return map;
	}
	
	private String subsHql(String hql){
		if(hql.substring(0, 4).equals("from")){
			return hql.substring(0);
		} else {
			return hql.substring(hql.indexOf(" from "));
		}
	}
	
	private String subsSql(String sql){
		return sql.substring(sql.indexOf(" from "));
	}
	
	/**
	 * sql语句分页共用方法
	 * 
	 * @author yang.ma
	 * @param hql   
	 * @param page
	 * @param objects 
	 * @throws Exception
	 */
	protected <T, V> Map<String, Object> backPageHasMapSql(String sql, Class<T> cls, PageQueryUtil page, Map<String, List<V>> mapCoditions, Object... objects) {
		long count;
		if(objects != null && objects.length > 0){
			count = getBaseDao().countSql("select count(1) " + subsSql(sql), mapCoditions, objects);
		} else {
			count = getBaseDao().countSql("select count(1) " + subsSql(sql), mapCoditions);
		}
		page.setTotalSize((int)count);
		if(page.getCurrentPage() > page.getTotalPage()){
			page.setCurrentPage(page.getTotalPage());
		}
		List<T> list;
		if(objects != null && objects.length > 0){
			list = getBaseDao().findByPageAndSql(sql, cls, mapCoditions, page, objects);
		} else {
			list = getBaseDao().findByPageAndSql(sql, cls, mapCoditions, page);
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		page.setTotalSize((int) count);
		map.put(Constrants.LIST, list);
		map.put(Constrants.COUNT, count);
		map.put(Constrants.PAGE, page);
		map.put(Constrants.PAGE_STRING, pageString(page));
		return map;
	}
	
	/**
	 * sql语句分页共用方法
	 * 
	 * @author yang.ma
	 * @param hql   
	 * @param page
	 * @param objects 
	 * @throws Exception
	 */
	protected <T, V> Map<String, Object> backPageSql(String sql, Class<T> cls, PageQueryUtil page, Object... objects) {
		return backPageHasMapSql(sql, cls, page, null, objects);
	}
	
	/**
	 * @Description: 获取分页字符串
	 * @author: yang.ma
	 * @date: 2015-5-15 下午3:47:14
	 */
	public String pageString(PageQueryUtil page) {
		StringBuffer buffer = new StringBuffer();
		buffer.append("<li><a href='javascript:void(0);' onclick='toStart()'>首页</a></li>");
		if (page.getCurrentPage() == 1) {
			buffer.append("<li class='am-disabled'><a class='page_s' href='javascript:void(0);'>«</a></li>");
		} else {
			buffer.append(
					"<li><a class='page_s' href='javascript:void(0);' lang='")
					.append(page.getCurrentPage() - 1).append("'>«</a></li>");
		}
		for (int i = page.getStart(); i < page.getEnd(); i++) {
			if (i == page.getCurrentPage()) {
				buffer.append(
						"<li class='am-active'><a class='page_s' href='javascript:void(0);' lang='")
						.append(i).append("'>").append(i).append("</a></li>");
			} else {
				buffer.append(
						"<li><a class='page_s' href='javascript:void(0);' lang='")
						.append(i).append("'>").append(i).append("</a></li>");
			}
		}
		if (page.getCurrentPage() >= page.getTotalPage()) {
			buffer.append("<li class='am-disabled'><a class='page_s' href='javascript:void(0);'>»</a>");
		} else {
			buffer.append(
					"<li><a class='page_s' href='javascript:void(0);' lang='")
					.append(page.getCurrentPage() + 1).append("'>»</a></li>");
		}
		buffer.append("<li><a onclick='toEnd()' href='javascript:void(0);'>尾页</a></li>");
		return buffer.toString();
	}
}
