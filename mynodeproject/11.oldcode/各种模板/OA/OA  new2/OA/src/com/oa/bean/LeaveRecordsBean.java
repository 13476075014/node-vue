package com.oa.bean;

// default package

import java.util.Date;

/**
 * LeaveRecords entity. @author MyEclipse Persistence Tools
 */
public class LeaveRecordsBean implements java.io.Serializable {

	// Fields

	private Long id;
	private Long employeeId;
	private String leaveReason;
	private Date startTime;
	private Date endTime;
	private Double allHour;
	private Integer verifyStatus;
	private Integer endStatus;
	private Integer isDel;
	private String employeeName;

	// Constructors

	/** default constructor */
	public LeaveRecordsBean() {
	}

	/** minimal constructor */
	public LeaveRecordsBean(Long id) {
		this.id = id;
	}

	/** full constructor */
	public LeaveRecordsBean(String employeeName, Date startTime, Date endTime, Double allHour) {
		this.employeeName = employeeName;
		this.startTime = startTime;
		this.endTime = endTime;
		this.allHour = allHour;
	}

	// Property accessors
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getEmployeeId() {
		return this.employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public String getLeaveReason() {
		return this.leaveReason;
	}

	public void setLeaveReason(String leaveReason) {
		this.leaveReason = leaveReason;
	}

	public Date getStartTime() {
		return this.startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return this.endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public Double getAllHour() {
		return this.allHour;
	}

	public void setAllHour(Double allHour) {
		this.allHour = allHour;
	}

	public Integer getVerifyStatus() {
		return this.verifyStatus;
	}

	public void setVerifyStatus(Integer verifyStatus) {
		this.verifyStatus = verifyStatus;
	}

	public Integer getEndStatus() {
		return this.endStatus;
	}

	public void setEndStatus(Integer endStatus) {
		this.endStatus = endStatus;
	}

	public Integer getIsDel() {
		return this.isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

}