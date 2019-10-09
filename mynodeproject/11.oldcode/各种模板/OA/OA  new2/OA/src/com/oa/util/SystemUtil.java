package com.oa.util;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.core.io.ClassPathResource;

import sun.misc.BASE64Encoder;

/**
 * 
 * @author lianxin
 * @description 系统工具类
 * @version 1.0
 * @date 2013-11-13
 * 
 */
public class SystemUtil {
	/**
	 * 设置cookie
	 * 
	 * @param response
	 * @param name
	 *            cookie名字
	 * @param value
	 *            cookie值
	 * @param maxAge
	 *            cookie生命周期 以秒为单位 如果maxAge 为0则生命周期为浏览器关闭则结束
	 */
	public static void addCookie(HttpServletResponse response, String name,
			String value, int maxAge) {
		Cookie cookie = new Cookie(name, value);
		cookie.setPath("/");
		if (maxAge > 0)
			cookie.setMaxAge(maxAge);
		response.addCookie(cookie);
	}

	/**
	 * 根据名字获取cookie
	 * 
	 * @param request
	 * @param name
	 *            cookie名字
	 * @return
	 * @throws Exception
	 */
	public static Cookie getCookieByName(HttpServletRequest request, String name) {
		Map<String, Cookie> cookieMap = ReadCookieMap(request);
		if (cookieMap.containsKey(name)) {
			Cookie cookie = (Cookie) cookieMap.get(name);
			return cookie;
		} else {
			return null;
		}
	}

	/**
	 * 将cookie封装到Map里面
	 * 
	 * @param request
	 * @return
	 */
	private static Map<String, Cookie> ReadCookieMap(HttpServletRequest request) {
		Map<String, Cookie> cookieMap = new HashMap<String, Cookie>();
		Cookie[] cookies = request.getCookies();
		if (null != cookies) {
			for (Cookie cookie : cookies) {
				cookieMap.put(cookie.getName(), cookie);
			}
		}
		return cookieMap;
	}

	/**
	 * 验证码生成工具
	 * 
	 * @return
	 */
	public static String getCode() {
		UUID uuid = UUID.randomUUID();
		return uuid.toString();
	}

