/**   
 * Copyright: Copyright (c) 2015 MaYang
 * 
 * @ClassName: DateEntity.java
 * @Description: 时间bean类
 *
 * @version: v1.0.0
 * @author: MaYang
 * @date: 2015-7-2 下午12:56:17
 *
 * Modification History:
 * Date         Author          Version            Description
 *---------------------------------------------------------*
 */
package com.oa.bean;

public class DateEntity {

	private String startTime;
	
	private String endTime;

	/**
	 * @return the startTime
	 */
	public String getStartTime() {
		return startTime;
	}

	/**
	 * @param startTime the startTime to set
	 */
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	/**
	 * @return the endTime
	 */
	public String getEndTime() {
		return endTime;
	}

	/**
	 * @param endTime the endTime to set
	 */
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
}
