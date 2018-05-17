/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50711
Source Host           : localhost:3306
Source Database       : xindaioa

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2016-03-31 23:11:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `wos_department`
-- ----------------------------
DROP TABLE IF EXISTS `wos_department`;
CREATE TABLE `wos_department` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `pid` int(2) NOT NULL DEFAULT '0',
  `name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of wos_department
-- ----------------------------
INSERT INTO `wos_department` VALUES ('6', '2', '抵押贷款部');
INSERT INTO `wos_department` VALUES ('7', '2', '信贷部');
INSERT INTO `wos_department` VALUES ('13', '6', '人民大街分店');
INSERT INTO `wos_department` VALUES ('14', '6', '北京大路分店');
INSERT INTO `wos_department` VALUES ('17', '6', '火车站分店');
INSERT INTO `wos_department` VALUES ('23', '1', '监事会');
INSERT INTO `wos_department` VALUES ('24', '1', '高管办');
INSERT INTO `wos_department` VALUES ('28', '0', '股东大会');
INSERT INTO `wos_department` VALUES ('29', '28', '董事会');
INSERT INTO `wos_department` VALUES ('30', '28', '监事会');
INSERT INTO `wos_department` VALUES ('31', '29', '经理办公室');
INSERT INTO `wos_department` VALUES ('32', '31', '综合行政部');
INSERT INTO `wos_department` VALUES ('33', '32', '人力资源部');
INSERT INTO `wos_department` VALUES ('34', '32', '企划拓展部');
INSERT INTO `wos_department` VALUES ('35', '32', '法务信审部');
INSERT INTO `wos_department` VALUES ('36', '31', '财务部');
INSERT INTO `wos_department` VALUES ('37', '31', '风险管理部');
INSERT INTO `wos_department` VALUES ('38', '31', '信贷部');
INSERT INTO `wos_department` VALUES ('42', '38', '人民大街门店');
INSERT INTO `wos_department` VALUES ('43', '42', '个人信贷事业组');
INSERT INTO `wos_department` VALUES ('44', '42', '企业信贷事业组');
INSERT INTO `wos_department` VALUES ('45', '38', '北京大街门店');
INSERT INTO `wos_department` VALUES ('46', '45', '个人信贷事业组');
INSERT INTO `wos_department` VALUES ('47', '38', '上海大街门店');
INSERT INTO `wos_department` VALUES ('48', '47', '个人信贷事业组');
INSERT INTO `wos_department` VALUES ('49', '31', '客服中心');
INSERT INTO `wos_department` VALUES ('50', '31', '投资部');
INSERT INTO `wos_department` VALUES ('51', '37', '授信审批部');
INSERT INTO `wos_department` VALUES ('52', '37', '评级审批部');
INSERT INTO `wos_department` VALUES ('53', '37', '应收清算部');
INSERT INTO `wos_department` VALUES ('55', '45', '三农信贷事业部');
INSERT INTO `wos_department` VALUES ('56', '49', '客户维护中心');
INSERT INTO `wos_department` VALUES ('57', '49', '贷后资金管理中心');
INSERT INTO `wos_department` VALUES ('58', '32', '投资管理中心');
INSERT INTO `wos_department` VALUES ('59', '38', '网络平台管理中心');
INSERT INTO `wos_department` VALUES ('60', '32', '网络管理办公室');

-- ----------------------------
-- Table structure for `wos_mod`
-- ----------------------------
DROP TABLE IF EXISTS `wos_mod`;
CREATE TABLE `wos_mod` (
  `id` int(3) NOT NULL,
  `enname` varchar(20) COLLATE utf8_bin NOT NULL,
  `ico` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(15) COLLATE utf8_bin NOT NULL,
  `info` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `choose` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of wos_mod
-- ----------------------------
INSERT INTO `wos_mod` VALUES ('80', 'files', 'am-icon-files-o', '文件柜', '管理内部共享文件，模板文件。具有秒传文件，档案自动备份等功能。适用于：标准版、商业版、合伙人版、金矿版。请管理员部署文件夹属性。根据业务不同部署不同的读取和删除等属性。', '0');
INSERT INTO `wos_mod` VALUES ('85', 'users', 'am-icon-user-plus', '用户管理', '根据企业规模设定部门，职能，员工等信息。含有HR的部分功能。用于员工信息管理及收集。', '0');
INSERT INTO `wos_mod` VALUES ('99', 'system', 'am-icon-gear', '系统设置', '设置系统内核，建议只开放管理员权限。', '0');

-- ----------------------------
-- Table structure for `wos_mod_fun`
-- ----------------------------
DROP TABLE IF EXISTS `wos_mod_fun`;
CREATE TABLE `wos_mod_fun` (
  `id` int(3) NOT NULL,
  `mod_id` int(3) NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  `info` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `choose` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of wos_mod_fun
-- ----------------------------
INSERT INTO `wos_mod_fun` VALUES ('801', '80', '公用文件（读）', '文件只能读取，不允许修改和删除', '0');
INSERT INTO `wos_mod_fun` VALUES ('802', '80', '公用文件（写）', '可以修改公用文件，但不能删除', '0');
INSERT INTO `wos_mod_fun` VALUES ('803', '80', '公用文件（删）', '可以删除公用文件', '0');
INSERT INTO `wos_mod_fun` VALUES ('804', '80', '所有文件（读）', '可以查看所有人的私有文件', '0');
INSERT INTO `wos_mod_fun` VALUES ('805', '80', '所有文件（写）', '可以对所有人的私有文件进行修改', '0');
INSERT INTO `wos_mod_fun` VALUES ('806', '80', '所有文件（删）', '可以删除所有人的私有文件', '0');
INSERT INTO `wos_mod_fun` VALUES ('807', '80', '建立共享文件夹', '可以建立文件夹，设定共享权限', '0');
INSERT INTO `wos_mod_fun` VALUES ('851', '85', '添加/修改员工信息', '添加新员工', '0');
INSERT INTO `wos_mod_fun` VALUES ('852', '85', '查看部门', '只允许查看部门不允许管理部门', '0');
INSERT INTO `wos_mod_fun` VALUES ('853', '85', '组织结构管理', '允许修改部门，对部门新增，删除，修改', '0');
INSERT INTO `wos_mod_fun` VALUES ('854', '85', '职位管理', '管理公司职位描述', '0');
INSERT INTO `wos_mod_fun` VALUES ('855', '85', '权限管理', '部署系统的管理权限', '0');
INSERT INTO `wos_mod_fun` VALUES ('856', '85', '员工信息查询', '浏览所有企业内部员工信息', '0');
INSERT INTO `wos_mod_fun` VALUES ('857', '85', '员工信息查询（本部门）', '只允许浏览本部门员工信息', '0');
INSERT INTO `wos_mod_fun` VALUES ('858', '85', '离职业务转移', '对离职员工业务进行清算和转移', '0');
INSERT INTO `wos_mod_fun` VALUES ('992', '99', '功能设置', '设置环境变量', '0');
INSERT INTO `wos_mod_fun` VALUES ('993', '99', '浏览版本及模块列表', '查看系统版本及模块列表', '0');

-- ----------------------------
-- Table structure for `wos_position`
-- ----------------------------
DROP TABLE IF EXISTS `wos_position`;
CREATE TABLE `wos_position` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `pid` int(2) NOT NULL DEFAULT '0',
  `name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of wos_position
