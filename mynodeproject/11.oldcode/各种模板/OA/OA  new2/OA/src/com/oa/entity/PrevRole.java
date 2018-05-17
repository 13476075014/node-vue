package com.oa.entity;
// default package

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * PrevRole entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="sys_prev_role"
    ,catalog="ht"
)

public class PrevRole  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private Integer roleId;
     private Integer prevId;

    // Constructors

    /** default constructor */
    public PrevRole() {
    }

    
    /** full constructor */
    public PrevRole(Integer roleId, Integer prevId) {
        this.roleId = roleId;
        this.prevId = prevId;
    }

   
    // Property accessors
    @Id @GeneratedValue(strategy=IDENTITY)
    
    @Column(name="id", unique=true, nullable=false)

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    @Column(name="role_id")

    public Integer getRoleId() {
        return this.roleId;
    }
    
    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
    
    @Column(name="prev_id")

    public Integer getPrevId() {
        return this.prevId;
    }
    
    public void setPrevId(Integer prevId) {
        this.prevId = prevId;
    }


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((prevId == null) ? 0 : prevId.hashCode());
		result = prime * result + ((roleId == null) ? 0 : roleId.hashCode());
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
		PrevRole other = (PrevRole) obj;
		if (prevId == null) {
			if (other.prevId != null)
				return false;
		} else if (!prevId.equals(other.prevId))
			return false;
		if (roleId == null) {
			if (other.roleId != null)
				return false;
		} else if (!roleId.equals(other.roleId))
			return false;
		return true;
	}



}