package com.oa.validate;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface PlusNumber {
	
	String key() default "";
	
	String value() default "输入值";
	
	int minLen() default -1;
	
	int maxLen() default -1;
}
