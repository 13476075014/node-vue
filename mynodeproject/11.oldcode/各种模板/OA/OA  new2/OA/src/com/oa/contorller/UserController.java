/**   
* Copyright: Copyright (c) 2015 master
* 
* @ClassName: UserController.java
* @Description: 用户管理类
*
* @version: v1.0.0
* @author: xuyiping
* @date: 2015-4-20 上午9:37:24 
*
* Modification History:
* Date         Author          Version            Description
*---------------------------------------------------------*
*/
package com.oa.contorller;

import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.oa.entity.Deparment;
import com.oa.entity.EmployeeInfo;
import com.oa.entity.PrevRole;
import com.oa.entity.Privilege;
import com.oa.entity.Role;
import com.oa.entity.User;
import com.oa.entity.UserRole;
import com.oa.menu.Module;
import com.oa.prev.Prev;
import com.oa.service.DepartmentService;
import com.oa.service.PrivilegeService;
import com.oa.service.UserService;
import com.oa.util.Constrants;
import com.oa.util.ImageCode;
import com.oa.util.Log4jLogger;
import com.oa.util.PageQueryUtil;
import com.oa.util.SystemUtil;

@Controller
@RequestMapping("/system/user")
@Module("UserSysManager")
public class UserController extends BaseController {
	private static final Log4jLogger log = Log4jLogger
			.getLogger(UserController.class);
	
	@Resource
	protected UserService userService;

	@Resource
	protected PrivilegeService prevService;

	@Resource
	protected DepartmentService dpService;
	
	/**   
	* @Function: login
	* @Description: 用户登录
	*
	* @param:参数描述
	* @return：返回结果描述
	* @throws：异常描述
	*
	* @version: v1.0.0
	* @author: xuyiping
	* @date: 2015-4-20 上午9:37:24
	*
	* Modification History:
	* Date         Author          Version            Description
	*---------------------------------------------------------*
	* 2014-1-14     xuyiping           v1.0.0               修改原因
	*/
	@RequestMapping("/admin_index")
	public String login() throws Exception {
		try {
			getSession().removeAttribute(Constrants.USER_KEY);
			return "user/login";
		} catch (Exception e) {
			log.error("user redirect login error:", e);
			throw e;
		}
	}
	
	/**
	 * 
		* @Function: validPic
		* @Description: 验证码 
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-19   下午5:22:39
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/check_code")
	public void validPic(HttpServletResponse response) throws Exception{
		try {
			Map<String,BufferedImage> map = ImageCode.getImage(80, 42, 4,20);
			String checkCode = map.keySet().iterator().next();
			getSession().setAttribute("imageCode", checkCode);
			BufferedImage image = map.values().iterator().next();
			// 禁止图像缓存。  
			response.setHeader("Pragma", "no-cache"); 
			response.setHeader("Cache-Control", "no-cache"); 
			response.setDateHeader("Expires", 0); 
	  
			response.setContentType("image/jpeg"); 
	  
	         // 将图像输出到Servlet输出流中。  
	         ServletOutputStream sos = response.getOutputStream(); 
	         ImageIO.write(image, "jpeg", sos); 
	         sos.close(); 
		} catch (Exception e) {
			log.error("check code error:", e);
			throw e;
		}
	}
	
	/**
	 * 
		* @Function: loginOut
		* @Description: 用户注销
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-18   下午5:26:11
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/loginOut")
	public String loginOut() throws Exception {
		try {
			getSession().removeAttribute(Constrants.USER_KEY);
			getSession().invalidate();
			return "user/login";
		} catch (Exception e) {
			log.error("user  login out error:", e);
			throw e;
		}
	}
	
	
	/**
	 * 
		* @Function: loginDeal
		* @Description: 用户登录数据处理
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-6   上午9:54:40
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
		* 2014-1-14     xuyiping           v1.0.0               修改原因
	 */
	@RequestMapping("/login")
	public ModelAndView loginDeal(String em,String pd,String cod)  throws Exception{
		try {
			//String code = request.getParameter("cod");

			// String sysCode = getSession().getAttribute("imageCode") == null ?
			// null
			// : getSession().getAttribute("imageCode").toString();
			// getSession().setAttribute("imageCode", "");
			// if (SystemUtil.validparamsNULL(code)) {
			// message = "验证码不能为空";
//			request.setAttribute(Constrants.MESSAGE_TIP, message);
//			return "user/login";
			// }
			if (SystemUtil.validparamsNULL(em)
					|| SystemUtil.validparamsNULL(pd)) {
				return returnView("登陆账号密码不能为空", "user/login");
			}
			// if (sysCode == null ||
			// !code.trim().equalsIgnoreCase(sysCode)) {
			// message = "验证码不正确";
			// return "user_login_forward";
			// }
			User user = userService.findUser(em.trim(),
					SystemUtil.MD5Digest(pd.trim()));
			if (user == null) {
				return returnView("登陆账号密码不正确", "user/login");
			} else {
				if (user.getUserStatus().intValue() == Constrants.FREEZE_USER) {
					return returnView("账号不可用，请联系管理员", "user/login");
				}
				List<Privilege> prevs = findPrevs(user);
				Date lastLoginTime = user.getLoginTime();
				user.setLoginTime(new Date());
				userService.update(user);
				user.setLoginTime(lastLoginTime);
				user.setPassword("");
				if (user.getUserType().intValue() == Constrants.SUPER_USER) {
					getSession().setAttribute("super_key", "admin");
				}
				getSession().setAttribute(Constrants.USER_KEY, user);
				getSession().setAttribute(Constrants.USER_PRIVILEGE_KEY, prevs);
				return new ModelAndView("index/index");
			}
		} catch (Exception e) {
			log.error("user login error:", e);
			throw e;
		}
	}
	
