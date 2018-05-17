package com.oa.entity;

import java.io.Serializable;

import javax.annotation.Generated;
/**
 * 权限实体
 * @author yiping xu
 *
 */
public class PrivilegePK implements Serializable {
	/**
	 * 模块
	 */
	private String module;
	/**
	 * 权限
	 */
	private String oprator;

	public PrivilegePK() {

	}

	public PrivilegePK(String module, String oprator) {
		this.module = module;
		this.oprator = oprator;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public String getOprator() {
		return oprator;
	}

	public void setOprator(String oprator) {
		this.oprator = oprator;
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
		PrivilegePK other = (PrivilegePK) obj;
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
