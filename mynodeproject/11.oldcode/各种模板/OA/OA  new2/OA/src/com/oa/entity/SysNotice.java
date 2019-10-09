package com.oa.entity;

// default package

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * SysNotice entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "sys_notice", catalog = "ht")
public class SysNotice implements java.io.Serializable {

	// Fields

	private Integer id;
	private String noticeContent;
	private Integer userId;
	private String title;
	private Integer status;
	private Date createTime;
	private Integer isDel;

	// Constructors

	/** default constructor */
	public SysNotice() {
	}

	/** full constructor */
	public SysNotice(String noticeContent, Integer userId, Integer status,
			Date createTime, Integer isDel,String title) {
		this.noticeContent = noticeContent;
		this.userId = userId;
		this.status = status;
		this.createTime = createTime;
		this.isDel = isDel;
		this.title = title;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "notice_content", length = 65535)
	public String getNoticeContent() {
		return this.noticeContent;
	}

	public void setNoticeContent(String noticeContent) {
		this.noticeContent = noticeContent;
	}

	@Column(name = "user_id")
	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	@Column(name = "status")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name = "create_time", length = 19)
	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Column(name = "is_del")
	public Integer getIsDel() {
		return isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

	@Column(name = "title", length = 100)
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}