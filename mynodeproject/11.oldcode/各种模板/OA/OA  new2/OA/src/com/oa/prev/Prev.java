package com.oa.prev;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
/**
 * 自定义权限注解类
 * @author yiping.xu
 *
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD,ElementType.TYPE})
public @interface Prev {
	/**
	 * 操作
	 * @return
	 */
	public String oprator();
	/**
	 * 模块
	 * @return
	 */
	public String module();
	/**
	 * 权限描述
	 * @return
	 */
	public String decription() default "";
}
