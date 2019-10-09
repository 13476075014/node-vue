package com.oa.util;

public class ValidateUtil {
	
	private ValidateUtil() throws Exception{
		throw new Exception("工具类不允许创建实例！");
	}

	/**
     * 检查是否为数字。可以包含小数点，但是小数点个数不能多于一个； 可以包含负号，但是不能只有负号而没有其他数字； 不允许包含逗号
     *
     * @param s 被检查的字符串
     * @return true 表示是数字, false 表示不是数字
     */
	public static boolean isNumber(String s) {
		return isNumber(s, true);
	}
	
    public static boolean isNumber(String s, boolean flag) {
        boolean pointfirsttime = true;

        int i = 0;
        if (s == null || s.trim().length() == 0) {
            return false;
        }
        if(flag){
        	if(s.trim().substring(0, 1).equals("-")){
        		return false;
        	}
        }
        boolean negative = false;

        if (s.charAt(0) == '-') {
            i++;
            negative = true;
        }

        while (i < s.length()) {
            if (!Character.isDigit(s.charAt(i))) {
                if ('.' == s.charAt(i) && pointfirsttime) {
                    pointfirsttime = false;
                } else {
                    return false;
                }
            }
            i++;
        }

        if (negative && (i == 1)) {
            return false;
        }

        return true;
    }

    /**
     * 检查是否为整数。可以为负整数，但是不能只有负号而没有其他数字
     *
     * @param s 被检查的字符串
     * @return true 表示是整数, false 表示不是整数
     */
    public static boolean isInteger(String s) {
        int i = 0;
        if (s == null || s.trim().length() < 1) {
            return false;
        }

        boolean negative = false;

        if (s.charAt(0) == '-') {
            i++;
            negative = true;
        }

        while (i < s.length()) {
            if (!Character.isDigit(s.charAt(i))) {
                return false;
            }
            i++;
        }
        if (negative && (i == 1)) {
            return false;
        }

        return true;
    }
}