	/**
	 * 
		* @Function: findPrevs
		* @Description: 查询用户权限
		*
		* @param: user 用户对象
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-6   上午10:10:06
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
		* 2014-1-14     xuyiping           v1.0.0               修改原因
	 */
	private List<Privilege> findPrevs(User user) throws Exception {
		return prevService.findAllPrevToUser(user);
	}
	/**
	 * 
		* @Function: isLogin
		* @Description: 用户登录判断
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-6   下午2:22:04
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
		* 2014-1-14     xuyiping           v1.0.0               修改原因
	 */
	@RequestMapping("/is_dl")
	@ResponseBody
	public ModelMap isLogin() {
		try {
			Object user = getSession().getAttribute(Constrants.USER_KEY);
			if (user == null || !(user instanceof User)) {
				result = false;
			} else {
				result = true;
			}
		} catch (Exception e) {
			log.error("user login verify error:", e);
			result = false;
		}
		ModelMap map = new ModelMap();
		map.put(Constrants.FLAGS, result);
		return map;
	}
	
	
	/**
	 * 
		* @Function: isExist
		* @Description: 用户账号唯一性判断
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-6   下午2:22:04
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
		* 2014-1-14     xuyiping           v1.0.0               修改原因
	 */
	@RequestMapping("/is_ext")
	@ResponseBody
	public ModelMap isExist(String name) {
		ModelMap map = new ModelMap();
		try {
			if(!SystemUtil.validparamsNULL(name)){
				if(userService.validateUserName(name.trim())){
					map.put("getdata", "true");
				}
			}
		} catch (Exception e) {
			log.error("userName only verify error:", e);
		}
		return map;
	}
	/********************** 角色管理 ************************/
	/**
	 * 
		* @Function: role_list
		* @Description:查询角色用户信息
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-7   上午10:42:56
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
		* 2014-1-14     xuyiping           v1.0.0               修改原因
	 */
	@RequestMapping("/role_list")
	@Prev(module = "roleManager", oprator = "find", decription = "用户角色管理")
	public ModelAndView role_list(PageQueryUtil page) throws Exception {
		try {
			Map<String, Object> map = userService.findRoleAll(page, getUserMsg());
			return backView("user/role/list", map);
		} catch (Exception e) {
			log.error("find all role error", e);
			throw e;
		}
	}

	/**
	 * 
		* @Function: roleById
		* @Description: 根据角色ID查询角色信息
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-7   下午1:27:47
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
		* 2014-1-14     xuyiping           v1.0.0               修改原因
	 */
	@Prev(module = "roleManager", oprator = "find", decription = "用户角色管理")
	public ModelAndView roleById(@RequestParam(required=true,
		value="id")Integer roleId) throws Exception {
		Role role = null;
		try {
			role = userService.get(Role.class, roleId);
		} catch (Exception e) {
			log.error("find role by id error", e);
		}
		return new ModelAndView("success").addObject("data", role);
	}

