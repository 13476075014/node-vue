package com.oa.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * EmployeeSalary entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "employee_salary", catalog = "ht")
public class EmployeeSalary implements java.io.Serializable {

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

	// Constructors

	/** default constructor */
	public EmployeeSalary() {
	}

	/** minimal constructor */
	public EmployeeSalary(Long employeeId, Date grantTime) {
		this.employeeId = employeeId;
		this.grantTime = grantTime;
	}

	/** full constructor */
	public EmployeeSalary(Long employeeId, Date grantTime,
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

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "employee_id", nullable = false)
	public Long getEmployeeId() {
		return this.employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	@Column(name = "grant_time", nullable = false, length = 19)
	public Date getGrantTime() {
		return this.grantTime;
	}

	public void setGrantTime(Date grantTime) {
		this.grantTime = grantTime;
	}

	@Column(name = "create_time", length = 19)
	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Column(name = "insurance_money", precision = 22, scale = 0)
	public Double getInsuranceMoney() {
		return this.insuranceMoney;
	}

	public void setInsuranceMoney(Double insuranceMoney) {
		this.insuranceMoney = insuranceMoney;
	}

	@Column(name = "performance", precision = 22, scale = 0)
	public Double getPerformance() {
		return this.performance;
	}

	public void setPerformance(Double performance) {
		this.performance = performance;
	}

	@Column(name = "tax_money", precision = 22, scale = 0)
	public Double getTaxMoney() {
		return this.taxMoney;
	}

	public void setTaxMoney(Double taxMoney) {
		this.taxMoney = taxMoney;
	}

	@Column(name = "leave_money", precision = 22, scale = 0)
	public Double getLeaveMoney() {
		return this.leaveMoney;
	}

	public void setLeaveMoney(Double leaveMoney) {
		this.leaveMoney = leaveMoney;
	}

	@Column(name = "total_money", precision = 22, scale = 0)
	public Double getTotalMoney() {
		return this.totalMoney;
	}

	public void setTotalMoney(Double totalMoney) {
		this.totalMoney = totalMoney;
	}

	@Column(name = "money_number", precision = 22, scale = 0)
	public Double getMoneyNumber() {
		return this.moneyNumber;
	}

	public void setMoneyNumber(Double moneyNumber) {
		this.moneyNumber = moneyNumber;
	}

	@Column(name = "create_user_id")
	public Long getCreateUserId() {
		return this.createUserId;
	}

	public void setCreateUserId(Long createUserId) {
		this.createUserId = createUserId;
	}

	@Column(name = "update_time", length = 19)
	public Date getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	@Column(name = "update_user_id")
	public Long getUpdateUserId() {
		return this.updateUserId;
	}

	public void setUpdateUserId(Long updateUserId) {
		this.updateUserId = updateUserId;
	}

	@Column(name = "is_del")
	public Integer getIsDel() {
		return this.isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

	@Column(name = "other_money")
	public Double getOtherMoney() {
		return otherMoney;
	}

	public void setOtherMoney(Double otherMoney) {
		this.otherMoney = otherMoney;
	}

}