	/**
	 * MD5概要算法加密
	 * 
	 * @param data
	 * @return
	 */
	public static String MD5Digest(String data) {
		try {
			MessageDigest digest = MessageDigest.getInstance("md5");
			byte[] bt = digest.digest(data.getBytes());
			BASE64Encoder encoder = new BASE64Encoder();
			String str = encoder.encode(bt);
			return str;
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * des算法加密
	 * 
	 * @param data
	 * @return
	 */
	public static String desEncoder(String key, String data) throws Exception {
		DESPlus des = null;
		if (validparamsNULL(key)) {
			des = new DESPlus();
		} else {
			des = new DESPlus(key);
		}
		return des.encrypt(data);
	}

	/**
	 * Des算法解密
	 * 
	 * @param data
	 * @return
	 */
	public static String desDecoder(String key, String data) throws Exception {
		DESPlus des = null;
		if (validparamsNULL(key)) {
			des = new DESPlus();
		} else {
			des = new DESPlus(key);
		}
		return des.decrypt(data);
	}

	/**
	 * 检测参数是否为空
	 * 
	 * @param map
	 * @return
	 */
	public static boolean validparamsNULL(Object... obj) {
		if (obj == null || obj.length <= 0) {
			return true;
		}
		for (Object o : obj) {
			if (o == null) {
				return true;
			}
			if (o != null && (o instanceof String)) {
				if (o.toString().trim().equals("")) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 隐藏邮箱部分信息
	 * 
	 * @param email
	 * @return
	 */
	public static String hideEmail(String email) {
		String[] strs = email.trim().split("@");
		int length = strs[0].getBytes().length;
		StringBuffer buffer = new StringBuffer();
		buffer.append(strs[0].charAt(0)).append(strs[0].charAt(1))
				.append("*****").append(strs[0].charAt(length - 1)).append("@")
				.append(strs[1]);
		return buffer.toString();
	}

	/**
	 * 根据用户输入的Email获取跳转到相应的电子邮箱首页URL
	 * 
	 * @param mail
	 * @return
	 */
	public static String getDirectUrl(String mail) {
		String[] strs = mail.trim().split("@");
		String lower = strs[1].toLowerCase();
		if ("163.com".equals(lower)) {
			return "http://mail.163.com";
		}
		if ("vip.163.com".equals(lower)) {
			return "http://vip.163.com";
		}
		if ("126.com".equals(lower)) {
			return "http://mail.126.com";
		}
		if ("qq.com".equals(lower) || "vip.qq.com".equals(lower)
				|| "foxmail.com".equals(lower)) {
			return "http://mail.qq.com";
		}
		if ("gmail.com".equals(lower)) {
			return "http://mail.google.com";
		}
		if ("sohu.com".equals(lower)) {
			return "http://mail.sohu.com";
		}
		if ("tom.com".equals(lower)) {
			return "http://mail.tom.com";
		}
		if ("vip.sina.com".equals(lower)) {
			return "http://vip.sina.com";
		}
		if ("sina.com.cn".equals(lower) || "sina.com".equals(lower)) {
			return "http://mail.sina.com.cn";
		}
		if ("yahoo.com.cn".equals(lower) || "yahoo.cn".equals(lower)) {
			return "http://mail.cn.yahoo.com";
		}
		if ("yeah.net".equals(lower)) {
			return "http://www.yeah.net";
		}
		if ("21cn.com".equals(lower)) {
			return "http://mail.21cn.com";
		}
		if ("hotmail.com".equals(lower)) {
			return "http://www.hotmail.com";
		}
		if ("sogou.com".equals(lower)) {
			return "http://mail.sogou.com";
		}
		if ("188.com".equals(lower)) {
			return "http://www.188.com";
		}
		if ("139.com".equals(lower)) {
			return "http://mail.10086.cn";
		}
		if ("189.cn".equals(lower)) {
			return "http://webmail15.189.cn/webmail";
		}
		if ("wo.com.cn".equals(lower)) {
			return "http://mail.wo.com.cn/smsmail";
		}
		if ("139.com".equals(lower)) {
			return "http://mail.10086.cn";
		}
		return "http://mail.163.com";
	}

	/**
	 * 获取上传图片系统编号
	 * 
	 * @return
	 */
	public static String getPicCode(String head) {
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		return head + format.format(new Date());
	}

	/**
	 * 判断文件类型是否合法
	 * 
	 * @param type
	 *            上传文件类型
	 * @param list
	 *            文件允许类型
	 * @return
	 */
	public static boolean isAllowType(String type, List<String> list) {
		for (String types : list) {
			if (types.equalsIgnoreCase(type)) {
				return true;
			}
		}
		return false;
	}

	public static float getSimilarityRatio(String str, String target) {
		String buffeStr = str.replaceAll("\\s*", "");
		char[] charStr = buffeStr.toCharArray();
		char[] targetStr = target.toCharArray();
		int length = 0;
		for (char zf : charStr) {
			for (char buffer : targetStr) {
				if (buffer == zf) {
					length++;
					break;
				}
			}
		}
		return (float) length / buffeStr.toCharArray().length;
	}

	/**
	 * 发送邮件
	 * 
	 * @param mail
	 * @param title
	 * @param msg
	 * @throws Exception
	 */
	public static void sendHtml(String mail, String title, String msg)
			throws Exception {
		HtmlEmail email = new HtmlEmail();
		DESPlus des = new DESPlus();
		email.setHostName("smtp.163.com");
		email.setAuthentication("xxx@163.com", des.decrypt("邮箱密码"));
		email.setCharset("UTF-8");
		try {
			email.addTo(mail);// 发送客户邮箱
			email.setFrom("xxx@163.com");// 必须和Authentication使用的用户相同，否则失败
			email.setSubject(title);
			email.setHtmlMsg(msg);
			email.send();
		} catch (EmailException e) {
			e.printStackTrace();
			throw e;
		}

	}

	/**
	 * 正则验证手机号合法性 true：合法手机号 false：手机号非法
	 * 
	 * @param mobile
	 * @return
	 */
	public static boolean isMobile(String mobile) {
		return mobile.trim().matches(
				"^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$");
	}
	
	/**
	 * 正则验证邮箱合法性 true：合法邮箱 false：邮箱非法
	 * 
	 * @param mobile
	 * @return
	 */
	public static boolean isEmail(String email) {
		return email.trim().matches(
				"^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
	}

	/**
	 * 获取工程路径
	 * 
	 * @author MaYang
	 * @param mobile
	 * @return
	 */
	public static String getOrgPath() throws IOException {
		return new ClassPathResource("/").getFile().getParentFile().getParent();
	}
	
	public static void main(String[] args) throws Exception {
		
	}
}
