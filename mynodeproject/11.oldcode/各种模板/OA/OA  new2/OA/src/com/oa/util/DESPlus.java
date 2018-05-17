package com.oa.util;

import java.security.Key;
import java.security.Security;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import com.sun.crypto.provider.SunJCE;

/**
 * 加密解密工具类-DES默认公钥加密和自定义公钥加密
 * 
 * @author 许意平
 * @version 1.0
 * 
 */
public class DESPlus {
	private static String strDefaultKey = "drt435@789!-DES234";

	private Cipher encryptCipher = null;

	private Cipher decryptCipher = null;

	/**
	 * 默认构造方法，使用默认密钥
	 * 
	 * @throws Exception
	 */
	public DESPlus() throws Exception {
		this(strDefaultKey);
	}

	/**
	 * 指定密钥构造方法
	 * 
	 * @param strKey
	 *            指定的密钥
	 * @throws Exception
	 */
	public DESPlus(String keyString) throws Exception {
		Security.addProvider(new SunJCE());
		Key key = getKey(keyString.getBytes());

		encryptCipher = Cipher.getInstance("DES");
		encryptCipher.init(Cipher.ENCRYPT_MODE, key);

		decryptCipher = Cipher.getInstance("DES");
		decryptCipher.init(Cipher.DECRYPT_MODE, key);
	}
	/**
	 * 加密字符串
	 * 
	 * @param str
	 *            需加密的字符串
	 * @return 加密后的字符串
	 * @throws Exception
	 */
	public String encrypt(String str) throws Exception {
		return Converts.bytesToHexString(encryptCipher.doFinal(str.getBytes("utf8")));
	}

	/**
	 * 解密字符串
	 * 
	 * @param str
	 *            需解密的字符串
	 * @return 解密后的字符串
	 * @throws Exception
	 */
	public String decrypt(String str) throws Exception {
		return new String(decryptCipher.doFinal(Converts.hexStringToByte(new String(str.getBytes("utf8")))),"utf8");
	}

	/**
	 * 从指定字符串生成密钥，密钥所需的字节数组长度为8位 不足8位时后面补0，超出8位只取前8位
	 * 
	 * @param array
	 *            构成该字符串的字节数组
	 * @return 生成的密钥
	 * @throws java.lang.Exception
	 */
	private Key getKey(byte[] array) throws Exception {
		// 创建一个空的8位字节数组（默认值为0）
		byte[] keyArray = new byte[8];

		// 将原始字节数组转换为8位
		for (int i = 0; i < array.length && i < keyArray.length; i++) {
			keyArray[i] = array[i];
		}

		// 生成密钥
		return new SecretKeySpec(keyArray, "DES");
	}
}
