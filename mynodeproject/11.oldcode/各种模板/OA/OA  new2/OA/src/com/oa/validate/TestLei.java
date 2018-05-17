package com.oa.validate;

import java.util.Map;

public class TestLei {

	@Email
	@NotNull
	private String email = "111222333@qq.com";
	
	@PhoneNumber
	private String pn = "18712112721";
	
	@Str
	private String name = null;
	
	public static void main(String[] args) {
		TestLei t = new TestLei();
		try {
			Map<String, Object> map = Validate.valid(t);
			System.out.println(map.size());
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
