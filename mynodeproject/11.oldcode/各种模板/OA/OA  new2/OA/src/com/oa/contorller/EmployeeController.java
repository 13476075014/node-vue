package com.oa.contorller;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.oa.bean.DateEntity;
import com.oa.bean.EmployeeInfoBean;
import com.oa.entity.User;
import com.oa.menu.Module;
import com.oa.service.EmployeeService;
import com.oa.service.UserService;
import com.oa.util.ExportExcel;
import com.oa.util.Log4jLogger;
import com.oa.util.PageQueryUtil;
import com.oa.util.TimeUtil;

@Controller
@RequestMapping("/system/employee")
@Module("EmployeeManager")
public class EmployeeController extends BaseController {

	private static final Log4jLogger log = Log4jLogger
			.getLogger(EmployeeController.class);
	
	@Resource
	private EmployeeService employeeService;

	@Resource
	private UserService userService;

	@RequestMapping("/personalInfo")
	public ModelAndView personalInfo() throws Exception {
		EmployeeInfoBean employeeInfo = null;
		try {
			employeeInfo = employeeService.findMyInfo(getUserMessage().getId());
			return new ModelAndView("employee/personalInfo", "employeeInfo",
					employeeInfo);
		} catch (Exception e) {
			log.error("personalInfo error", e);
			throw e;
		}
	}

	@RequestMapping("/addressList")
	public ModelAndView addressList(EmployeeInfoBean employeeInfo,
			PageQueryUtil page) throws Exception {
		Map<String, Object> map = null;
		try {
			map = employeeService.findAddressByPage(employeeInfo, page);
			return backView("employee/addressList", map);
		} catch (Exception e) {
			log.error("addressList error", e);
			throw e;
		}
	}

	@RequestMapping("/exportAddressExcel")
	public void exportAddressExcel(HttpServletResponse response)
			throws Exception {
		List<EmployeeInfoBean> list = null;
		try {
			list = employeeService.findAddressAll();
			for (int i = 0; i < list.size(); i++) {
				list.get(i).setId((long) (i + 1));
			}
			String[] headers = { "序号", "姓名", "手机号", "邮箱号", "qq号" };
			String[] columns = { "id", "name", "mobileNumber", "email",
					"qqNumber" };
			String filename = TimeUtil.getDate(null, 3) + "公司员工通讯录.xls";
			response.setContentType("application/vnd.ms-excel");
			// response.setContentType("multipart/form-data");
			response.setHeader("Content-disposition", "attachment;filename="
					+ new String(filename.getBytes("utf-8"), "ISO8859-1"));
			OutputStream out;
			out = response.getOutputStream();
			// sheetName,列表标题,数据列表
			ExportExcel<EmployeeInfoBean> ex = new ExportExcel<EmployeeInfoBean>();
			ex.exportExcel1(filename, headers, columns, list, out);
			out.close();
		} catch (Exception e) {
			log.error("exportAddressExcel error", e);
			throw e;
		}
	}

	/**
	 * 
	 * @Function: userPwdInit
	 * @Description: 用户密码重置 只对管理员开放不对普通用户开放
	 * 
	 * @param:参数描述
	 * @return：返回结果描述
	 * @throws：异常描述
	 * 
	 * @version: v1.0.0
	 * @author: master
	 * @date: 2015-5-18 下午4:44:26
	 * 
	 *        Modification History: Date Author Version Description
	 *        ---------------------------------------------------------*
	 */
	@RequestMapping("/personal")
	public String findPersonalMsg() throws Exception {
		try {
			User user = userService.get(User.class, getUserMsg().getId());
			user.setPassword("");
			getRequest().setAttribute(
					"name",
					user.getDepartment() == null ? "" : user.getDepartment()
							.getDpName());
			getRequest().setAttribute("user", user);
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
	 * @date: 2015-5-18 下午4:53:38
	 * 
	 *        Modification History: Date Author Version Description
	 *        ---------------------------------------------------------*
	 */
	@RequestMapping("/upwdInt")
	public String resetPwdInit() throws Exception {
		return "user/persion/init";
	}

	@RequestMapping("/salaryList")
	public ModelAndView salaryList(PageQueryUtil page, DateEntity date)
			throws Exception {
		Map<String, Object> map = null;
		try {
			map = employeeService.findMySalaryInfoByPage(date, page,
					getUserMessage().getId());
			return backView("employee/salaryList", map);
		} catch (Exception e) {
			log.error("salaryList error", e);
			throw e;
		}
	}

	@RequestMapping("/leaveList")
	public ModelAndView leaveList(PageQueryUtil page, DateEntity date)
			throws Exception {
		Map<String, Object> map = null;
		try {
			map = employeeService.findMyLeaveInfoByPage(date, page,
					getUserMessage().getId());
			return backView("employee/leaveList", map);
		} catch (Exception e) {
			log.error("leaveList error", e);
			throw e;
		}
	}

}
