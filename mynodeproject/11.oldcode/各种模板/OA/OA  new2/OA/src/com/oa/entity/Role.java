package com.oa.entity;

// default package

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Role entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "sys_role", catalog = "ht")
public class Role implements java.io.Serializable {

	// Fields

	private Integer id;
	private String roleName;
	private Integer roleType;
	private Integer departmentId;
	private String description;
	private Deparment department;

	// Constructors

	/** default constructor */
	public Role() {
	}

	/** full constructor */
	public Role(String roleName, Integer roleType, Integer departmentId,
			String description) {
		this.roleName = roleName;
		this.roleType = roleType;
		this.departmentId = departmentId;
		this.description = description;
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

	@Column(name = "role_name", length = 45)
	public String getRoleName() {
		return this.roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	@Column(name = "role_type")
	public Integer getRoleType() {
		return this.roleType;
	}

	public void setRoleType(Integer roleType) {
		this.roleType = roleType;
	}

	@Column(name = "department_id")
	public Integer getDepartmentId() {
		return this.departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	@Column(name = "description", length = 45)
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
	@JoinColumn(name = "department_id", updatable = false, insertable = false, referencedColumnName = "id")
	public Deparment getDepartment() {
		return department;
	}

	public void setDepartment(Deparment department) {
		this.department = department;
	}

}