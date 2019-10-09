package com.oa.entity;

// default package

import static javax.persistence.GenerationType.IDENTITY;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Privilege entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "sys_privilege", catalog = "ht", uniqueConstraints = @UniqueConstraint(columnNames = {
		"module", "oprator" }))
@Cache(usage=CacheConcurrencyStrategy.READ_WRITE)
public class Privilege implements java.io.Serializable {

	// Fields

	private Integer id;
	private String module;
	private String oprator;
	private Integer parentId;
	private String prevName;
	private Set<Privilege> prevs = new HashSet<Privilege>();

	// Constructors

	/** default constructor */
	public Privilege() {
	}

	public Privilege(PrivilegePK privilegePK) {
		this.module = privilegePK.getModule();
		this.oprator = privilegePK.getOprator();
	}

	public Privilege(String module, String oprator, String prevName,
			Integer parentId) {
		this.module = module;
		this.oprator = oprator;
		this.parentId = parentId;
		this.prevName = prevName;
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

	@Column(name = "module", length = 45)
	public String getModule() {
		return this.module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	@Column(name = "oprator", length = 45)
	public String getOprator() {
		return this.oprator;
	}

	public void setOprator(String oprator) {
		this.oprator = oprator;
	}

	@Column(name = "prev_name", length = 45)
	public String getPrevName() {
		return prevName;
	}

	public void setPrevName(String prevName) {
		this.prevName = prevName;
	}

	@Column(name = "parent_id")
	public Integer getParentId() {
		return this.parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	@OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY, mappedBy = "parentId")
	public Set<Privilege> getPrevs() {
		return prevs;
	}

	public void setPrevs(Set<Privilege> prevs) {
		this.prevs = prevs;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((module == null) ? 0 : module.hashCode());
		result = prime * result + ((oprator == null) ? 0 : oprator.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Privilege other = (Privilege) obj;
		if (module == null) {
			if (other.module != null)
				return false;
		} else if (!module.equals(other.module))
			return false;
		if (oprator == null) {
			if (other.oprator != null)
				return false;
		} else if (!oprator.equals(other.oprator))
			return false;
		return true;
	}

}