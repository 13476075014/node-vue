package com.oa.menu;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
/**
 * 自定义菜单状态注解类
 * @author yiping.xu
 *
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD,ElementType.TYPE})
public @interface Module {
	/**
	 * 模块
	 * @return
	 */
	public String value();
}
