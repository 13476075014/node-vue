package com.oa.util;

import java.io.InputStream;
import java.util.Properties;

public class PropertiesUtils {
	public static String getProperty(String key){
		try{
			Properties pros = new Properties();
			InputStream in = PropertiesUtils.class
					.getResourceAsStream("sys.properties");
			pros.load(in);
			in.close();
			return pros.getProperty(key);
		}catch (Exception e) {
			return "";
		}
	}

	public static void main(String[] args) throws Exception {

		System.out.println(PropertiesUtils.getProperty("application"));
	}
}