	/**
	 * 
		* @Function: addInit
		* @Description: 角色添加初始化
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-7   下午2:56:01
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
		* 2014-1-14     xuyiping           v1.0.0               修改原因
	 */
	@RequestMapping("/role_add_init")
	@Prev(module = "roleManager", oprator = "add", decription = "角色信息添加")
	public ModelAndView addInit() throws Exception{
		List<Deparment> list = null;
		if(getUserMsg().getUserType().equals(Constrants.SUPER_USER)){
			list = dpService.findAll();
		}
		return new ModelAndView("user/role/add","dpList", list).addObject(Constrants.MESSAGE_TIP_FLAGS, false);
	}
	/**
	 * 
		* @Function: add
		* @Description: 添加新角色
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-7   下午2:32:32
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
		* 2014-1-14     xuyiping           v1.0.0               修改原因
	 */
	@RequestMapping("/role_add")
	@Prev(module = "roleManager", oprator = "add", decription = "角色信息添加")
	public ModelAndView add(@RequestParam(required=true,
		value="name")String roleName,@RequestParam(required=true,value="des")
		String discription,Integer dpId) throws Exception {
		try {
			if (SystemUtil.validparamsNULL(roleName)
					|| SystemUtil.validparamsNULL(discription)) {
				List<Deparment> list = null;
				if(getUserMsg().getUserType().equals(Constrants.SUPER_USER)){
					list = dpService.findAll();
				}
				return returnView("您还有数据未填写", "user/role/add").addObject("dpList", list);
			}
			Role ro = new Role();
			ro.setRoleName(roleName);
			ro.setDescription(discription);
			if (getUserMsg().getUserType().equals(Constrants.SUPER_USER)) {
				List<Deparment> list = null;
				if (dpId == null || dpId.intValue() == -1) {
					list = dpService.findAll();
					return returnView("您还有数据未填写", "user/role/add").addObject("dpList", list);
				}
				ro.setDepartmentId(dpId);
				ro.setRoleType(Constrants.SYS_ROLE);
			} else {
				ro.setDepartmentId(getUserMsg().getDpId());
				ro.setRoleType(Constrants.DP_ROLE);
			}
			userService.save(ro);
			return returnView("添加角色成功", "user/role/add");
		} catch (Exception e) {
			log.error("add role error", e);
			throw e;
		}
	}

