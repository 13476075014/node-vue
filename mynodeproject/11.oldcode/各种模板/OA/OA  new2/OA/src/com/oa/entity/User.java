package com.oa.entity;

// default package

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * User entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "sys_user", catalog = "ht", uniqueConstraints = @UniqueConstraint(columnNames = "user_name"))
public class User implements java.io.Serializable {

	// Fields

	private Integer id;
	private String userName;
	private String password;
	private Integer userType;
	private Integer dpId;
	private Integer userStatus;
	private Date createTime;
	private Date modifyTime;
	private Date loginTime;
	private String nickName;
	private Integer isDel;

	private Deparment department;

	// Constructors

	/** default constructor */
	public User() {
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "user_name", unique = true, length = 45)
	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Column(name = "password", length = 45)
	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "user_type")
	public Integer getUserType() {
		return this.userType;
	}

	public void setUserType(Integer userType) {
		this.userType = userType;
	}

	@Column(name = "dp_id")
	public Integer getDpId() {
		return this.dpId;
	}

	public void setDpId(Integer dpId) {
		this.dpId = dpId;
	}

	@Column(name = "user_status")
	public Integer getUserStatus() {
		return this.userStatus;
	}

	public void setUserStatus(Integer userStatus) {
		this.userStatus = userStatus;
	}

	@Column(name = "create_time", length = 19)
	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Column(name = "modify_time", length = 19)
	public Date getModifyTime() {
		return this.modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	@Column(name = "login_time", length = 19)
	public Date getLoginTime() {
		return this.loginTime;
	}

	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}

	@Column(name = "nick_name", length = 45)
	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "dp_id", insertable = false, updatable = false)
	public Deparment getDepartment() {
		return department;
	}

	public void setDepartment(Deparment department) {
		this.department = department;
	}

	@Column(name = "is_del")
	public Integer getIsDel() {
		return isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

}