package com.oa.util;
 class Tags {
	private String[] data;
	private int size = 0;

	public Tags(int size) {
		data = new String[size];
	}

	public Tags() {
		this(10);
	}

	public void add(String str) {
		ensureCapacity(size + 1);
		data[size++] = str;
	}

	public String get(int index) {
		if (index < size)
			return data[index];
		else
			return null;
	}

	// 为了提高效率，只将其置为null
	public boolean remove(String str) {
		for (int index = 0; index < size; index++) {
			if (str.equals(data[index])) {
				data[index] = null;
				return true;
			}
		}
		return false;
	}

	public boolean remove(int index) {
		if (index < data.length) {
			data[index] = null;
			return true;
		}
		return false;
	}

	public int size() {
		return this.size;
	}

	// 扩展容量
	public void ensureCapacity(int minSize) {
		int oldCapacity = data.length;
		if (minSize > oldCapacity) {
			int newCapacity = (oldCapacity * 3 / 2 + 1) > minSize ? oldCapacity * 3 / 2 + 1
					: minSize;
			String[] newArray = new String[newCapacity];
			for (int i = 0; i < data.length; i++) {
				newArray[i] = data[i];
			}
			data = newArray;
		}
	}
}

/**
 * java截取带html标签的字符串,再把标签补全(保证页面显示效果)<br>
 * 一般是用在字符串中有html标签的截取.如: 后台发布用了在线编辑器, 前台显示内容要截取的情况.<br>
 * 
 * @author yiping.xu
 * @date 2014-7-02
 */
public class HTMLUtils {
	public static void main(String[] args) {
		String htmlCode = "<span style=\"FONT-SIZE: 12pt\"><span style=\"font-family:Times New Roman;\"><span style=\"FONT-SIZE: 12pt\">"
				+ "<span style=\"font-family:Times New Roman;\"></span></span></span>"
				+ "</span><p><strong>&nbsp;进园：</strong>请勿携带宠物或其他动物进园；请勿携带锣鼓、球类、自行车、滑板车、旱冰鞋等体育用品进园。</p><p><br />"
				+ "<strong>违禁物品：</strong>请勿携带烟花、爆竹、酒精、柴油、汽油、油漆、氢汽球等易燃易爆物以及有毒物品进园。</p><p><br /><strong>不文明行为："
				+ "</strong>请勿随地吐痰、乱丢杂物；请不要用自带食物或其他杂物投喂动物，不要拍打惊吓动物。</p><p><br /><strong>吸烟限制：</strong>请勿在展馆内、乘车时吸烟。</p>"
				+ "<p><br /><strong>环境设施：</strong>请爱护园内绿化、卫生、餐饮等设施。</p><p><br /><strong>安全：</strong>请勿跨越栏杆和探入动物笼网；注意保管好私人财物，"
				+ "照顾好老人、小孩和残障人士；请勿攀爬假山、树木和跨越湖边栏杆。</p><p><br /><strong>拍摄：</strong>游客在园内拍摄照片或录像仅限于个人用途，"
				+ "未经广州动物园书面同意，禁止把场内照片或影片作为商业用途。</p><p><br /><strong>失窃：</strong>如果财物失窃，请寻找身边的保安员或服务人员求助。</p><p><br /><strong>儿童走失："
				+ "</strong>直接向保安员和服务人员求助。建议家长把电话号码预先告知儿童，以便保持联系。</p><p><br />&nbsp;<br />欢迎对我园服务提出宝贵意见，咨询、投诉、服务、求援电话：020-38377572。 <br /></p>";
		System.out.println(subStringHTML(htmlCode, 100));
	}

