package com.oa.vo;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

public class EmployeeInfoVo implements Serializable {

	private static final long serialVersionUID = 7965572402734602507L;

	private Long id;
	private String name;
	private String idCard;
	private Integer age;
	private Integer gender;
	private Date entryTime;
	private Integer accountId;
	private Double performance;
	private Double positionSalary;
	private Double baseSalary;
	private String qqNumber;
	private String mobileNumber;
	private String email;
	private Integer isDel;
	private String userName;
	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(BigInteger id) {
		this.id = id.longValue();
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the idCard
	 */
	public String getIdCard() {
		return idCard;
	}
	/**
	 * @param idCard the idCard to set
	 */
	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	/**
	 * @return the age
	 */
	public Integer getAge() {
		return age;
	}
	/**
	 * @param age the age to set
	 */
	public void setAge(Integer age) {
		this.age = age;
	}
	/**
	 * @return the gender
	 */
	public Integer getGender() {
		return gender;
	}
	/**
	 * @param gender the gender to set
	 */
	public void setGender(Integer gender) {
		this.gender = gender;
	}
	/**
	 * @return the entryTime
	 */
	public Date getEntryTime() {
		return entryTime;
	}
	/**
	 * @param entryTime the entryTime to set
	 */
	public void setEntryTime(Date entryTime) {
		this.entryTime = entryTime;
	}
	/**
	 * @return the accountId
	 */
	public Integer getAccountId() {
		return accountId;
	}
	/**
	 * @param accountId the accountId to set
	 */
	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}
	/**
	 * @return the performance
	 */
	public Double getPerformance() {
		return performance;
	}
	/**
	 * @param performance the performance to set
	 */
	public void setPerformance(Double performance) {
		this.performance = performance;
	}
	/**
	 * @return the positionSalary
	 */
	public Double getPositionSalary() {
		return positionSalary;
	}
	/**
	 * @param positionSalary the positionSalary to set
	 */
	public void setPositionSalary(Double positionSalary) {
		this.positionSalary = positionSalary;
	}
	/**
	 * @return the baseSalary
	 */
	public Double getBaseSalary() {
		return baseSalary;
	}
	/**
	 * @param baseSalary the baseSalary to set
	 */
	public void setBaseSalary(Double baseSalary) {
		this.baseSalary = baseSalary;
	}
	/**
	 * @return the qqNumber
	 */
	public String getQqNumber() {
		return qqNumber;
	}
	/**
	 * @param qqNumber the qqNumber to set
	 */
	public void setQqNumber(String qqNumber) {
		this.qqNumber = qqNumber;
	}
	/**
	 * @return the mobileNumber
	 */
	public String getMobileNumber() {
		return mobileNumber;
	}
	/**
	 * @param mobileNumber the mobileNumber to set
	 */
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * @return the isDel
	 */
	public Integer getIsDel() {
		return isDel;
	}
	/**
	 * @param isDel the isDel to set
	 */
	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}
	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}
	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}	
	
}
