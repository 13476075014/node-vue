package com.oa.bean;

import java.util.Date;

/**
 * EmployeeSalary entity. @author MyEclipse Persistence Tools
 */
public class EmployeeSalaryBean implements java.io.Serializable {

	// Fields

	private Long id;
	private Long employeeId;
	private Date grantTime;
	private Date createTime;
	private Double insuranceMoney;
	private Double performance;
	private Double taxMoney;
	private Double leaveMoney;
	private Double totalMoney;
	private Double moneyNumber;
	private Double otherMoney;
	private Long createUserId;
	private Date updateTime;
	private Long updateUserId;
	private Integer isDel;
	private String employeeName;

	// Constructors

	/** default constructor */
	public EmployeeSalaryBean() {
	}

	/** minimal constructor */
	public EmployeeSalaryBean(Long employeeId, Date grantTime) {
		this.employeeId = employeeId;
		this.grantTime = grantTime;
	}

	/** full constructor */
	public EmployeeSalaryBean(Long employeeId, Date grantTime,
			Date createTime, Double insuranceMoney, Double performance,
			Double taxMoney, Double leaveMoney, Double totalMoney,
			Double moneyNumber, Long createUserId, Date updateTime,
			Long updateUserId, Integer isDel) {
		this.employeeId = employeeId;
		this.grantTime = grantTime;
		this.createTime = createTime;
		this.insuranceMoney = insuranceMoney;
		this.performance = performance;
		this.taxMoney = taxMoney;
		this.leaveMoney = leaveMoney;
		this.totalMoney = totalMoney;
		this.moneyNumber = moneyNumber;
		this.createUserId = createUserId;
		this.updateTime = updateTime;
		this.updateUserId = updateUserId;
		this.isDel = isDel;
	}
	
	public EmployeeSalaryBean(String employeeName, Date grantTime,
			Double insuranceMoney, Double performance,
			Double taxMoney, Double leaveMoney, Double totalMoney,
			Double moneyNumber, Double otherMoney) {
		this.employeeName = employeeName;
		this.grantTime = grantTime;
		this.insuranceMoney = insuranceMoney;
		this.performance = performance;
		this.taxMoney = taxMoney;
		this.leaveMoney = leaveMoney;
		this.totalMoney = totalMoney;
		this.moneyNumber = moneyNumber;
		this.otherMoney = otherMoney;
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

	public Date getGrantTime() {
		return this.grantTime;
	}

	public void setGrantTime(Date grantTime) {
		this.grantTime = grantTime;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Double getInsuranceMoney() {
		return this.insuranceMoney;
	}

	public void setInsuranceMoney(Double insuranceMoney) {
		this.insuranceMoney = insuranceMoney;
	}

	public Double getPerformance() {
		return this.performance;
	}

	public void setPerformance(Double performance) {
		this.performance = performance;
	}

	public Double getTaxMoney() {
		return this.taxMoney;
	}

	public void setTaxMoney(Double taxMoney) {
		this.taxMoney = taxMoney;
	}

	public Double getLeaveMoney() {
		return this.leaveMoney;
	}

	public void setLeaveMoney(Double leaveMoney) {
		this.leaveMoney = leaveMoney;
	}

	public Double getTotalMoney() {
		return this.totalMoney;
	}

	public void setTotalMoney(Double totalMoney) {
		this.totalMoney = totalMoney;
	}

	public Double getMoneyNumber() {
		return this.moneyNumber;
	}

	public void setMoneyNumber(Double moneyNumber) {
		this.moneyNumber = moneyNumber;
	}

	public Long getCreateUserId() {
		return this.createUserId;
	}

	public void setCreateUserId(Long createUserId) {
		this.createUserId = createUserId;
	}

	public Date getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Long getUpdateUserId() {
		return this.updateUserId;
	}

	public void setUpdateUserId(Long updateUserId) {
		this.updateUserId = updateUserId;
	}

	public Integer getIsDel() {
		return this.isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

	public Double getOtherMoney() {
		return otherMoney;
	}

	public void setOtherMoney(Double otherMoney) {
		this.otherMoney = otherMoney;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

}