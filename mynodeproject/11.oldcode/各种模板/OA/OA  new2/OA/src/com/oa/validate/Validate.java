package com.oa.validate;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.oa.util.SystemUtil;
import com.oa.util.ValidateUtil;

public class Validate {

	//private static Class<?>[] classes = { Email.class, PhoneNumber.class,NotNull.class, Str.class };

	public static <T> Map<String, Object> valid(T t)
			throws IllegalArgumentException, IllegalAccessException {
		return valid(t, null);
	}
	
	public static <T> Map<String, Object> valid(T t, String methodName)
			throws IllegalArgumentException, IllegalAccessException {
		Map<String, Object> map = new HashMap<String, Object>();
		boolean flag = true;
		if(t.getClass().getAnnotation(NotAll.class) == null){//gai wei shi yong StringUtil.isEmpty fangfa
			flag = false;
		}
		Field[] fields = t.getClass().getDeclaredFields();
		for (int i = 0; i < fields.length; i++) {
			Field f = fields[i];
			Annotation[] annos = f.getAnnotations();
			NoMethod slp = null;
			String[] mnames = null;
			if(methodName != null && !"".equals(methodName)){
				slp = (NoMethod)f.getAnnotation(NoMethod.class);
				if(slp != null){
					mnames = slp.mothodNames();
				}
			}
			f.setAccessible(true);
			Object o = f.get(t);
			String fname = f.getName() + "Message";
			if (annos != null && (slp == null || !Arrays.asList(mnames).contains(methodName))) {
				if (o == null || o.toString().trim().equals("")) {
					for (int i3 = 0; i3 < annos.length; i3++) {
						if (annos[i3] instanceof NotNull) {
							map.put(fname, ((NotNull) annos[i3]).value() + "不能为空！");
							if(flag){
								return map;
							}
							break;
						} else {
							f.set(t, null);
							continue;
						}
					}
				} else {
					for (int i2 = 0; i2 < annos.length; i2++) {
						if (annos[i2] instanceof Email) {
							/*if(o.toString().trim().equals("")){
								f.set(t, null);
								continue;
							}*/
							if (!SystemUtil.isEmail(o.toString())) {
								map.put(fname, ((Email) annos[i2]).value());
								if(flag){
									return map;
								}
								continue;
							}
							continue;
						}
						if (annos[i2] instanceof PhoneNumber) {
							if (!SystemUtil.isMobile(o.toString())) {
								map.put(fname, ((PhoneNumber) annos[i2]).value());
								if(flag){
									return map;
								}
								continue;
							}						
							continue;
						}
						if (annos[i2] instanceof Str) {
							boolean notNull = ((Str)annos[i2]).notNull();
							if(notNull){
								if(o.toString().trim().equals("")){
									map.put(fname, ((Str) annos[i2]).mesName() + "不能为空！");
									if(flag){
										return map;
									}
									continue;
								}
							}
							int min = ((Str)annos[i2]).minLength();
							if(min != -1 && ((String) o).trim().length() < min){
								map.put(fname, ((Str) annos[i2]).mesName() + "长度不能小于"+min+"！");
								if(flag){
									return map;
								}
								continue;
							}
							int max = ((Str)annos[i2]).maxLength();
							if(max != -1 && ((String) o).trim().length() > max){
								map.put(fname, ((Str) annos[i2]).mesName() + "长度不能大于"+max+"！");
								if(flag){
									return map;
								}
								continue;
							}
							// f.set(t, o.toString().trim());
							continue;
						}
						if (annos[i2] instanceof PlusNumber) {
							if (!ValidateUtil.isNumber(o.toString().trim())) {
								map.put(fname, ((PlusNumber) annos[i2]).value() + "不能为非正数！");
								if(flag){
									return map;
								}
								continue;
							}
							int min = ((PlusNumber)annos[i2]).minLen();
							if(min != -1 && Integer.parseInt(o.toString().trim()) < min){
								map.put(fname, ((PlusNumber) annos[i2]).value() + "不能小于"+min+"！");
								if(flag){
									return map;
								}
								continue;
							}
							int max = ((PlusNumber)annos[i2]).maxLen();
							if(max != -1 && Integer.parseInt(o.toString().trim()) > max){
								map.put(fname, ((PlusNumber) annos[i2]).value() + "不能大于"+max+"！");
								if(flag){
									return map;
								}
								continue;
							}
							// f.set(t, o.toString().trim());
							continue;
						}
						if(annos[i2] instanceof Enum){
							int[] enums = ((Enum) annos[i2]).values();
							if(!Arrays.asList(enums).contains(o)){
								map.put(fname, ((Enum) annos[i2]).value());
								if(flag){
									return map;
								}
								continue;
							}
						}
					}
				}
			}
		}
		return map;
	}
   
}
