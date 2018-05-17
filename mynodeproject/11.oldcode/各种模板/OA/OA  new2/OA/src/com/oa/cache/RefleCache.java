package com.oa.cache;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import com.oa.util.Constrants;
import com.oa.util.ReflectUtil;

public class RefleCache {

	public static HashMap<String, HashMap<String, Object[]>> classes = new HashMap<String, HashMap<String, Object[]>>();
	
	public static boolean contain(Class<?> cla, String fieldName){
		String claName = cla.getSimpleName();
		boolean flag = true;
		if(RefleCache.classes.get(claName) != null ){
			HashMap<String, Object[]> map = RefleCache.classes.get(claName);
			if(map.get(Constrants.FIELDS) != null){
				if(!Arrays.asList(map.get(Constrants.FIELDS)).contains(fieldName)){
					flag = false;
				}
			} else {
				List<Object> list = ReflectUtil.getDeclaredFieldNames(cla);
				if(!list.contains(fieldName)){
					flag = false;
				}
				map.put(Constrants.FIELDS , list.toArray());
			}
		} else {
			List<Object> list = ReflectUtil.getDeclaredFieldNames(cla);
			if(!list.contains(fieldName)){
				flag = false;
			}
			HashMap<String, Object[]> map = new HashMap<String, Object[]>();
			map.put(Constrants.FIELDS , list.toArray());
			RefleCache.classes.put(claName, map);
		}
		return flag;
	}
	
}
