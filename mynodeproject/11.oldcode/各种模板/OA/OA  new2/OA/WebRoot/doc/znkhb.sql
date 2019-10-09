/*
Navicat MySQL Data Transfer

Source Server         : mysql-5.6.23-win32
Source Server Version : 50623
Source Host           : localhost:3306
Source Database       : znkhb_db

Target Server Type    : MYSQL
Target Server Version : 50623
File Encoding         : 65001

Date: 2015-09-04 14:05:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for baby_info
-- ----------------------------
DROP TABLE IF EXISTS `baby_info`;
CREATE TABLE `baby_info` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `baby_name` varchar(45) DEFAULT NULL COMMENT '宝宝名称',
  `baby_sex` int(10) unsigned DEFAULT NULL COMMENT '性别：0男，1女',
  `baby_weight` double DEFAULT NULL COMMENT '宝宝体重单位kg',
  `baby_birthday` datetime DEFAULT NULL COMMENT '宝宝生日',
  `baby_height` int(10) unsigned DEFAULT NULL COMMENT '宝宝身高单位cm',
  `customer_id` bigint(20) unsigned DEFAULT NULL COMMENT '客户ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='宝宝信息表';

-- ----------------------------
-- Records of baby_info
-- ----------------------------
INSERT INTO `baby_info` VALUES ('1', '小明', '1', '123', '2015-09-02 09:45:27', '123', '1');
INSERT INTO `baby_info` VALUES ('2', '小红', '0', '212', '2015-09-02 09:45:50', '121', '2');
INSERT INTO `baby_info` VALUES ('3', '小李', '1', '122', '2015-09-02 10:39:13', '111', '3');
INSERT INTO `baby_info` VALUES ('4', '小陈', '1', '111', '2015-09-02 10:39:32', '111', '4');
INSERT INTO `baby_info` VALUES ('5', '小许', '0', '111', '2015-09-02 10:39:47', '111', '5');
INSERT INTO `baby_info` VALUES ('6', '小徐', '1', '111', '2015-09-02 10:40:08', '111', '6');
INSERT INTO `baby_info` VALUES ('7', '小张', '0', '111', '2015-09-02 10:40:28', '111', '7');
INSERT INTO `baby_info` VALUES ('8', '小赵', '1', '111', '2015-09-02 10:40:48', '111', '8');
INSERT INTO `baby_info` VALUES ('9', '小猴', '1', '111', '2015-09-02 10:41:05', '122', '9');
INSERT INTO `baby_info` VALUES ('10', '小谢', '1', '111', '2015-09-02 10:41:23', '133', '10');
INSERT INTO `baby_info` VALUES ('11', '小沈', '0', '32', '2015-09-02 10:41:41', '212', '11');
INSERT INTO `baby_info` VALUES ('12', '小程', '0', '23', '2015-09-02 10:42:14', '123', '12');
INSERT INTO `baby_info` VALUES ('13', '笑笑', '1', '45', '2015-09-02 10:42:37', '144', '13');
INSERT INTO `baby_info` VALUES ('14', '明明', '0', '34', '2015-09-02 10:42:54', '221', '14');
INSERT INTO `baby_info` VALUES ('15', '可可', '1', '234', '2015-09-02 10:43:10', '343', '15');
INSERT INTO `baby_info` VALUES ('16', '红红', '1', '122', '2015-09-02 10:43:30', '44', '16');
INSERT INTO `baby_info` VALUES ('17', '歇歇', '0', '23', '2015-09-02 10:43:50', '64', '17');

-- ----------------------------
-- Table structure for baby_pic
-- ----------------------------
DROP TABLE IF EXISTS `baby_pic`;
CREATE TABLE `baby_pic` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `src_path` varchar(100) DEFAULT NULL COMMENT '照片路径',
  `babyId` bigint(20) unsigned DEFAULT NULL COMMENT '宝宝ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='宝宝照片';

-- ----------------------------
-- Records of baby_pic
-- ----------------------------
INSERT INTO `baby_pic` VALUES ('1', 'images/babyImg/200851610241988_2.jpg', '1');
INSERT INTO `baby_pic` VALUES ('2', 'images/babyImg/200851610241988_2.jpg', '2');
INSERT INTO `baby_pic` VALUES ('3', 'images/babyImg/200851610241988_2.jpg', '3');
INSERT INTO `baby_pic` VALUES ('4', 'images/babyImg/200851610241988_2.jpg', '4');
INSERT INTO `baby_pic` VALUES ('5', 'images/babyImg/200851610241988_2.jpg', '5');
INSERT INTO `baby_pic` VALUES ('6', 'images/babyImg/200851610241988_2.jpg', '6');
INSERT INTO `baby_pic` VALUES ('7', 'images/babyImg/200851610241988_2.jpg', '7');
INSERT INTO `baby_pic` VALUES ('8', 'images/babyImg/200851610241988_2.jpg', '8');
INSERT INTO `baby_pic` VALUES ('9', 'images/babyImg/200851610241988_2.jpg', '9');
INSERT INTO `baby_pic` VALUES ('10', 'images/babyImg/200851610241988_2.jpg', '10');
INSERT INTO `baby_pic` VALUES ('11', 'images/babyImg/200851610241988_2.jpg', '11');
INSERT INTO `baby_pic` VALUES ('12', 'images/babyImg/200851610241988_2.jpg', '12');
INSERT INTO `baby_pic` VALUES ('13', 'images/babyImg/200851610241988_2.jpg', '13');
INSERT INTO `baby_pic` VALUES ('14', 'images/babyImg/200851610241988_2.jpg', '14');
INSERT INTO `baby_pic` VALUES ('15', 'images/babyImg/200851610241988_2.jpg', '15');
INSERT INTO `baby_pic` VALUES ('16', 'images/babyImg/a.jpg', '16');
INSERT INTO `baby_pic` VALUES ('17', 'images/babyImg/200851610241988_2.jpg', '17');
INSERT INTO `baby_pic` VALUES ('18', 'images/babyImg/680294_132835000988_2.jpg', '18');
INSERT INTO `baby_pic` VALUES ('19', 'images/babyImg/200881892649781_2.jpg', '19');
INSERT INTO `baby_pic` VALUES ('20', 'images/babyImg/680294_132835000988_2.jpg', '20');
INSERT INTO `baby_pic` VALUES ('21', 'images/babyImg/200881892649781_2.jpg', '21');

-- ----------------------------
-- Table structure for cus_opinion
-- ----------------------------
DROP TABLE IF EXISTS `cus_opinion`;
CREATE TABLE `cus_opinion` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cus_opinion_content` varchar(700) DEFAULT NULL COMMENT '意见建议内容',
  `user_id` bigint(20) DEFAULT NULL COMMENT '创建者ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `isDel` int(10) unsigned DEFAULT NULL COMMENT '是否有效，0为无效，1为有效',
  `parent_id` bigint(20) unsigned DEFAULT NULL COMMENT '父类所属ID',
  `type` int(10) unsigned DEFAULT NULL COMMENT '留言类型，0意见建议，1平台回复',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='客户意见建议表';

-- ----------------------------
-- Records of cus_opinion
-- ----------------------------
INSERT INTO `cus_opinion` VALUES ('1', '数风流人物还看今朝', '1', '2015-09-06 10:23:17', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('2', '数风流人物还看今朝', '1', '2015-09-06 10:24:55', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('3', '数风流人物还看今朝', '1', '2015-09-06 10:25:11', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('4', '数风流人物还看今朝', '1', '2015-09-06 10:25:24', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('5', '数风流人物还看今朝', '1', '2015-09-06 10:25:37', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('6', '数风流人物还看今朝', '1', '2015-09-07 10:26:15', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('7', '数风流人物还看今朝', '1', '2015-09-07 10:30:17', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('8', '数风流人物还看今朝', '1', '2015-09-07 10:30:28', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('9', '数风流人物还看今朝', '1', '2015-09-07 10:30:38', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('10', '数风流人物还看今朝', '1', '2015-09-07 10:30:51', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('11', '数风流人物还看今朝', '1', '2015-09-07 10:31:02', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('12', '数风流人物还看今朝', '1', '2015-09-07 10:31:16', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('13', '数风流人物还看今朝', '1', '2015-09-07 10:31:28', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('14', '数风流人物还看今朝', '1', '2015-09-07 10:31:39', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('15', '数风流人物还看今朝', '1', '2015-09-07 10:31:56', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('16', '数风流人物还看今朝', '1', '2015-09-07 10:32:14', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('17', '数风流人物还看今朝', '1', '2015-09-07 10:32:29', '0', '0', '0');
INSERT INTO `cus_opinion` VALUES ('18', '真好真好', '1', '2015-09-07 11:45:07', '0', '1', '1');
INSERT INTO `cus_opinion` VALUES ('19', '好诗好诗', '1', '2015-09-07 11:42:43', '0', '1', '1');
INSERT INTO `cus_opinion` VALUES ('20', '写的真好！', '1', '2015-09-07 16:27:57', '0', '2', '1');
INSERT INTO `cus_opinion` VALUES ('21', '恰似一江春水向东流', '1', '2015-09-07 16:36:28', '0', '14', '1');
INSERT INTO `cus_opinion` VALUES ('22', '恰似一江春水向东流', '1', '2015-09-07 16:37:48', '0', '1', '1');

-- ----------------------------
-- Table structure for sys_customer
-- ----------------------------
DROP TABLE IF EXISTS `sys_customer`;
CREATE TABLE `sys_customer` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `nickName` varchar(45) DEFAULT NULL COMMENT '昵称',
  `phoneNumber` varchar(45) DEFAULT NULL COMMENT '电话号码',
  `email` varchar(45) DEFAULT NULL COMMENT '邮箱',
  `password` varchar(45) DEFAULT NULL COMMENT '密码',
  `loginTime` datetime DEFAULT NULL COMMENT '登录时间 ',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `status` int(10) unsigned DEFAULT NULL COMMENT '是否有效，0为无效，1为有效,默认1',
  `babyId` bigint(20) unsigned DEFAULT NULL COMMENT '关联婴儿ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='客户表';

-- ----------------------------
-- Records of sys_customer
-- ----------------------------
INSERT INTO `sys_customer` VALUES ('1', '诸葛亮', '123343443', '2332434', '123', '2015-09-01 17:25:34', '2015-09-01 17:25:37', '2015-09-01 17:25:40', '0', '1');
INSERT INTO `sys_customer` VALUES ('2', '司马懿', '2123343443', '232332', '123', '2015-09-01 17:26:14', '2015-09-01 17:26:17', '2015-09-01 17:26:19', '1', '2');
INSERT INTO `sys_customer` VALUES ('3', '张三', '1123343344', '233434', '123', '2015-09-02 10:31:41', '2015-09-02 10:31:44', '2015-09-02 10:31:46', '0', '3');
INSERT INTO `sys_customer` VALUES ('4', '李四', '4223444543', '212344', '123', '2015-09-02 10:32:11', '2015-09-02 10:32:14', '2015-09-02 10:32:16', '1', '4');
INSERT INTO `sys_customer` VALUES ('5', '王五', '2233223', '232233', '123', '2015-09-02 10:32:37', '2015-09-02 10:32:39', '2015-09-02 10:32:43', '0', '5');
INSERT INTO `sys_customer` VALUES ('6', '赵云', '122334455', '2123445', '123', '2015-09-02 10:33:05', '2015-09-02 10:33:08', '2015-09-02 10:33:11', '0', '6');
INSERT INTO `sys_customer` VALUES ('7', '关羽', '232334444', '2123344', '123', '2015-09-02 10:33:34', '2015-09-02 10:33:36', '2015-09-02 10:33:38', '1', '7');
INSERT INTO `sys_customer` VALUES ('8', '张飞', '21233234455', '1223445', '123', '2015-09-02 10:34:00', '2015-09-02 10:34:02', '2015-09-02 10:34:06', '0', '8');
INSERT INTO `sys_customer` VALUES ('9', '张辽', '21111112333', '1122323', '123', '2015-09-02 10:34:29', '2015-09-02 10:34:31', '2015-09-02 10:34:33', '0', '9');
INSERT INTO `sys_customer` VALUES ('10', '廖化', '111111111111', '1111111', '123', '2015-09-02 10:34:55', '2015-09-02 10:34:58', '2015-09-02 10:35:00', '0', '10');
INSERT INTO `sys_customer` VALUES ('11', '姜维', '111111111111', '1223233', '123', '2015-09-02 10:35:20', '2015-09-02 10:35:23', '2015-09-02 10:35:25', '0', '11');
INSERT INTO `sys_customer` VALUES ('12', '法正', '111111111111', '1111111', '123', '2015-09-02 10:35:55', '2015-09-02 10:35:57', '2015-09-02 10:36:01', '0', '12');
INSERT INTO `sys_customer` VALUES ('13', '刘备', '132345543224', '2435455', '123', '2015-09-02 10:36:28', '2015-09-02 10:36:32', '2015-09-02 10:36:35', '1', '13');
INSERT INTO `sys_customer` VALUES ('14', '曹操', '121233445455', '1212344', '123', '2015-09-02 10:36:57', '2015-09-02 10:37:00', '2015-09-02 10:37:02', '0', '14');
INSERT INTO `sys_customer` VALUES ('15', '吕布', '122333444555', '1345666', '123', '2015-10-18 10:37:24', '2015-10-18 10:37:27', '2015-10-18 10:37:30', '0', '15');
INSERT INTO `sys_customer` VALUES ('16', '郭嘉', '213445455555', '1234565', '123', '2015-10-18 9:43:02', '2015-10-18 9:48:04', '2015-10-18 9:48:07', '1', '16');
INSERT INTO `sys_customer` VALUES ('17', '魏延', '234556565656', '2332455', '123', '2015-10-18 10:38:35', '2015-10-18 10:38:37', '2015-10-18 10:38:40', '0', '17');

-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
DROP TABLE IF EXISTS `znkhb_db`.`sys_notice`;
CREATE TABLE  `znkhb_db`.`sys_notice` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `notice_content` text COMMENT '公告内容',
  `user_id` int(10) unsigned DEFAULT NULL COMMENT '发布者ID',
  `status` int(10) unsigned DEFAULT NULL COMMENT '公告状态，0：未发布，1已发布',
  `create_time` datetime DEFAULT NULL COMMENT '发布时间',
  `is_del` int(10) unsigned DEFAULT NULL COMMENT '0:未删除，1：已删除',
  `title` varchar(100) DEFAULT NULL COMMENT '公告标题',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统公告';

-- ----------------------------
-- Records of sys_notice
-- ----------------------------

-- ----------------------------
-- Table structure for sys_notice_status
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice_status`;
CREATE TABLE `sys_notice_status` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL COMMENT '查阅用户ID',
  `sys_notice_id` int(10) unsigned DEFAULT NULL COMMENT '查阅公告ID',
  `create_time` datetime DEFAULT NULL COMMENT '查阅时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公告用户查阅状态';

-- ----------------------------
-- Records of sys_notice_status
-- ----------------------------

-- ----------------------------
-- Table structure for sys_prev_deparment
-- ----------------------------
DROP TABLE IF EXISTS `sys_prev_deparment`;
CREATE TABLE `sys_prev_deparment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '权限部门编号',
  `dp_name` varchar(45) DEFAULT NULL COMMENT '部门名称',
  `is_del` int(10) unsigned DEFAULT NULL COMMENT '是否删除 0：未删除 1：已删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限部门表';

-- ----------------------------
-- Records of sys_prev_deparment
-- ----------------------------

-- ----------------------------
-- Table structure for sys_prev_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_prev_role`;
CREATE TABLE `sys_prev_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `prev_id` int(11) DEFAULT NULL COMMENT '权限ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色权限关系表';

-- ----------------------------
-- Records of sys_prev_role
-- ----------------------------

-- ----------------------------
-- Table structure for sys_privilege
-- ----------------------------
DROP TABLE IF EXISTS `sys_privilege`;
CREATE TABLE `sys_privilege` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '权限编号',
  `module` varchar(45) DEFAULT NULL COMMENT '操作模块',
  `oprator` varchar(45) DEFAULT NULL COMMENT '功能',
  `parent_id` int(11) DEFAULT NULL COMMENT '所属父类ID',
  `prev_name` varchar(45) DEFAULT NULL COMMENT '权限名称',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_Key_1` (`module`,`oprator`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COMMENT='系统权限表';

-- ----------------------------
-- Records of sys_privilege
-- ----------------------------
INSERT INTO `sys_privilege` VALUES ('1', 'UserSysManager', 'all', '0', '基本信息中心');
INSERT INTO `sys_privilege` VALUES ('2', 'roleManager', 'find', '1', '用户角色管理');
INSERT INTO `sys_privilege` VALUES ('3', 'roleManager', 'add', '2', '角色信息添加');
INSERT INTO `sys_privilege` VALUES ('4', 'roleManager', 'delete', '2', '角色信息删除');
INSERT INTO `sys_privilege` VALUES ('5', 'roleManager', 'update', '2', '角色信息修改');
INSERT INTO `sys_privilege` VALUES ('6', 'roleManager', 'privilege', '2', '用户角色授权');
INSERT INTO `sys_privilege` VALUES ('7', 'userManager', 'find', '1', '系统用户管理');
INSERT INTO `sys_privilege` VALUES ('8', 'userManager', 'add', '7', '系统用户添加');
INSERT INTO `sys_privilege` VALUES ('9', 'userManager', 'delete', '7', '系统用户删除');
INSERT INTO `sys_privilege` VALUES ('10', 'userManager', 'update', '7', '系统用户更新');
INSERT INTO `sys_privilege` VALUES ('11', 'userManager', 'startOrStop', '7', '用户启用或者停用');
INSERT INTO `sys_privilege` VALUES ('12', 'userManager', 'roleAssigned', '7', '用户角色分配');
INSERT INTO `sys_privilege` VALUES ('13', 'userManager', 'initPwd', '7', '用户密码重置');
INSERT INTO `sys_privilege` VALUES ('14', 'departMentManager', 'find', '1', '用户部门管理');
INSERT INTO `sys_privilege` VALUES ('15', 'departMentManager', 'add', '14', '部门信息添加');
INSERT INTO `sys_privilege` VALUES ('16', 'departMentManager', 'delete', '14', '部门信息删除');
INSERT INTO `sys_privilege` VALUES ('17', 'departMentManager', 'update', '14', '部门信息修改');
INSERT INTO `sys_privilege` VALUES ('18', 'CustomerCenterManager', 'all', '0', '客户管理中心');
INSERT INTO `sys_privilege` VALUES ('19', 'customerManager', 'find', '18', '客户信息管理');
INSERT INTO `sys_privilege` VALUES ('20', 'customerManager', 'babyDetail', '19', '宝贝详情');
INSERT INTO `sys_privilege` VALUES ('21', 'customerManager', 'add', '19', '添加客户');
INSERT INTO `sys_privilege` VALUES ('22', 'customerManager', 'delete', '19', '删除客户');
INSERT INTO `sys_privilege` VALUES ('23', 'customerManager', 'update', '19', '修改客户信息');
INSERT INTO `sys_privilege` VALUES ('24', 'customerStartOrStopManager', 'update', '19', '帐号启用或停用');
INSERT INTO `sys_privilege` VALUES ('25', 'customerPwbReManager', 'update', '19', '密码重置');
INSERT INTO `sys_privilege` VALUES ('26', 'BabyCenterManager', 'all', '0', '婴儿管理中心');
INSERT INTO `sys_privilege` VALUES ('27', 'babyManager', 'find', '26', '婴儿信息列表');
INSERT INTO `sys_privilege` VALUES ('28', 'babyManager', 'delete', '27', '删除婴儿信息');
INSERT INTO `sys_privilege` VALUES ('29', 'babyManager', 'detail', '27', '查看婴儿详情');

INSERT INTO `sys_privilege` VALUES ('30', 'SysManager', 'all', '0', '系统管理中心');
INSERT INTO `sys_privilege` VALUES ('31', 'noticeManager', 'find', '30', '系统公告管理');
INSERT INTO `sys_privilege` VALUES ('32', 'noticeManager', 'publish', '30', '发布公告');
INSERT INTO `sys_privilege` VALUES ('33', 'noticeManager', 'delete', '30', '系统公告删除');
INSERT INTO `sys_privilege` VALUES ('34', 'noticeManager', 'update', '30', '系统公告修改');
INSERT INTO `sys_privilege` VALUES ('35', 'noticeManager', 'add', '30', '系统公告添加');

INSERT INTO `sys_privilege` VALUES ('36', 'optionManager', 'find', '18', '客户建议管理');
INSERT INTO `sys_privilege` VALUES ('37', 'optionDetailManager', 'find', '36', '客户建议详情');
INSERT INTO `sys_privilege` VALUES ('38', 'optionManager', 'add', '36', '回复编辑');
INSERT INTO `sys_privilege` VALUES ('39', 'optionManager', 'delete', '36', '删除建议');
INSERT INTO `sys_privilege` VALUES ('40', 'optionManager', 'replyUpdate', '36', '回复修改');
INSERT INTO `sys_privilege` VALUES ('41', 'optionManager', 'replyDelete', '36', '删除回复');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(45) DEFAULT NULL COMMENT '角色名称',
  `role_type` int(11) DEFAULT NULL COMMENT '角色类型（0：系统角色 1：部门角色）',
  `department_id` int(11) DEFAULT NULL COMMENT '部门ID',
  `description` varchar(45) DEFAULT NULL COMMENT '角色描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of sys_role
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_name` varchar(45) DEFAULT NULL COMMENT '用户账号',
  `password` varchar(45) DEFAULT NULL COMMENT '用户密码',
  `user_type` int(11) DEFAULT NULL COMMENT '用户类型（0：超级管理员 1：普通用户）',
  `dp_id` int(11) DEFAULT NULL COMMENT '权限部门编号',
  `user_status` int(11) DEFAULT NULL COMMENT '用户状态(0:启用 1:冻结)',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '修改时间',
  `login_time` datetime DEFAULT NULL COMMENT '登录时间',
  `nick_name` varchar(45) DEFAULT NULL COMMENT '用户名称',
  `is_del` int(10) unsigned DEFAULT NULL COMMENT '是否删除 0：未删除 1：删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_Key_2` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'admin', 'ICy5YqxZB1uWSwcVLSNLcA==', '0', null, '0', null, null, '2015-09-04 13:50:26', '小黑', '0');
INSERT INTO `sys_user` VALUES ('2', 'admin1', 'ICy5YqxZB1uWSwcVLSNLcA==', '0', null, '0', null, null, '2015-09-04 13:50:26', '小白', '0');

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色关系表';


DROP TABLE IF EXISTS `znkhb_db`.`sensor_hour_data`;
CREATE TABLE  `znkhb_db`.`sensor_hour_data` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `data_time` bigint(20) unsigned DEFAULT NULL COMMENT '监测时间',
  `mac` varchar(45) DEFAULT NULL COMMENT 'MAC',
  `temperature` double DEFAULT NULL COMMENT '温度',
  `humidity` double DEFAULT NULL COMMENT '湿度',
  `motion` double DEFAULT NULL COMMENT '加速度',
  `amount` int(10) unsigned DEFAULT NULL COMMENT '数量',
  `customer_id` bigint(20) unsigned DEFAULT NULL COMMENT '客户ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='每小时监测数据';

DROP TABLE IF EXISTS `znkhb_db`.`sensor_minute_data`;
CREATE TABLE  `znkhb_db`.`sensor_minute_data` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `data_time` bigint(20) unsigned DEFAULT NULL COMMENT '数据时间',
  `mac` varchar(45) DEFAULT NULL COMMENT 'MAC',
  `temperature` double DEFAULT NULL COMMENT '温度',
  `humidity` double DEFAULT NULL COMMENT '湿度',
  `motion` double DEFAULT NULL COMMENT '加速度',
  `amount` int(10) unsigned DEFAULT NULL COMMENT '数量',
  `customer_id` bigint(20) unsigned DEFAULT NULL COMMENT '客户ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='每分钟监测数据';

DROP TABLE IF EXISTS `znkhb_db`.`tb_authentication`;
CREATE TABLE  `znkhb_db`.`tb_authentication` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `session_id` varchar(100) DEFAULT NULL COMMENT '会话ID',
  `user_id` bigint(20) unsigned DEFAULT NULL COMMENT '会话登录用户ID',
  `login_time` bigint(20) unsigned DEFAULT NULL COMMENT '登录时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_1` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户登录信息状态表';

INSERT INTO `tb_authentication` VALUES('1','12344','16','1445218793269');
INSERT INTO `tb_authentication` VALUES('2','142588','15','1445218693269');