	/**
	 * 按子节长度截取字符串(支持截取带HTML代码样式的字符串)<br>
	 * 
	 * @param param
	 *            将要截取的含html代码的字符串参数
	 * @param length
	 *            截取的字节长度
	 * @return 返回截取后的字符串
	 * @author yiping.xu
	 * @date 2014-7-02
	 */
	public static String subStringHTML(String param, int length) {
		StringBuffer result = new StringBuffer();
		int n = 0;
		char temp;
		boolean isCode = false; // 是不是HTML代码
		boolean isHTML = false; // 是不是HTML特殊字符,如&nbsp;
		boolean isEmpty = false;// 是否是空格
		for (int i = 0; i < param.length(); i++) {
			temp = param.charAt(i);
			if (temp == '<') {
				isCode = true;
			} else if (temp == ' ' && isCode) {
				isEmpty = true;
			} else if (temp == '&') {
				isHTML = true;
			} else if (temp == '>' && isCode) {
				n = n - 1;
				isCode = false;
				isEmpty = false;
			} else if (temp == ';' && isHTML) {
				isHTML = false;
			}
			if (!isCode && !isHTML) {

				n = n + 1;
				// UNICODE码字符占两个字节
				if ((temp + "").getBytes().length > 1) {
					n = n + 1;
				}
			}
			if (!(isEmpty && isCode)) {
				result.append(temp);
			}
			if (n >= length) {
				break;
			}
		}
		return fix(result.toString());
	}

	/**
	 * 补全HTML代码<br>
	 * 如：<span>中国 ---> <span>中国</span>
	 * 
	 * @param str
	 * @return
	 * @author yiping.xu
	 * @date 2014-7-02
	 */
	private static String fix(String str) {
		StringBuffer fixed = new StringBuffer(); // 存放修复后的字符串
		Tags[] unclosedTags = getUnclosedTags(str);
		// 生成新字符串
		for (int i = unclosedTags[0].size() - 1; i > -1; i--) {
			fixed.append("<" + unclosedTags[0].get(i) + ">");
		}
		fixed.append(str);
		for (int i = unclosedTags[1].size() - 1; i > -1; i--) {
			String s = null;
			if ((s = unclosedTags[1].get(i)) != null) {
				fixed.append("</" + s + ">");
			}
		}
		return fixed.toString();
	}

	private static Tags[] getUnclosedTags(String str) {
		StringBuffer temp = new StringBuffer(); // 存放标签
		Tags[] unclosedTags = new Tags[2];
		unclosedTags[0] = new Tags(); // 前不闭合，如有</div>而前面没有<div>
		unclosedTags[1] = new Tags(); // 后不闭合，如有<div>而后面没有</div>
		boolean flag = false; // 记录双引号"或单引号'
		char currentJump = ' '; // 记录需要跳过''还是""
		char current = ' ', last = ' '; // 当前 & 上一个
		// 开始判断
		for (int i = 0; i < str.length();) {
			current = str.charAt(i++); // 读取一个字符
			if (current == '"' || current == '\'') {
				flag = flag ? false : true; // 若为引号，flag翻转
				currentJump = current;
			}
			if (!flag) {
				if (current == '<') { // 开始提取标签
					current = str.charAt(i++);
					if (current == '/') { // 标签的闭合部分，如</div>
						current = str.charAt(i++);
						// 读取标签
						while (i < str.length() && current != '>') {
							temp.append(current);
							current = str.charAt(i++);
						}
						// 从tags_bottom移除一个闭合的标签
						if (!unclosedTags[1].remove(temp.toString())) { // 若移除失败，说明前面没有需要闭合的标签
							unclosedTags[0].add(temp.toString()); // 此标签需要前闭合
						}
						temp.delete(0, temp.length()); // 清空temp
					} else { // 标签的前部分，如<div>
						last = current;
						while (i < str.length() && current != ' '
								&& current != ' ' && current != '>') {
							temp.append(current);
							last = current;
							current = str.charAt(i++);
						}
						// 已经读取到标签，跳过其他内容，如<div id=test>跳过id=test
						while (i < str.length() && current != '>') {
							last = current;
							current = str.charAt(i++);
							if (current == '"' || current == '\'') { // 判断引号
								flag = flag ? false : true;
								currentJump = current;
								if (flag) { // 若引号不闭合，跳过到下一个引号之间的内容
									while (i < str.length()
											&& str.charAt(i++) != currentJump)
										;
									current = str.charAt(i++);
									flag = false;
								}
							}
						}
						if (last != '/' && current == '>') // 判断这种类型：<TagName />
							unclosedTags[1].add(temp.toString());
						temp.delete(0, temp.length());
					}
				}
			} else {
				while (i < str.length() && str.charAt(i++) != currentJump)
					; // 跳过引号之间的部分
				flag = false;
			}
		}
		return unclosedTags;
	}
}