	/**
	 * 
		* @Function: del
		* @Description:角色信息删除
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-15   下午3:32:29
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/role_del")
	@Prev(module = "roleManager", oprator = "delete", decription = "角色信息删除")
	public ModelAndView del(@RequestParam(required=true,value="id")
	Integer roleId,PageQueryUtil page) throws Exception {
		try {
			if (SystemUtil.validparamsNULL(roleId)) {
				return messageViewNew( "角色不存在");
			}
			Role ro = userService.get(Role.class, roleId);
			if (ro != null) {
				if (!getUserMsg().getUserType().equals(Constrants.SUPER_USER)) {
					if (!ro.getDepartmentId().equals(getUserMsg().getDpId())) {
						return messageViewNew( "您没有该数据的操作权限");
					}
				}
				userService.deleteRole(roleId);
			}
			return role_list(page);
		} catch (Exception e) {
			log.error("delete role error", e);
			throw e;
		}
	}

	/**
	 * 
		* @Function: editInit
		* @Description: 编辑初始化
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-11   上午9:56:39
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
		* 2014-1-14     xuyiping           v1.0.0               修改原因
	 */
	@RequestMapping("/role_edit_init")
	@Prev(module = "roleManager", oprator = "update", decription = "角色信息修改")
	public ModelAndView editInit(@RequestParam(required=true,value="id")
	Integer roleId) throws Exception{
		List<Deparment> list = null;
		if(getUserMsg().getUserType().equals(Constrants.SUPER_USER)){
			list = dpService.findAll();
		}
		Role role = userService.get(Role.class, roleId);
		return new ModelAndView("user/role/update").addObject("dpList", list)
				.addObject("ro", role).addObject(Constrants.MESSAGE_TIP_FLAGS, false);
	}
	/**
	 * 
		* @Function: edit
		* @Description: 更新角色信息
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-13   下午2:26:05
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@ResponseBody
	@RequestMapping("/role_edit")
	@Prev(module = "roleManager", oprator = "update", decription = "角色信息修改")
	public ModelMap edit(@RequestParam(required=true,value="id")
		Integer roleId,@RequestParam(required=true,
		value="name")String roleName,@RequestParam(required=true,value="des")
		String discription,Integer dpId) throws Exception {
		ModelMap map = new ModelMap();
		try {
			if (SystemUtil.validparamsNULL(roleId)) {
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				map.put(Constrants.MESSAGE_TIP, "数据异常");
				return map;
			}
			Role ro = userService.get(Role.class, roleId);
			if (ro != null) {
				if (!getUserMsg().getUserType().equals(Constrants.SUPER_USER)) {
					if (!ro.getDepartmentId().equals(getUserMsg().getDpId())) {
						map.put(Constrants.MESSAGE_TIP_FLAGS, false);
						map.put(Constrants.MESSAGE_TIP, "您没有该操作权限");
						return map;
					}
				}else{
					if(dpService.get(Deparment.class, dpId) != null){
						ro.setDepartmentId(dpId);
					}
				}
				ro.setRoleName(roleName);
				ro.setDescription(discription);
				userService.update(ro);
			}
			map.put(Constrants.MESSAGE_TIP_FLAGS, true);
			map.put(Constrants.MESSAGE_TIP, "修改成功");
			return map;
		} catch (Exception e) {
			log.error("update role error", e);
			throw e;
		}
	}

	/**
	 * 
		* @Function: initRolePrev
		* @Description: 用户角色授权初始化
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-13   上午11:25:37
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/role_prev")
	@Prev(module = "roleManager", oprator = "privilege", decription = "用户角色授权")
	public ModelAndView initRolePrev(@RequestParam(required=true,value="id")
	Integer roleId,PageQueryUtil page) throws Exception {
		try {
			if (SystemUtil.validparamsNULL(roleId)) {
				return messageViewNew( "角色不存在");
			}
			Role ro = userService.get(Role.class, roleId);
			if (ro == null) {
				return messageViewNew( "角色不存在");
			}
			List<Privilege> prevList = prevService.findAllPrev(getUserMsg()
					.getId());
			Integer[] prevIdArray = prevService.findPrevArray(roleId);
			StringBuffer array = new StringBuffer();
			for(int j=0;j<prevIdArray.length;j++){
				if(j == (prevIdArray.length-1)){
					array.append(prevIdArray[j]);
				}else{
					array.append(prevIdArray[j]).append("_");
				}
			}
			return new ModelAndView("user/role/prev").addObject("prevs", prevList)
					.addObject("prev", array.toString()).addObject("role", ro)
					.addObject("size", page.getCurrentPage());
		} catch (Exception e) {
			log.error("role privilege init error", e);
			throw e;
		}
	}

	/**
	 * 
		* @Function: rolePrev
		* @Description: 用户角色授权信息提交
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-15   下午2:37:46
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/role_prev_sbmt")
	@Prev(module = "roleManager", oprator = "privilege", decription = "用户角色授权")
	public ModelAndView rolePrev(@RequestParam(required=false,value="prevId")
	Integer[] prevs,@RequestParam(required=true,value="id")
	Integer roleId,PageQueryUtil page) throws Exception {
		try {
			List<PrevRole> prevRList = new ArrayList<PrevRole>();
			Role ro = userService.get(Role.class, roleId);
			if (ro == null) {
				return messageViewNew("授权失败授权角色信息为空");
			} else {
				if (!getUserMsg().getUserType().equals(Constrants.SUPER_USER)) {
					if (!ro.getDepartmentId().equals(getUserMsg().getDpId())) {
						return messageViewNew("您没有该操作权限");
					}
				}
				if (prevs != null && prevs.length >= 1) {
					for (Integer id : prevs) {
						PrevRole prv = new PrevRole(ro.getId(), id);
						prevRList.add(prv);
					}
				}
			}
			prevService.savePrev(prevRList, ro, getUserMsg());
			return reView("授权成功", initRolePrev(ro.getId(),page));
		} catch (Exception e) {
			log.error("role privilege error", e);
			throw e;
		}
	}

	/********************** 系统用户管理 ************************/
	/**
	 * 
		* @Function: user_list
		* @Description: 用户信息查询
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: lianxin
		* @date: 2015-5-17   上午10:31:22
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/user_list")
	@Prev(module = "userManager", oprator = "find", decription = "系统用户管理")
	public ModelAndView user_list(PageQueryUtil page) throws Exception {
		try {
			Map<String, Object> map = userService.findUserAll(page, getUserMsg());
			List<Role> roleList = userService.findRoleAllOfUser(getUserMessage());
			return backView("user/list", map).addObject("roList", roleList);
		} catch (Exception e) {
			log.error("find all relative user error", e);
			throw e;
		}
	}
	/**
	 * 
		* @Function: userById
		* @Description: 根据用户ID查询用户信息
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: lianxin
		* @date: 2015-5-17   上午11:35:30
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/user_by_id")
	@Prev(module = "userManager", oprator = "find", decription = "系统用户管理")
	public ModelAndView userById(@RequestParam(required=true,
		value="id")Integer userId) throws Exception {
		User user = null;
		try {
			user = userService.get(User.class, userId);
			user.setPassword(null);// 禁止向客户端传递用户密码
		} catch (Exception e) {
			log.error("find user by userId error", e);
		}
		return new ModelAndView("success").addObject("data", user);
	}
	

	/**
	 * 
		* @Function: user_addInit
		* @Description: 用户添加初始化
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-7   下午2:56:01
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/user_add_init")
	@Prev(module = "userManager", oprator = "add", decription = "系统用户添加")
	public ModelAndView user_addInit(Long pid) throws Exception{
		List<Deparment> list = null;
		if(getUserMsg().getUserType().equals(Constrants.SUPER_USER)){
			list = dpService.findAll();
		}
		return new ModelAndView("user/add", "dpList", list).addObject("pid", pid);
	}
	/**
	 * 
		* @Function: userAdd
		* @Description: 添加系统用户
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-7   下午2:32:32
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
		* 2014-1-14     xuyiping           v1.0.0               修改原因
	 */
	@RequestMapping("/user_add")
	@Prev(module = "userManager", oprator = "add", decription = "系统用户添加")
	public ModelAndView userAdd(@RequestParam(value="name")String userName,
			@RequestParam(value="nickName")String nickName,@RequestParam(value="pd")
		String password,Integer dpId, Long pid) throws Exception {
		try {
			if (SystemUtil.validparamsNULL(userName)
					|| SystemUtil.validparamsNULL(password)|| SystemUtil.validparamsNULL(nickName)) {
				return new ModelAndView("user/add").addObject(Constrants.MESSAGE_TIP_FLAGS, true)
						.addObject(Constrants.MESSAGE_TIP, "您还有数据未填写！").addObject("pid", pid);
			}
			if (getUserMsg().getUserType().intValue() == Constrants.SUPER_USER) {
				if (dpId == null) {
					return new ModelAndView("user/add").addObject(Constrants.MESSAGE_TIP_FLAGS, true)
							.addObject(Constrants.MESSAGE_TIP, "请选择部门！").addObject("pid", pid);
				}
			}
			User user = new User();
			user.setUserName(userName.trim());
			user.setNickName(nickName.trim());
			user.setPassword(SystemUtil.MD5Digest(password.trim()));
			if (!userService.validateUserName(user.getUserName())) {
				return new ModelAndView("user/add").addObject(Constrants.MESSAGE_TIP_FLAGS, true)
						.addObject(Constrants.MESSAGE_TIP, "账户已存在！").addObject("pid", pid);
			}
			user.setUserType(Constrants.SIMPLE_USER);
			if (getUserMsg().getUserType().intValue() == Constrants.SUPER_USER) {
				user.setDpId(dpId);
			} else {
				user.setDpId(getUserMsg().getDpId());
			}
			user.setUserStatus(Constrants.FREEZE_USER);
			user.setIsDel(Constrants.DATA_NOT_DEL);
			user.setCreateTime(new Date());
			Object accountId = userService.save(user);
			if(pid != null){
				EmployeeInfo e = userService.get(EmployeeInfo.class, pid);
				e.setAccountId(((Integer)accountId).longValue());
				userService.update(e);
			}
			return new ModelAndView("user/add").addObject(Constrants.MESSAGE_TIP_FLAGS, true)
					.addObject(Constrants.MESSAGE_TIP, "添加成功！");
		} catch (Exception e) {
			log.error("add user error", e);
			throw e;
		}
	}

