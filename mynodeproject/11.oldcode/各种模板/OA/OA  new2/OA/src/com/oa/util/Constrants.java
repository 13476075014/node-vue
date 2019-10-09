package com.oa.util;

public class Constrants {
	public final static String MESSAGE_TIP = "message";// 系统提示信息KEY
	public final static String MESSAGE_TIP_FLAGS = "errorFlags";// 系统错误提示信息标志KEY
	public final static String FLAGS = "flags";// 系统提示信息标示KEY

	public final static int PREV_PARENT_DOM = 0;// 权限一级菜单父节点
	/* 前台常量 */
	public final static int IS_VERIFY_EMAIL_NOT = 0;// 是否邮箱验证-未验证
	public final static int IS_VERIFY_EMAIL_YES = 1;// 是否邮箱验证-验证

	/* 后台常量 */
	public final static int SUPER_USER = 0;// 超级管理员权限
	public final static int SIMPLE_USER = 1;// 普通用户权限
	public final static String USER_PRIVILEGE_KEY = "Privilege_List";// 系统用户权限存储KEY

	public final static String USER_KEY = "system_user";// 系统后台用户信息session存储KEY
	public final static String CUS_KEY = "sysCustomer";//系统后台客户信息session存储KEY

	public final static String SYS_DEFAULT_PWD = "12345678"; // 系统初始化重置默认密码

	public final static int USABLE_USER = 0;// 用户启用状态
	public final static int FREEZE_USER = 1;// 用户冻结状态

	public final static int DATA_NOT_DEL = 0;// 数据未删除
	public final static int DATA_DEL = 1;// 数据删除
	
	public final static int DATA_NOT_PUBLISH = 0;// 数据未发布
	public final static int DATA_PUBLISH = 1;// 数据已发布

	public final static int DATA_NOT_VERIFY = 0;// 数据未审核
	public final static int DATA_VERIFY = 1;// 数据已审核通过
	public final static int DATA_VERFY_NOT_PASS = 2;// 数据审核未通过

	public final static int SYS_ROLE = 0;// 系统角色
	public final static int DP_ROLE = 1;// 部门角色

	public final static int FREEZE_DATA = 0;// 数据未启用状态
	public final static int USABLE_DATA = 1;// 数据启用状态
	
	public final static int TYPE_CUS_OPTION = 0;//客户建议
	public final static int TYPE_SYS_REPLY = 1;//平台回复
	
	public final static int REPLY_YES = 0;//已回复
	public final static int REPLY_NO =1;//未回复
	
	public final static int READ_YES = 1;//已读
	public final static int READ_NO = 0;//未读
	public final static int READ_ALL = 2;//全部
	
	public final static String FIRST_MENU = "all"; // 一级菜单 operator值
	public final static String TWO_MENU = "find"; // 二级菜单 operator值

	public final static String ERROR_MSG = "errors"; // 返回错误视图

	public final static String currentPage = "currentPage";// 当前页号
	
	public final static String RESULT = "result";//手机接口返回标识
	
	public final static String BABYPICPACKAGE = "babyImg";//婴儿图片存放文件夹名称
	
	public final static String LASTLGTIME = "lastLoginTime";//最后登陆操作时间
	
	public final static String LIST = "list";//list
	
	public final static String COUNT = "count";//count
	
	public final static String PAGE = "page";//page
	
	public final static int LEAVE_END_YES = 0;//假期结束
	
	public final static int LEAVE_END_NO = 1;//假期持续中

	public final static String PAGE_STRING = "pageString";//页脚字符串
	
	public final static int MAN = 0;//男
	
	public final static int WMAN = 1;//女
	
	public final static String FIELDS = "fields";
	
	public final static String IS_DEL = "isDel";
	
}