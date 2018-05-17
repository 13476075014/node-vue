package com.oa.entity;

import java.io.Serializable;
import java.util.List;

/**
 * 分页查询信息保存容器
 * @author lianxin
 *
 */
public class PageMode<T> implements Serializable {
	private Long count;
	private List<T> records;
	
	public PageMode() {
	}
	public PageMode(Long count, List<T> records) {
		this.count = count;
		this.records = records;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public List<T> getRecords() {
		return records;
	}

	public void setRecords(List<T> records) {
		this.records = records;
	}
	
	
}
