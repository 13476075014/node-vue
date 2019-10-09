/**   
 * Copyright: Copyright (c) 2015 xlz
 * 
 * @ClassName: BaseDAOImpl.java
 * @Description: 数据库操作统一类
 *
 * @version: v1.0.0
 * @author: xuyiping
 * @date: 2015-4-20 上午9:37:24 
 *
 * Modification History:
 * Date         Author          Version            Description
 *---------------------------------------------------------*
 * 2014-1-13     xuyiping           v1.0.0               修改原因
 */
package com.oa.dao.impl;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.oa.dao.BaseDAO;
import com.oa.util.Constrants;
import com.oa.util.IPage;

@Repository("baseDAO")
public class BaseDAOImpl implements BaseDAO {

	@Autowired
	private @Qualifier("sessionFactory")
	SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}

	private void flushAndClear() {
		this.getCurrentSession().flush();
		this.getCurrentSession().clear();
	}

	public Serializable save(Object o) {
		return this.getCurrentSession().save(o);
	}

	public void delete(Object o) {
		this.getCurrentSession().delete(o);
		this.getCurrentSession().flush();
	}

	public void update(Object o) {
		this.getCurrentSession().update(o);
		this.getCurrentSession().flush();
	}

	public void saveOrUpdate(Object o) {
		this.getCurrentSession().saveOrUpdate(o);
		this.getCurrentSession().flush();
	}

	protected <K> Query setParam(String hql, Map<String, List<K>> map,
			Object... param) {
		Query q = this.getCurrentSession().createQuery(hql);
		if (param != null && param.length > 0) {
			for (int i = 0; i < param.length; i++) {
				if (param[i] instanceof Date) {
					q.setTimestamp(i, (Date) param[i]);
				} else {
					q.setParameter(i, param[i]);
				}
			}
		}
		if (map != null) {
			Set<Map.Entry<String, List<K>>> en = map.entrySet();
			Iterator<Map.Entry<String, List<K>>> tor = en.iterator();
			while (tor.hasNext()) {
				Map.Entry<String, List<K>> entor = tor.next();
				q.setParameterList(entor.getKey(), entor.getValue());
			}
		}
		return q;
	}

	@SuppressWarnings("unchecked")
	public <T> List<T> getAll(Class<T> cla) {
		return this.getCurrentSession().createCriteria(cla).list();
	}

	public <T> List<T> find(String hql, Object... param) {
		return find(hql, null, param);
	}

	@SuppressWarnings("unchecked")
	public <T> List<T> findCache(String hql, Object... param) {
		return setParam(hql, null, param).setCacheable(true).list();
	}

	/**
	 * 查询集合
	 * 
	 * @param <K>
	 * @param hql
	 * @param map
	 *            集合参数
	 * @param param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <T, K> List<T> find(String hql, Map<String, List<K>> map,
			Object... param) {
		return setParam(hql, map, param).list();
	}

	/**
	 * 分页查询
	 * 
	 * @param <K>
	 * @param hql
	 * @param map
	 *            集合参数
	 * @param param
	 * @param page
	 * @param rows
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <T, K> List<T> findByPage(String hql, Map<String, List<K>> map,
			IPage page, Object... param) {
		return setParam(hql, map, param).setFirstResult(page.getFirstResult())
				.setMaxResults(page.getPageSize()).list();
	}

	public <T> List<T> findByPage(String hql, IPage page, Object... param) {
		return findByPage(hql, null, page, param);
	}

	@SuppressWarnings("unchecked")
	public <T> T get(Class<T> c, Serializable id) {
		return (T) this.getCurrentSession().get(c, id);
	}

	@SuppressWarnings("unchecked")
	public <T> T load(Class<T> c, Serializable id) {
		return (T) this.getCurrentSession().load(c, id);
	}

	public <T> T getOne(String hql, Object... param) {
		List<T> l = this.find(hql, param);
		if (l != null && l.size() > 0) {
			return l.get(0);
		} else {
			return null;
		}
	}

	public Long count(String hql, Object... param) {
		return count(hql, null, param);
	}

	public <T> Long count(String hql, Map<String, List<T>> map, Object... param) {
		return (Long) setParam(hql, map, param).uniqueResult();
	}

	public Integer executeHql(String hql, Object... param) {
		return executeHql(hql, null, param);
	}

	/**
	 * 执行增删改操作
	 * 
	 * @param hql
	 * @param map
	 * @param param
	 * @author MaYang
	 * 
	 * @return
	 */
	public <T> Integer executeHql(String hql, Map<String, List<T>> map,
			Object... param) {
		return setParam(hql, map, param).executeUpdate();
	}

	/**
	 * 批量添加实体信息
	 * 
	 * @param <T>
	 * @param list
	 * @throws Exception
	 */
	public <T> void batchAddEnity(final List<T> list) throws Exception {
		int count = 0;
		for (T t : list) {
			count++;
			this.saveOrUpdate(t);
			if (count % 5 == 0) {
				this.flushAndClear();
			}
		}
	}

	/**
	 * 批量添加实体信息
	 * 
	 * @param <T>
	 * @param list
	 * @throws Exception
	 */
	public <T> void batchSaveEnity(final Set<T> list) throws Exception {
		int count = 0;
		for (T t : list) {
			count++;
			this.save(t);
			if (count % 5 == 0) {
				this.flushAndClear();
			}
		}
	}

	/**
	 * 批量删除实体信息
	 * 
	 * @param <T>
	 * @param list
	 * @throws Exception
	 */
	public <T> void batchDeleteEnity(final List<T> list) throws Exception {
		int count = 0;
		for (T t : list) {
			count++;
			this.delete(t);
			if (count % 5 == 0) {
				this.flushAndClear();
			}
		}
	}

	protected <K> Query setParamSql(String sql, Map<String, List<K>> map,
			Object... param) {
		Query q = this.getCurrentSession().createSQLQuery(sql);
		if (param != null && param.length > 0) {
			for (int i = 0; i < param.length; i++) {
				if (param[i] instanceof Date) {
					q.setTimestamp(i, (Date) param[i]);
				} else {
					q.setParameter(i, param[i]);
				}
			}
		}
		if (map != null) {
			Set<Map.Entry<String, List<K>>> en = map.entrySet();
			Iterator<Map.Entry<String, List<K>>> tor = en.iterator();
			while (tor.hasNext()) {
				Map.Entry<String, List<K>> entor = tor.next();
				q.setParameterList(entor.getKey(), entor.getValue());
			}
		}
		return q;
	}

	@SuppressWarnings("unchecked")
	public <T, K> List<T> findByPageAndSql(String sql, Class<T> cls,
			Map<String, List<K>> map, IPage page, Object... param) {
		return setParamSql(sql, map, param)
				.setResultTransformer(Transformers.aliasToBean(cls))
				.setFirstResult(page.getFirstResult())
				.setMaxResults(page.getPageSize()).list();
	}

	public <T, K> List<T> findByPageAndSql(String sql, Class<T> cls,
			IPage page, Object... param) {
		return findByPageAndSql(sql, cls, null, page, param);
	}

	public <T> Long countSql(String sql, Map<String, List<T>> map,
			Object... param) {
		return ((BigInteger)setParamSql(sql, map, param).uniqueResult()).longValue();
	}

	public <T> Long countSql(String sql, Object... param) {
		return countSql(sql, null, param);
	}
	
	public void delete(Class<?> cla, Long... ids) {
		String claName = cla.getSimpleName();
		String hql = "update "+ claName + " p set p.isDel = ? where p.id = ?";
		for(int i = 0; i < ids.length; i++){
			executeHql(hql, Constrants.DATA_DEL, ids[i]);
			if(i % 50 == 0){
				this.flushAndClear();
			}
		}
	}

}