-- ----------------------------
INSERT INTO `wos_position` VALUES ('60', '0', '董事长');
INSERT INTO `wos_position` VALUES ('61', '60', '执行董事');
INSERT INTO `wos_position` VALUES ('63', '60', '总经理');
INSERT INTO `wos_position` VALUES ('64', '63', '副总经理');
INSERT INTO `wos_position` VALUES ('65', '63', '总监');
INSERT INTO `wos_position` VALUES ('66', '64', '经理');
INSERT INTO `wos_position` VALUES ('67', '66', '经理助理');
INSERT INTO `wos_position` VALUES ('68', '66', '主任');
INSERT INTO `wos_position` VALUES ('69', '66', '科长');
INSERT INTO `wos_position` VALUES ('70', '69', '科员（前审）');
INSERT INTO `wos_position` VALUES ('71', '68', '职员');
INSERT INTO `wos_position` VALUES ('72', '67', '秘书');
INSERT INTO `wos_position` VALUES ('73', '67', '司机');
INSERT INTO `wos_position` VALUES ('74', '69', '科员（信访）');

-- ----------------------------
-- Table structure for `wos_powers`
-- ----------------------------
DROP TABLE IF EXISTS `wos_powers`;
CREATE TABLE `wos_powers` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `department_id` int(5) NOT NULL,
  `position_id` int(5) NOT NULL,
  `powers` varchar(1000) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of wos_powers
-- ----------------------------
INSERT INTO `wos_powers` VALUES ('4', '31', '63', '803,807,852,856');
INSERT INTO `wos_powers` VALUES ('5', '60', '71', '802,803,804,805,806,807,851,852,853,854,855,856,857,858');
INSERT INTO `wos_powers` VALUES ('6', '60', '68', '801,802,803,804,805,806,807,851,852,853,854,855,856,857,858,992,993');
INSERT INTO `wos_powers` VALUES ('7', '33', '68', '801,802,803,807,851,852,853,854,855,856,857,858');
INSERT INTO `wos_powers` VALUES ('8', '33', '71', '803,851,852,856,857,858');
INSERT INTO `wos_powers` VALUES ('9', '32', '66', '801,802,803,804,805,806,807,851,852,853,854,855,856,857,858');
INSERT INTO `wos_powers` VALUES ('11', '32', '67', '801,802,803,804,805,806,807,851,852,853,854,856,857,858');

-- ----------------------------
-- Table structure for `wos_users`
-- ----------------------------
DROP TABLE IF EXISTS `wos_users`;
CREATE TABLE `wos_users` (
  `id` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `mobile` varchar(11) COLLATE utf8_bin NOT NULL,
  `pwd` varchar(32) COLLATE utf8_bin NOT NULL,
  `group` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of wos_users
-- ----------------------------
