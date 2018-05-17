/**   
 * @ClassName: TimeUtil.java
 * @Description: 用户时间工具类
 *
 * @version: v1.0.0
 * @author: MaYang
 * @date: 2015-7-8 下午5:27:25
 * 
 */
package com.oa.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.junit.Test;

public class TimeUtil {
	
	private TimeUtil() throws Exception{
		throw new Exception("时间记录类不允许创建实例！");
	}

	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	
	private static SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	private static SimpleDateFormat sdf3 = new SimpleDateFormat("yyyy年MM月dd日");
	
	public static String getDate(Date date, int type){
		if(date == null){
			date = new Date();
		}
		if(type == 1){
			return sdf.format(date);
		}
		if(type == 2){
			return sdf2.format(date);
		}
		if(type == 3){
			return sdf3.format(date);
		}
		return null;
	}
	
	/**
	 * @Function: toDate
	 * @Description: 将字符串转换成时间类型，按照yyyy-MM-dd的格式
	 * 
	 * @version: v1.0.1
	 * @author: MaYang
	 * @date: 2015-7-8 上午11:23:27
	 * 
	 */
	public static Date toDate(String s, int type) {
		if (SystemUtil.validparamsNULL(s)) {
			return null;
		}
		try {
			if(type == 1){
				return sdf.parse(s);
			}
			if(type == 2){
				return sdf2.parse(s);
			}
			if(type == 3){
				return sdf3.parse(s);
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 
	 * @Function: getAfterDate
	 * @Description: 获取某一天的后一天时间
	 * 
	 * @version: v1.0.0
	 * @author: MaYang
	 * @date: 2015-8-5 上午10:11:30
	 * 
	 */
	public static Date getAfterDate(Date date) {
		return getAfterDate(date, 1);
	}

	/**
	 * 
	 * @Function: getAfterDate
	 * @Description: 获取某一天的后n天的时间
	 * 
	 * @version: v1.0.0
	 * @author: MaYang
	 * @date: 2015-8-5 上午10:17:17
	 * 
	 */
	public static Date getAfterDate(Date date, int n) {
		if(date == null){
			return null;
		}
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DAY_OF_MONTH, n);
		return new Date(cal.getTimeInMillis());
	}
	
	/**
	 * 
	 * @Function: getBeforeDate
	 * @Description: 获得某一天前一天的时间
	 * 
	 * @version: v1.0.0
	 * @author: MaYang
	 * @date: 2015-8-5   上午10:27:52
	 *
	 */
	public static Date getBeforeDate(Date date){
		return getBeforeDate(date, 1);
	}
	
	/**
	 * 
	 * @Function: getBeforeDate
	 * @Description: 获得某一天前n天的时间
	 * 
	 * @version: v1.0.0
	 * @author: MaYang
	 * @date: 2015-8-5   上午10:29:43
	 *
	 */
	public static Date getBeforeDate(Date date, int n){
		return getAfterDate(date, -n);
	}
	
	/**
	 * 
	 * @Function: getStartTime
	 * @Description: 获得date时间的前后n天的零点时间，n为正指向后几天，为负指向前几天，date为null时默认是当前的系统日期
	 * 
	 * @version: v1.0.0
	 * @author: MaYang
	 * @date: 2015-9-16   上午10:29:43
	 *
	 */
	public static Date getStartTime(Date date, int n){ 
		Calendar cal = Calendar.getInstance();
		if(date != null){
			cal.setTime(date); 
		}
        cal.add(Calendar.DAY_OF_MONTH, n);
        cal.set(Calendar.HOUR_OF_DAY, 0);  
        cal.set(Calendar.MINUTE, 0);  
        cal.set(Calendar.SECOND, 0);   
        return new Date(cal.getTimeInMillis());  
    }  
      
	@Test
	public void test() {
		String s = "2015-07-07 13:00:00";
		Date d = toDate(s, 2);
		d = getBeforeDate(d);
		System.out.println(d.toString());
	}

	public static void main(String[] args) {
		String s = "2015-07-24 17:31:51";
		Date d = toDate(s, 2);
		System.out.println(getStartTime(d, -1));
	}
}
