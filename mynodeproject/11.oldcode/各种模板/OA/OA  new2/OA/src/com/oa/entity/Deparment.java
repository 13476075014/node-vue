package com.oa.entity;
// default package

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * Deparment entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="sys_prev_deparment"
    ,catalog="ht"
)

public class Deparment  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private String dpName;
     private Integer isDel;

    // Constructors

    /** default constructor */
    public Deparment() {
    }

    
    /** full constructor */
    public Deparment(String dpName) {
        this.dpName = dpName;
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
    
    @Column(name="dp_name", length=45)

    public String getDpName() {
        return this.dpName;
    }
    
    public void setDpName(String dpName) {
        this.dpName = dpName;
    }

    @Column(name="is_del")
	public Integer getIsDel() {
		return isDel;
	}


	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}
   








}