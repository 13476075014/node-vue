package com.oa.entity;
// default package

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * SysNoticeStatus entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="sys_notice_status"
    ,catalog="ht"
)

public class SysNoticeStatus  implements java.io.Serializable {


    // Fields    

     private Long id;
     private Integer userId;
     private Integer sysNoticeId;
     private Date createTime;

    // Constructors

    /** default constructor */
    public SysNoticeStatus() {
    }

    
    // Property accessors
    @Id @GeneratedValue(strategy=IDENTITY)
    
    @Column(name="id", unique=true, nullable=false)

    public Long getId() {
        return this.id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    @Column(name="user_id")

    public Integer getUserId() {
        return this.userId;
    }
    
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    
    @Column(name="sys_notice_id")

    public Integer getSysNoticeId() {
        return this.sysNoticeId;
    }
    
    public void setSysNoticeId(Integer sysNoticeId) {
        this.sysNoticeId = sysNoticeId;
    }


    @Column(name="create_time", length=19)
	public Date getCreateTime() {
		return createTime;
	}


	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}