package com.oa.contorller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.oa.entity.EmployeeInfo;
import com.oa.menu.Module;
import com.oa.prev.Prev;
import com.oa.service.EmployeeService;
import com.oa.service.HrService;
import com.oa.util.Constrants;
import com.oa.util.Log4jLogger;
import com.oa.util.PageQueryUtil;
import com.oa.util.StringTools;
import com.oa.util.TimeUtil;
import com.oa.validate.Validate;

@Controller
@RequestMapping("/system/hr")
@Module("HrManager")
public class HRController extends BaseController {

	private static final Log4jLogger log = Log4jLogger
			.getLogger(HRController.class);

	@Resource
	private HrService hrService;

	@Resource
	private EmployeeService employeeService;

	@RequestMapping("/statistics")
	@Prev(module = "statistics", oprator = "all")
	public ModelAndView statistics() throws Exception {
		try {
			return new ModelAndView("hr/statistics", "map",
					hrService.statisticsGender());
		} catch (Exception e) {
			log.error("statistics", e);
			throw e;
		}
	}

	@RequestMapping("/employeeInfoList")
	@Prev(module = "employeeInfoList", oprator = "all")
	public ModelAndView employeeInfoList(EmployeeInfo info, PageQueryUtil page)
			throws Exception {
		try {
			return backView("hr/employeeInfoList",
					hrService.findEmployeeInfoByPage(info, page));
		} catch (Exception e) {
			log.error("employeeInfoList error", e);
			throw e;
		}
	}

	@RequestMapping("/addEmployeeInfo")
	@Prev(module = "HrManager", oprator = "add")
	public String addEmployeeInfo() {
		return "hr/addEmployeeInfo";
	}

	@RequestMapping(value = "/addEmployeeInfoCommit", method = RequestMethod.POST)
	@Prev(module = "HrManager", oprator = "add")
	@ResponseBody
	public ModelMap addEmployeeInfoCommit(EmployeeInfo info, String entryTimeStr)
			throws Exception {
		try {
			ModelMap map = new ModelMap();
			boolean flag = false;
			Map<String, Object> m = Validate.valid(info);
			map.addAllAttributes(m);
			if (m.size() != 0) {
				flag = true;
			}

			String emailMessage = "";
			if (!map.containsKey("emailMessage")
					&& !employeeService.isOnlyEmail(info.getEmail().trim(),
							info.getId())) {
				flag = true;
				emailMessage = "邮箱名已注册过！";
				map.put("emailMessage", emailMessage);
			}

			String mobileNumberMessage = "";
			if (!map.containsKey("mobileNumberMessage")
					&& !employeeService.isOnlyMobileNumber(info
							.getMobileNumber().trim(), info.getId())) {
				flag = true;
				mobileNumberMessage = "手机号已注册过！";
				map.put("mobileNumberMessage", mobileNumberMessage);
			}

			if (flag == false) {
				StringTools.trim(info);
				info.setEntryTime(TimeUtil.toDate(entryTimeStr, 1));
				info.setIsDel(Constrants.DATA_NOT_DEL);
				if (info.getId() == null) {
					hrService.save(info);
				} else {
					hrService.update(info);
				}
				map.put(Constrants.MESSAGE_TIP, "操作成功！");
			}
			map.put(Constrants.MESSAGE_TIP_FLAGS, flag);
			return map;
		} catch (Exception e) {
			log.error("addEmployeeInfoCommit error", e);
			throw e;
		}
	}

	@RequestMapping("/updateEmployeeInfo")
	@Prev(module = "HrManager", oprator = "update")
	public ModelAndView updateEmployeeInfo(EmployeeInfo info,
			PageQueryUtil page, Long id) throws Exception {
		try {
			if (info.getName() != null) {
				info.setName(new String(info.getName().getBytes("iso-8859-1"),
						"UTF-8"));
			}
			return new ModelAndView("hr/addEmployeeInfo", "info",
					hrService.get(EmployeeInfo.class, id)).addObject(
					"employeeInfo", info).addObject("pageQueryUtil", page);
		} catch (Exception e) {
			log.error("updateEmployeeInfo error", e);
			throw e;
		}
	}

	@RequestMapping(value = "/deleteEmployeeInfo", method = RequestMethod.POST)
	@ResponseBody
	@Prev(module = "HrManager", oprator = "delete")
	public ModelMap deleteEmployeeInfo(Long id) throws Exception {
		try {
			ModelMap map = new ModelMap();
			if (id != null && hrService.deleteEmployeeInfo(id) == 1) {
				map.put(Constrants.MESSAGE_TIP, "删除成功");
				map.put(Constrants.MESSAGE_TIP_FLAGS, true);
			} else {
				map.put(Constrants.MESSAGE_TIP, "删除失败");
				map.put(Constrants.MESSAGE_TIP_FLAGS, false);
			}
			return map;
		} catch (Exception e) {
			log.error("deleteEmployeeInfo error", e);
			throw e;
		}
	}

}