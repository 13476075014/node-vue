/**   
 * Copyright: Copyright (c) 2015 MaYang
 * 
 * @ClassName: NoticeBean.java
 * @Description: 系统公告
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

import java.io.Serializable;
import java.util.Date;

import com.oa.entity.SysNotice;
import com.oa.util.Constrants;

public class NoticeBean implements Serializable {
	private Integer id;
	private String noticeContent;
	private String userName;
	private String title;
	private String nickName;
	private Integer status;
	private Date createTime;
	private String statusStr;
	private Integer readStatus;
	private Integer userId;

	/**
	 * @param id
	 * @param noticeContent
	 * @param userName
	 * @param status
	 * @param createTime
	 */
	public NoticeBean(SysNotice notice, String userName, String nickName) {
		this.id = notice.getId();
		this.noticeContent = notice.getNoticeContent();
		this.userName = userName;
		this.statusStr = notice.getStatus() == Constrants.DATA_PUBLISH ? "已发布"
				: "未发布";
		this.status = notice.getStatus();
		this.nickName = nickName;
		this.createTime = notice.getCreateTime();
		this.title = notice.getTitle();
		this.userId = notice.getUserId();
	}
	
	public NoticeBean(Integer id, String title, String nickName, Date createTime) {
		this.id = id;
		this.title = title;
		this.nickName = nickName;
		this.createTime = createTime;
	}
	
	public NoticeBean(Integer id, String title, String nickName, Date createTime, Integer userId) {
		this.id = id;
		this.title = title;
		this.nickName = nickName;
		this.createTime = createTime;
		this.userId = userId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNoticeContent() {
		return noticeContent;
	}
	
	public void setNoticeContent(String noticeContent) {
		this.noticeContent = noticeContent;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getStatusStr() {
		return statusStr;
	}

	public void setStatusStr(String statusStr) {
		this.statusStr = statusStr;
	}


	/**
	 * @return the readStatus
	 */
	public Integer getReadStatus() {
		return readStatus;
	}

	/**
	 * @param readStatus the readStatus to set
	 */
	public void setReadStatus(Integer readStatus) {
		this.readStatus = readStatus;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}


	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
