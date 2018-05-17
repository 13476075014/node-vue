package com.oa.util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class ReflectUtil {

	public static List<Object> getDeclaredFieldNames(Class<?> cla){
		Field[] fields = cla.getDeclaredFields();
		List<Object> list = new ArrayList<Object>();
		for(Field f : fields){
			list.add(f.getName());
		}
		return list;
	}
}
