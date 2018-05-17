package com.oa.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

import com.oa.validate.Email;
import com.oa.validate.NotNull;
import com.oa.validate.PhoneNumber;
import com.oa.validate.PlusNumber;
import com.oa.validate.Str;

/**
 * EmployeeInfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "employee_info", catalog = "ht")
public class EmployeeInfo implements java.io.Serializable {

	// Fields

	private Long id;
	
	@NotNull("姓名")
	@Str(minLength = 2, maxLength = 5, mesName = "姓名")
	private String name;
	
	@NotNull(value = "身份证号")
	private String idCard;
	
	@PlusNumber(minLen = 18, maxLen = 75, value = "年龄")
	@NotNull("年龄")
	private Integer age;
	private Integer gender;
	private Date entryTime;
	private Long accountId;
	
	@PlusNumber
	private Double performance;
	
	@PlusNumber
	private Double positionSalary;
	
	@PlusNumber(value = "基本工资")
	@NotNull(value = "基本工资")
	private Double baseSalary;
	
	@PlusNumber
	private String qqNumber;
	
	@NotNull("手机号")
	@PhoneNumber
	private String mobileNumber;
	
	@NotNull("邮箱名")
	@Email
	private String email;
	private Integer isDel;

	// Constructors

	/** default constructor */
	public EmployeeInfo() {
	}

	/** minimal constructor */
	public EmployeeInfo(String name, String mobileNumber, String email) {
		this.name = name;
		this.mobileNumber = mobileNumber;
		this.email = email;
	}

	/** full constructor */
	public EmployeeInfo(String name, Integer age, Integer gender,
			Date entryTime, Long accountId, String mobileNumber,
			String email, Integer isDel) {
		this.name = name;
		this.age = age;
		this.gender = gender;
		this.entryTime = entryTime;
		this.accountId = accountId;
		this.mobileNumber = mobileNumber;
		this.email = email;
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

	@Column(name = "name", nullable = false, length = 10)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "age")
	public Integer getAge() {
		return this.age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	@Column(name = "gender")
	public Integer getGender() {
		return this.gender;
	}

	public void setGender(Integer gender) {
		this.gender = gender;
	}

	@Column(name = "entry_time", length = 19)
	public Date getEntryTime() {
		return this.entryTime;
	}

	public void setEntryTime(Date entryTime) {
		this.entryTime = entryTime;
	}

	@Column(name = "account_id")
	public Long getAccountId() {
		return this.accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	@Column(name = "mobile_number", nullable = false)
	public String getMobileNumber() {
		return this.mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	@Column(name = "email", nullable = false)
	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "is_del")
	public Integer getIsDel() {
		return this.isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

	@Column(name = "id_card")
	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	@Column(name = "performance")
	public Double getPerformance() {
		return performance;
	}

	public void setPerformance(Double performance) {
		this.performance = performance;
	}

	@Column(name = "position_salary")
	public Double getPositionSalary() {
		return positionSalary;
	}

	public void setPositionSalary(Double positionSalary) {
		this.positionSalary = positionSalary;
	}

	@Column(name = "base_salary")
	public Double getBaseSalary() {
		return baseSalary;
	}

	public void setBaseSalary(Double baseSalary) {
		this.baseSalary = baseSalary;
	}

	@Column(name = "qq_number", length = 20)
	public String getQqNumber() {
		return qqNumber;
	}

	public void setQqNumber(String qqNumber) {
		this.qqNumber = qqNumber;
	}

}