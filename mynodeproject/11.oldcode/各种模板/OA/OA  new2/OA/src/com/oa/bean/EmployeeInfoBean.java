package com.oa.bean;

import java.util.Date;

/**
 * EmployeeInfo entity. @author MyEclipse Persistence Tools
 */
public class EmployeeInfoBean implements java.io.Serializable {

	// Fields

	private Long id;
	private String name;
	private String idCard;
	private Integer age;
	private Integer gender;
	private Date entryTime;
	private Long accountId;
	private Double performance;
	private Double positionSalary;
	private Double baseSalary;
	private String qqNumber;
	private String mobileNumber;
	private String email;
	private Integer isDel;
	private String acountName;

	// Constructors

	/** default constructor */
	public EmployeeInfoBean() {
	}
	
	public EmployeeInfoBean(String name, String mobileNumber, String email, String qqNumber) {
		this.name = name;
		this.mobileNumber = mobileNumber;
		this.email = email;
		this.qqNumber = qqNumber;
	}

	/** full constructor */
	public EmployeeInfoBean(String name,String idCard, Integer age, Integer gender,
			Date entryTime, String mobileNumber, String email,
			String acountName, Double performance, Double positionSalary,
			Double baseSalary, String qqNumber) {
		this.name = name;
		this.idCard = idCard;
		this.age = age;
		this.gender = gender;
		this.entryTime = entryTime;
		this.mobileNumber = mobileNumber;
		this.email = email;
		this.acountName = acountName;
		this.performance = performance;
		this.positionSalary = positionSalary;
		this.baseSalary = baseSalary;
		this.qqNumber = qqNumber;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
		return this.age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public Integer getGender() {
		return this.gender;
	}

	public void setGender(Integer gender) {
		this.gender = gender;
	}

	public Date getEntryTime() {
		return this.entryTime;
	}

	public void setEntryTime(Date entryTime) {
		this.entryTime = entryTime;
	}

	public Long getAccountId() {
		return this.accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getMobileNumber() {
		return this.mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getIsDel() {
		return this.isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public Double getPerformance() {
		return performance;
	}

	public void setPerformance(Double performance) {
		this.performance = performance;
	}

	public Double getPositionSalary() {
		return positionSalary;
	}

	public void setPositionSalary(Double positionSalary) {
		this.positionSalary = positionSalary;
	}

	public Double getBaseSalary() {
		return baseSalary;
	}

	public void setBaseSalary(Double baseSalary) {
		this.baseSalary = baseSalary;
	}

	public String getAcountName() {
		return acountName;
	}

	public void setAcountName(String acountName) {
		this.acountName = acountName;
	}

	public String getQqNumber() {
		return qqNumber;
	}

	public void setQqNumber(String qqNumber) {
		this.qqNumber = qqNumber;
	}

}