package com.oa.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * 验证码生成工具
 * 
 * @author 许意平
 * 
 */
public class ImageCode {
	private static Random random = new Random();

	public static Map<String, BufferedImage> getImage(int width, int height,
			int n, int charSize) {
		BufferedImage image = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);
		Graphics2D g = image.createGraphics();
		g.setColor(new Color(174, 221, 129));
		g.fillRect(0, 0, width, height);
		g.setColor(getColor());
		// 画干扰线
		for (int i = 0; i < 10; i++) {
			g.drawLine(random.nextInt(width), random.nextInt(height), random
					.nextInt(width) + 5, random.nextInt(height) + 5);
		}
		/**
		 * 获取验证字符
		 */
		String[] code = getCheckString(n);
		StringBuilder builder = new StringBuilder();
		/**
		 * 将字符画到图片上去
		 */
		g.setFont(new Font(null, Font.BOLD + Font.ITALIC, charSize));
		for (int i = 0; i < code.length; i++) {
			g.setColor(getColor());
			g.drawString(code[i], i * width / n, height*2/3);
			builder.append(code[i]);
		}
		Map<String, BufferedImage> img = new HashMap<String, BufferedImage>();
		img.put(builder.toString(), image);
		return img;
	}

	private static String[] getCheckString(int n) {
		char[] chs1 = { '2', '3', '4', '5', '6', '7', '8', '9' };
		char[] chs = Arrays.copyOf(chs1, chs1.length + 26);
		String[] chs2 = new String[n];
		for (int i = 0; i < 26; i++) {
			chs[chs1.length + i] = (char) ('A' + i);
		}
		int i = 0;
		while (true) {
			if (i < n) {
				chs2[i] = String.valueOf(chs[random.nextInt(chs.length)]);
				i++;
			} else {
				break;
			}
		}
		return chs2;
	}

	private static Color getColor() {
		return new Color(random.nextInt(255), random.nextInt(255), random
				.nextInt(255));
	}
}