	/**
	 * 
		* @Function: userDel
		* @Description:用户信息删除
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-15   下午3:32:29
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/user_del")
	@Prev(module = "userManager", oprator = "delete", decription = "角色信息删除")
	public ModelAndView userDel(
	Integer id,PageQueryUtil page) throws Exception {
		try {
			if (SystemUtil.validparamsNULL(id)) {
				return messageViewNew( "用户不存在");
			}
			User user = userService.get(User.class, id);
			if (user != null) {
				if (!getUserMsg().getUserType().equals(Constrants.SUPER_USER)) {
					if (!user.getDpId().equals(getUserMsg().getDpId())) {
						return messageViewNew( "您没有该数据的操作权限");
					}
				}
				userService.deleteUser(id);
			}
			return user_list(page);
		} catch (Exception e) {
			log.error("delete user error", e);
			throw e;
		}
	}

	/**
	 * 
		* @Function: userEditInit
		* @Description: 编辑初始化
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-11   上午9:56:39
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
		* 2014-1-14     xuyiping           v1.0.0               修改原因
	 */
	@RequestMapping("/user_edit_init")
	@Prev(module = "userManager", oprator = "update", decription = "系统用户更新")
	public ModelAndView userEditInit(@RequestParam(value="id")
	Integer userId) throws Exception{
		try {
			if(SystemUtil.validparamsNULL(userId)){
				return messageViewNew( "操作数据异常"); 
			}
			User user = userService.get(User.class, userId);
			if (user == null) {
				return messageViewNew( "操作数据异常"); 
			}
			if (!getUserMsg().getUserType().equals(Constrants.SUPER_USER)
					&& !getUserMsg().getDpId().equals(user.getDpId())) {
				return messageViewNew( "您没有该操作的权限"); 
			}
			user.setPassword(null);// 禁止向客户端传递用户密码
			List<Deparment> list = null;
			if(getUserMsg().getUserType().equals(Constrants.SUPER_USER)){
				list = dpService.findAll();
			}
			return new ModelAndView("user/update", "data", user).addObject("dpList", list);
		} catch (Exception e) {
			log.error("update user error", e);
			throw e;
		}
	}
	/**
	 * 
		* @Function: userEdit
		* @Description: 更新用户信息
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-13   下午2:26:05
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@ResponseBody
	@RequestMapping("/user_edit")
	@Prev(module = "userManager", oprator = "update", decription = "系统用户更新")
	public ModelMap userEdit(
		Integer id,String name,Integer dpId) throws Exception {
		ModelMap map = new ModelMap();
		try {
			if (SystemUtil.validparamsNULL(id) || SystemUtil.validparamsNULL(name)) {
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				map.put(Constrants.MESSAGE_TIP, "您还有数据未填写");
				return map;
			}
			User user = userService.get(User.class, id);
			if(user == null){
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				map.put(Constrants.MESSAGE_TIP, "数据异常");
				return map;
			}
			if (!getUserMsg().getUserType().equals(Constrants.SUPER_USER)) {
				if (!user.getDepartment().getId().equals(getUserMsg().getDpId())) {
					map.put(Constrants.MESSAGE_TIP_FLAGS, false);
					map.put(Constrants.MESSAGE_TIP, "您没有该操作权限");
					return map;
				}
			}else{
				if(dpId == null){
					map.put(Constrants.MESSAGE_TIP_FLAGS, false);
					map.put(Constrants.MESSAGE_TIP, "请选择部门");
					return map;
				}
				if(dpService.get(Deparment.class, dpId) != null){
					user.setDpId(dpId);
				}
			}
			user.setNickName(name);
			user.setModifyTime(new Date());
			user.setUserStatus(Constrants.FREEZE_USER);
			userService.update(user);
			map.put(Constrants.MESSAGE_TIP_FLAGS, true);
			map.put(Constrants.MESSAGE_TIP, "修改成功");
			return map;
		} catch (Exception e) {
			log.error("update user error", e);
			throw e;
		}
	}


	/**
	 * 
		* @Function: startOrStop
		* @Description: 用户启用或者停用
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-18   上午9:32:56
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@ResponseBody
	@RequestMapping("/startOrStop")
	@Prev(module = "userManager", oprator = "startOrStop", decription = "用户启用或者停用")
	public ModelMap startOrStop(Integer id) throws Exception {
		ModelMap map = new ModelMap();
		try {
			if (SystemUtil.validparamsNULL(id)) {
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				map.put(Constrants.MESSAGE_TIP, "数据操作异常");
				return map;
			}
			User userp = userService.get(User.class, id);
			if (!getUserMsg().getUserType().equals(Constrants.SUPER_USER)
					&& !getUserMsg().getDpId().equals(userp.getDpId())) {
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				map.put(Constrants.MESSAGE_TIP, "您没有操作该用户的权限");
				return map;
			}

			userp.setUserStatus(userp.getUserStatus().intValue() == Constrants.USABLE_USER ? Constrants.FREEZE_USER
					: Constrants.USABLE_USER);
			userp.setModifyTime(new Date());
			userService.update(userp);
			map.put(Constrants.MESSAGE_TIP_FLAGS, true);
			map.put(Constrants.MESSAGE_TIP, userp.getUserStatus().intValue() == Constrants.USABLE_USER ? "启用"
					: "停用");
			return map;
		} catch (Exception e) {
			log.error("start or stop user by id error", e);
			throw e;
		}
	}
	
	/**
	 * 
		* @Function: authorPrevInit
		* @Description: 用户分配角色初始化
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-18   下午1:52:24
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/userPrevInit")
	@Prev(module = "userManager", oprator = "roleAssigned", decription = "用户角色分配")
	public String authorPrevInit(Integer id) throws Exception{
		try {
			if (id == null) {
				return messageView( "操作数据异常");
			}
			User userp = userService.get(User.class, id);
			if (userp == null) {
				return messageView( "操作数据异常");
			}
			if (!getUserMsg().getUserType().equals(Constrants.SUPER_USER)
					&& !getUserMsg().getDpId().equals(userp.getDpId())) {
				return messageView( "您没有操作权限");
			}
			List<Role> ro = userService.findRolesByUserId(id);
			HttpServletRequest request = getRequest();
			if(ro != null && ro.size() >0){
				request.setAttribute("ro", ro.get(0));
			}
			List<Role> ros = userService.findRoleAllOfUser(userp);
			request.setAttribute("ros", ros);
			request.setAttribute("id", id);
			return "user/prevRole";
		} catch (Exception e) {
			log.error("role assigned to user init error", e);
			throw e;
		}
	}

	/**
	 * 
		* @Function: authorprev
		* @Description: 系统用户角色分配
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-18   上午11:13:01
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@ResponseBody
	@RequestMapping("/userPrev")
	@Prev(module = "userManager", oprator = "roleAssigned", decription = "用户角色分配")
	public ModelMap authorprev(Integer id,Integer rId) throws Exception {
		ModelMap map = new ModelMap();
		try {
			if (id == null) {
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				map.put(Constrants.MESSAGE_TIP, "数据操作异常");
				return map;
			}
			User userp = userService.get(User.class, id);
			if (!getUserMsg().getUserType().equals(Constrants.SUPER_USER)
					&& !getUserMsg().getDpId().equals(userp.getDpId())) {
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				map.put(Constrants.MESSAGE_TIP, "您没有操作该用户的权限");
				return map;
			}
			if (rId == null || rId <= 0) {
				userService.deleteRoleByUserId(id);
			} else {
				Role role = userService.get(Role.class, rId);
				if (!getUserMsg().getUserType().equals(Constrants.SUPER_USER)
						&& !getUserMsg().getDpId().equals(
								role.getDepartmentId())) {
					map.put(Constrants.MESSAGE_TIP_FLAGS, false);
					map.put(Constrants.MESSAGE_TIP, "您没有操作该用户的权限");
					return map;
				}
				List<UserRole> userRoleList = userService
						.findUserRolesByUserId(id);
				if (userRoleList == null || userRoleList.size() <= 0) {
					UserRole ur = new UserRole(rId, id);
					userService.saveOrUpdate(ur);
				} else {
					userRoleList.get(0).setRoleId(rId);
					userService.saveOrUpdate(userRoleList.get(0));
				}
			}
			map.put(Constrants.MESSAGE_TIP_FLAGS, true);
			map.put(Constrants.MESSAGE_TIP, "分配角色成功");
			return map;
		} catch (Exception e) {
			log.error("role assigned to user error", e);
			throw e;
		}
	}

	/**
	 * 
		* @Function: userPwdInit
		* @Description: 用户密码重置  只对管理员开放不对普通用户开放
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-18   下午4:44:26
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@ResponseBody
	@RequestMapping("/pwdInt")
	@Prev(module = "userManager", oprator = "initPwd", decription = "用户密码重置")
	public ModelMap userPwdInit(Integer id) throws Exception {
		ModelMap map = new ModelMap();
		try {
			if (id == null) {
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				map.put(Constrants.MESSAGE_TIP, "数据异常");
				return map;
			}
			User user = userService.get(User.class, id);
			if(user == null){
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				map.put(Constrants.MESSAGE_TIP, "数据异常");
				return map;
			}
			if (!getUserMsg().getUserType().equals(Constrants.SUPER_USER)
					&& !getUserMsg().getDpId().equals(user.getDpId())) {
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				map.put(Constrants.MESSAGE_TIP, "您没有操作该用户的权限");
				return map;
			}
			// ICy5YqxZB1uWSwcVLSNLcA==  123
			user.setPassword(SystemUtil.MD5Digest(Constrants.SYS_DEFAULT_PWD));
			user.setModifyTime(new Date());
			userService.update(user);
			map.put(Constrants.MESSAGE_TIP_FLAGS, false);
			map.put(Constrants.MESSAGE_TIP, "重置密码成功");
			return map;
		} catch (Exception e) {
			log.error("user password reset by userId error", e);
			throw e;
		}
	}

	/**
	 * 
		* @Function: userPwdInit
		* @Description: 用户密码重置  只对管理员开放不对普通用户开放
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-18   下午4:44:26
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/personal")
	public String findPersonalMsg() throws Exception {
		try {
			User user = userService.get(User.class,getUserMsg().getId());
			user.setPassword("");
			HttpServletRequest request = getRequest();
			request.setAttribute("name",user.getDepartment() == null ? ""
					:user.getDepartment().getDpName());
			request.setAttribute("user", user);
			return "user/persion/personal";
		} catch (Exception e) {
			log.error("find ownerself message error", e);
			throw e;
		}
	}
	
	/**
	 * 
		* @Function: resetPwdInit
		* @Description: 用户修改密码初始化
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-18   下午4:53:38
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/upwdInt")
	public String resetPwdInit() throws Exception{
		return "user/persion/init";
	}
	/**
	 * 
		* @Function: resetPwd
		* @Description: 用户密码修改
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-18   下午4:44:26
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/pwdreset")
	public ModelAndView resetPwd(String oldPwd,String 
			password) throws Exception {
		try {
			if(SystemUtil.validparamsNULL(password) || SystemUtil.validparamsNULL(oldPwd)){
				return returnView("数据填写不完整", "user/persion/init");
			}
			User userp = getUserMsg();
			User user = userService.load(User.class, userp.getId());
			if(!SystemUtil.MD5Digest(oldPwd.trim()).equals(user.getPassword())){
				return returnView("原始密码不正确", "user/persion/init");
			}
			user.setPassword(SystemUtil.MD5Digest(password.trim()));
			user.setModifyTime(new Date());
			userService.update(user);
			return returnView("修改密码成功", "user/persion/init");
		} catch (Exception e) {
			log.error("reset ownerself password error", e);
			throw e;
		}
	}

	/********************** 部门管理 ************************/
	/**
	 * 
		* @Function: dp_list
		* @Description: 用户部门查看
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-19   上午10:27:17
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/dp_list")
	@Prev(module = "departMentManager", oprator = "find", decription = "用户部门管理")
	public ModelAndView dp_list(PageQueryUtil page) throws Exception {
		try {
			Map<String, Object> map = dpService.findDpAll(page);
			return backView("user/department/list", map);
		} catch (Exception e) {
			log.error("find all department error", e);
			throw e;
		}
	}
	
	/**
	 * 
		* @Function: dpAddInit
		* @Description: 部门添加
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-19   下午1:31:10
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/dp_addInit")
	@Prev(module = "departMentManager", oprator = "add", decription = "部门信息添加")
	public String dpAddInit() throws Exception{
		try {
			return "user/department/add";
		} catch (Exception e) {
			log.error("add department init error", e);
			throw e;
		}
	}
	/**
	 * 
		* @Function: dpAdd
		* @Description: 部门添加
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-19   下午1:31:10
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/dp_add")
	@Prev(module = "departMentManager", oprator = "add", decription = "部门信息添加")
	public ModelAndView dpAdd(String fn) throws Exception {
		try {
			if (SystemUtil.validparamsNULL(fn)) {
				return returnView("您还有数据未填写", dpAddInit());
			}
			Deparment dp = new Deparment();
			dp.setDpName(fn.trim());
			dp.setIsDel(Constrants.DATA_NOT_DEL);
			dpService.save(dp);
			return returnView("添加部门成功", dpAddInit());
		} catch (Exception e) {
			log.error("add department error", e);
			throw e;
		}
	}
	
	/**
	 * 
		* @Function: dpDel
		* @Description: 部门删除
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-19   下午1:58:39
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/dp_del")
	@Prev(module = "departMentManager", oprator = "delete", decription = "部门信息删除")
	public ModelAndView dpDel(Integer fid,PageQueryUtil page) throws Exception {
		try {
			if (SystemUtil.validparamsNULL(fid)) {
				return reView("您还有数据未填写", dp_list(page));
			}
			Deparment dp = dpService.get(Deparment.class, fid);
			if (dp != null) {
				dp.setIsDel(Constrants.DATA_DEL);
				dpService.update(dp);
			}
			return reView("删除成功", dp_list(page));
		} catch (Exception e) {
			log.error("delete Deparment error", e);
			throw e;
		}
	}
	/**
	 * 
		* @Function: dpEditInit
		* @Description: 部门编辑初始化
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-19   下午2:02:37
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@RequestMapping("/dp_edit_init")
	@Prev(module = "departMentManager", oprator = "update", decription = "部门信息修改")
	public String dpEditInit(Integer fid) throws Exception {
		try {
			if (SystemUtil.validparamsNULL(fid)) {
				return messageView( "操作数据不完整");
			}
			Deparment dpMent = dpService.get(Deparment.class, fid);
			getRequest().setAttribute("dp", dpMent);
			return "user/department/update";
		} catch (Exception e) {
			log.error("update Deparment error", e);
			throw e;
		}
	}
	/**
	 * 
		* @Function: dpEdit
		* @Description: 部门编辑
		*
		* @param:参数描述
		* @return：返回结果描述
		* @throws：异常描述
		*
		* @version: v1.0.0
		* @author: master
		* @date: 2015-5-19   下午2:02:37
		*
		* Modification History:
		* Date         Author          Version            Description
		*---------------------------------------------------------*
	 */
	@ResponseBody
	@RequestMapping("/dp_edit")
	@Prev(module = "departMentManager", oprator = "update", decription = "部门信息修改")
	public ModelMap dpEdit(Integer fid,String fn) throws Exception {
		try {
			ModelMap map = new ModelMap();
			if (SystemUtil.validparamsNULL(fid)
					|| SystemUtil.validparamsNULL(fn)) {
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
				map.put(Constrants.MESSAGE_TIP, "数据不完整");
				return map;
			}
			Deparment dpMent = dpService.get(Deparment.class, fid);
			if (dpMent != null) {
				dpMent.setDpName(fn.trim());
				dpService.update(dpMent);
			}
			map.put(Constrants.MESSAGE_TIP_FLAGS, true);
			map.put(Constrants.MESSAGE_TIP, "更新成功");
			return map;
		} catch (Exception e) {
			log.error("update Deparment error", e);
			throw e;
		}
	}
}
