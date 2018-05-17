package com.oa.service;

import java.io.Serializable;
import java.util.List;

import com.oa.dao.BaseDAO;
public interface BaseService {
	/**
	 * 保存一个对象
	 * 
	 * @param o
	 * @return
	 */
	public Serializable save(Object o) throws Exception;

	/**
	 * 删除一个对象
	 * 
	 * @param o
	 */
	public void delete(Object o) throws Exception;

	/**
	 * 更新一个对象
	 * 
	 * @param o
	 */
	public void update(Object o) throws Exception;

	/**
	 * 保存或更新对象
	 * 
	 * @param o
	 */
	public void saveOrUpdate(Object o) throws Exception;

	/**
	 * 获得一个对象
	 * 
	 * @param c
	 *            对象类型
	 * @param id
	 * @return Object
	 */
	public <T> T get(Class<T> c, Serializable id) throws Exception;
	/**
	 * 获得一个对象
	 * 
	 * @param c
	 *            对象类型
	 * @param id
	 * @return Object
	 */
	public <T> T load(Class<T> c, Serializable id) throws Exception;

	/**
	 * 批量保存序列化对象
	 * 
	 * @param <T>
	 * @param list
	 * @throws Exception
	 */
	public <T> void batchSaveBean(List<T> list) throws Exception;
	
	public BaseDAO getBaseDao();
}
