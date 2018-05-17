/**   
 * Copyright: Copyright (c) 2015 lianxin
 * 
 * @ClassName: StringTools.java
 * @Description: 用户管理类
 *
 * @version: v1.0.0
 * @author: MaYang
 * @date: 2015-7-24 下午2:17:57
 *
 * Modification History:
 * Date         Author          Version            Description
 *---------------------------------------------------------*
 */
package com.oa.util;

import java.lang.reflect.Field;
import java.util.UUID;

public class StringTools {

	public static boolean isEmpty(String str) {
		if (str == null || str.trim().equals("")) {
			return true;
		}
		return false;
	}

	public static boolean equalsWithTrim(String str1, String str2) {
		return str1.trim().equals(str2.trim());
	}

	public static boolean isHasEmpty(String... strings) {
		if (strings == null || strings.length == 0) {
			return true;
		}
		for (int i = 0; i < strings.length; i++) {
			if (isEmpty(strings[i])) {
				return true;
			}
		}
		return false;
	}

	public static boolean isAllEmpty(String... strings) {
		for (int i = 0; i < strings.length; i++) {
			if (!isEmpty(strings[i])) {
				return false;
			}
		}
		return true;
	}

	public static String getUUID32() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	/**
	 * NULL字符串转换，参数对象为null时，返回空字符串
	 * 
	 * @param o
	 *            转换原对象
	 * @return 字符串
	 */
	public static String nvl(Object o) {
		if (o == null) {
			return "";
		}
		return o.toString().trim();
	}

	public static boolean isNumeric(String str) {
		for (int i = str.length(); --i >= 0;) {
			if (!Character.isDigit(str.charAt(i))) {
				return false;
			}
		}
		return true;
	}
	
	public static <T> T trim(T t){
		Class<?> cla = t.getClass();
		Field[] fields = cla.getDeclaredFields();
		for(int i = 0; i<fields.length; i++){
			Field f = fields[i];
			f.setAccessible(true);
			try {
				Object o = f.get(t);
				if(o == null){
					continue;
				}
				if(o instanceof String){
					f.set(t, o.toString().trim());
				}
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		return t;
	}

}
