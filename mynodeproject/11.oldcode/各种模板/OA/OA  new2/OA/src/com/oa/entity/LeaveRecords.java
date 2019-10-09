package com.oa.entity;
// default package

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * LeaveRecords entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "leave_records", catalog = "ht")
public class LeaveRecords implements java.io.Serializable {

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

	// Constructors

	/** default constructor */
	public LeaveRecords() {
	}

	/** minimal constructor */
	public LeaveRecords(Long id) {
		this.id = id;
	}

	/** full constructor */
	public LeaveRecords(Long id, Long employeeId, String leaveReason,
			Date startTime, Date endTime, Double allHour, Integer verifyStatus,
			Integer endStatus, Integer isDel) {
		this.id = id;
		this.employeeId = employeeId;
		this.leaveReason = leaveReason;
		this.startTime = startTime;
		this.endTime = endTime;
		this.allHour = allHour;
		this.verifyStatus = verifyStatus;
		this.endStatus = endStatus;
		this.isDel = isDel;
	}

	// Property accessors
	@Id
	@Column(name = "id", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "employee_id")
	public Long getEmployeeId() {
		return this.employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	@Column(name = "leave_reason", length = 50)
	public String getLeaveReason() {
		return this.leaveReason;
	}

	public void setLeaveReason(String leaveReason) {
		this.leaveReason = leaveReason;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "start_time", length = 0)
	public Date getStartTime() {
		return this.startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "end_time", length = 0)
	public Date getEndTime() {
		return this.endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	@Column(name = "all_hour", precision = 22, scale = 0)
	public Double getAllHour() {
		return this.allHour;
	}

	public void setAllHour(Double allHour) {
		this.allHour = allHour;
	}

	@Column(name = "verify_status")
	public Integer getVerifyStatus() {
		return this.verifyStatus;
	}

	public void setVerifyStatus(Integer verifyStatus) {
		this.verifyStatus = verifyStatus;
	}

	@Column(name = "end_status")
	public Integer getEndStatus() {
		return this.endStatus;
	}

	public void setEndStatus(Integer endStatus) {
		this.endStatus = endStatus;
	}

	@Column(name = "is_del")
	public Integer getIsDel() {
		return this.isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

}