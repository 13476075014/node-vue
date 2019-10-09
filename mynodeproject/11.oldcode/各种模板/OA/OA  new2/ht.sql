/*
Navicat MySQL Data Transfer

Source Server         : mysql32
Source Server Version : 50623
Source Host           : localhost:3306
Source Database       : ht

Target Server Type    : MYSQL
Target Server Version : 50623
File Encoding         : 65001

Date: 2015-11-13 13:55:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for employee_info
-- ----------------------------
DROP TABLE IF EXISTS `employee_info`;
CREATE TABLE `employee_info` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `id_card` varchar(255) NOT NULL,
  `age` int(3) DEFAULT NULL,
  `gender` int(1) DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  `performance` double(10,0) DEFAULT NULL,
  `position_salary` double(10,0) DEFAULT NULL,
  `base_salary` double(10,0) DEFAULT NULL,
  `qq_number` varchar(20) DEFAULT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_del` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of employee_info
-- ----------------------------
INSERT INTO `employee_info` VALUES ('1', '马杨', '45545456566', '24', '0', '2015-11-13 00:00:00', '3', '160', '2100', '2400', '1223333333', '123455564523', '904476713@qq.com', '0');
INSERT INTO `employee_info` VALUES ('2', '马杨1', '5656677676', '32', '0', '2015-11-04 17:57:44', '3', '160', '3223', '2332', '11121111223', '4545545665', '2232334243', '0');
INSERT INTO `employee_info` VALUES ('3', '马杨2', '3445566556', '33', '1', '2015-11-04 00:00:00', '3', '160', '3211', '1212', '2223333344', '65566776', '333333333@qq.com', '0');
INSERT INTO `employee_info` VALUES ('4', '马三', '1111121222', '19', '0', '2015-11-04 00:00:00', '3', '160', '3232', '3232', '22332343443', '56567676767', '323223@qq.com', '0');
INSERT INTO `employee_info` VALUES ('5', '马杨4', '212323443', '22', '0', '2015-11-11 00:00:00', '3', '160', '2400', '3434', '3223435445', '655676767676', '904476713@qq.com', '0');
INSERT INTO `employee_info` VALUES ('6', '马杨wu', '4354565634', '44', '1', '2015-11-04 00:00:00', '3', '160', '2312', '2331', '344343545', '5656454545', '34343@qq.com', '0');
INSERT INTO `employee_info` VALUES ('7', '马杨6', '23343454', '44', '0', '2015-11-05 00:00:00', '3', '160', '3212', '3321', '4345565', '655667767788', '2334555323@qq.com', '0');
INSERT INTO `employee_info` VALUES ('8', '马杨7', '2334545665', '22', '0', '2015-11-05 09:41:46', '3', '160', '3222', '4221', '3443455665', '655676788787', '232332123', '0');
INSERT INTO `employee_info` VALUES ('9', '马杨8', '4354778', '22', '0', '2015-11-05 00:00:00', '3', '100', '2331', '4400', '4343445444', '656576875434', '663344455@qq.com', '0');
INSERT INTO `employee_info` VALUES ('10', '马杨9', '78897674', '35', '0', '2015-11-05 09:43:08', '3', '200', '2000', '3000', '4343556666', '565676778889', '45455665', '0');
INSERT INTO `employee_info` VALUES ('11', '马杨10', '334546576', '24', '0', '2015-11-05 09:43:44', '3', '300', '3000', '3200', '4554546565', '5656778543434', '32423334', '0');
INSERT INTO `employee_info` VALUES ('12', '张三', '4556657678', '21', '1', '2015-11-10 00:00:00', null, '500', '500', '2000', '5456565565', '56567678454556', '123456789@qq.com', '0');
INSERT INTO `employee_info` VALUES ('13', '马四', '4556677887', '22', '0', '2015-11-10 00:00:00', null, '600', '500', '3400', '54545565656', '6567767845455', '987654321@qq.com', '0');
INSERT INTO `employee_info` VALUES ('14', '马四11', '567678887', '22', '0', '2015-11-10 00:00:00', null, '600', '500', '3400', '55556443566', '45566776767643', '987654321@qq.com', '0');
INSERT INTO `employee_info` VALUES ('15', '王二麻', '455678778', '22', '1', '2015-11-11 00:00:00', '6', '500', '500', '3500', '55656436767', '455454544554', '9999999@qq.com', '0');
INSERT INTO `employee_info` VALUES ('16', '张武', '5667788787', '27', '0', '2015-11-08 00:00:00', '8', '500', '500', '5000', '90888888', '455456763434', '90888888@qq.com', '0');
INSERT INTO `employee_info` VALUES ('17', '张倩', '7676788787', '28', '1', '2015-11-05 00:00:00', '7', '500', '500', '2500', '999888777', '5453465767676', '999888777@qq.com', '0');
INSERT INTO `employee_info` VALUES ('18', '陈真', '767676788', '19', '0', '2015-11-11 00:00:00', null, '2332', '2112', '1212', '122334344343', '454556764334', '99999999@qq.com', '0');
INSERT INTO `employee_info` VALUES ('19', '马马', '7887878787', '55', '1', '2015-11-13 00:00:00', null, null, null, '3300', null, '54566576767645', '1234564321@qq.com', '0');
INSERT INTO `employee_info` VALUES ('20', '明明', '8778788787', '23', '1', '2015-11-13 00:00:00', null, '500', '500', '4500', '1212', '5654455454566', '123476543@qq.com', '0');
INSERT INTO `employee_info` VALUES ('21', '高强', '1233243434545', '34', '0', '2015-11-13 00:00:00', null, '1000', '1000', '4000', '2123324', '13635690225', '1256721333@qq.com', '0');

-- ----------------------------
-- Table structure for employee_salary
-- ----------------------------
DROP TABLE IF EXISTS `employee_salary`;
CREATE TABLE `employee_salary` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` bigint(20) NOT NULL,
  `grant_time` datetime NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `insurance_money` double DEFAULT NULL,
  `performance` double DEFAULT NULL,
  `tax_money` double DEFAULT NULL,
  `leave_money` double DEFAULT NULL,
  `total_money` double DEFAULT NULL,
  `money_number` double DEFAULT NULL,
  `other_money` double DEFAULT NULL,
  `create_user_id` bigint(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user_id` bigint(20) DEFAULT NULL,
  `is_del` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of employee_salary
-- ----------------------------
INSERT INTO `employee_salary` VALUES ('1', '1', '2015-01-01 15:08:52', '2015-01-01 15:09:04', '-122', '140', '-138', '0', '4660', '4400', '0', null, null, null, '0');
INSERT INTO `employee_salary` VALUES ('2', '1', '2015-02-01 15:15:11', '2015-02-01 15:15:21', '-122', '140', '-138', '0', '4660', '4400', '0', null, null, null, '0');
INSERT INTO `employee_salary` VALUES ('3', '1', '2015-03-01 15:16:01', '2015-03-01 15:16:08', '-122', '140', '-138', '0', '4660', '4400', '0', null, null, null, '0');
INSERT INTO `employee_salary` VALUES ('4', '1', '2015-04-01 15:16:44', '2015-04-01 15:16:56', '-122', '140', '-138', '0', '4660', '4400', '0', null, null, null, '0');
INSERT INTO `employee_salary` VALUES ('5', '1', '2015-05-01 15:17:31', '2015-05-01 15:17:37', '-122', '140', '-138', '0', '4660', '4400', '0', null, null, null, '0');
INSERT INTO `employee_salary` VALUES ('6', '1', '2015-06-01 15:18:48', '2015-06-01 15:18:55', '-122', '140', '-138', '0', '4660', '4400', '0', null, null, null, '0');
INSERT INTO `employee_salary` VALUES ('7', '1', '2015-07-01 15:19:23', '2015-07-01 15:19:28', '-122', '140', '-138', '0', '4660', '4400', '0', null, null, null, '0');
INSERT INTO `employee_salary` VALUES ('8', '1', '2015-08-01 15:19:57', '2015-08-01 15:20:02', '-122', '140', '-138', '0', '4660', '4400', '0', null, null, null, '0');
INSERT INTO `employee_salary` VALUES ('9', '1', '2015-09-01 15:20:30', '2015-09-01 15:20:35', '-122', '140', '-138', '0', '4660', '4400', '0', null, null, null, '0');
INSERT INTO `employee_salary` VALUES ('10', '1', '2015-10-01 15:21:05', '2015-10-01 15:21:08', '-122', '140', '-138', '0', '4660', '4400', '0', null, null, null, '0');
INSERT INTO `employee_salary` VALUES ('11', '1', '2015-11-05 15:21:44', '2015-11-05 15:21:52', '-122', '140', '-138', '0', '4660', '4400', '0', null, null, null, '0');
INSERT INTO `employee_salary` VALUES ('12', '1', '2015-12-01 15:22:18', '2015-12-01 15:22:23', '-122', '140', '-138', '0', '4660', '4400', '0', null, null, null, '0');

-- ----------------------------
-- Table structure for leave_records
-- ----------------------------
DROP TABLE IF EXISTS `leave_records`;
CREATE TABLE `leave_records` (
  `id` bigint(20) NOT NULL,
  `employee_id` bigint(20) DEFAULT NULL,
  `leave_reason` varchar(50) DEFAULT NULL,
  `start_time` date DEFAULT NULL,
  `end_time` date DEFAULT NULL,
  `all_hour` double DEFAULT NULL,
  `verify_status` int(1) DEFAULT NULL,
  `end_status` int(1) DEFAULT NULL,
  `is_del` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of leave_records
-- ----------------------------
INSERT INTO `leave_records` VALUES ('1', '1', '家里有事', '2015-11-05', '2015-11-05', '1', '0', '0', '0');
INSERT INTO `leave_records` VALUES ('2', '1', '家里有事', '2015-11-05', '2015-11-05', '1', '0', '0', '0');
INSERT INTO `leave_records` VALUES ('3', '1', '生病了', '2015-11-04', '2015-11-05', '8', '0', '0', '0');
INSERT INTO `leave_records` VALUES ('4', '1', '生病了', '2015-11-03', '2015-11-05', '16', '0', '0', '0');
INSERT INTO `leave_records` VALUES ('5', '1', '肚子疼', '2015-10-01', '2015-10-02', '8', '0', '0', '0');
INSERT INTO `leave_records` VALUES ('6', '1', '肚子疼', '2015-10-02', '2015-11-03', '8', '0', '0', '0');
INSERT INTO `leave_records` VALUES ('7', '1', '牙疼', '2015-10-03', '2015-10-04', '8', '0', '0', '0');
INSERT INTO `leave_records` VALUES ('8', '1', '眼睛疼', '2015-11-05', '2015-11-05', '1', '0', '0', '0');
INSERT INTO `leave_records` VALUES ('9', '1', '眼睛疼', '2015-11-05', '2015-11-05', '1', '0', '0', '0');
INSERT INTO `leave_records` VALUES ('10', '1', '胳膊疼', '2015-11-05', '2015-11-05', '1', '0', '0', '0');
INSERT INTO `leave_records` VALUES ('11', '1', '胳膊疼', '2015-11-05', '2015-11-05', '0.5', '0', '0', '0');
INSERT INTO `leave_records` VALUES ('12', '1', '不舒服', '2015-11-05', '2015-11-05', '1.3', '0', '0', '0');
INSERT INTO `leave_records` VALUES ('13', '1', '疼', '2015-11-05', '2015-11-05', '1.1', '0', '0', '1');
INSERT INTO `leave_records` VALUES ('14', '23', '疼啊', '2015-11-05', '2015-11-05', '1.2', '0', '0', '0');

-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice`;
CREATE TABLE `sys_notice` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `notice_content` varchar(700) DEFAULT NULL COMMENT '公告内容',
  `user_id` int(10) unsigned DEFAULT NULL COMMENT '发布者ID',
  `status` int(10) unsigned DEFAULT NULL COMMENT '公告状态，0：未发布，1已发布',
  `create_time` datetime DEFAULT NULL COMMENT '发布时间',
  `is_del` int(10) unsigned DEFAULT NULL COMMENT '0:未删除，1：已删除',
  `title` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 COMMENT='系统公告';

-- ----------------------------
-- Records of sys_notice
-- ----------------------------
INSERT INTO `sys_notice` VALUES ('2', '第一条', '1', '1', '2015-09-08 15:55:41', '1', '二');
INSERT INTO `sys_notice` VALUES ('3', '第二条', '1', '1', '2015-09-09 15:42:52', '0', '三');
INSERT INTO `sys_notice` VALUES ('4', '第三条', '1', '1', '2015-09-10 09:49:30', '0', '四');
INSERT INTO `sys_notice` VALUES ('5', '第四条', '1', '1', '2015-09-10 09:49:46', '0', '五');
INSERT INTO `sys_notice` VALUES ('6', '第五条', '1', '1', '2015-09-10 09:50:01', '0', '六');
INSERT INTO `sys_notice` VALUES ('7', '第六条', '1', '1', '2015-09-10 09:50:16', '0', '七');
INSERT INTO `sys_notice` VALUES ('8', '第七条', '1', '1', '2015-09-10 09:50:30', '0', '八');
INSERT INTO `sys_notice` VALUES ('9', '第八条', '1', '1', '2015-09-10 09:50:44', '0', '九');
INSERT INTO `sys_notice` VALUES ('10', '第九条', '1', '1', '2015-09-10 09:50:57', '0', '十');
INSERT INTO `sys_notice` VALUES ('11', '第十条', '1', '1', '2015-09-10 09:51:10', '0', '十一');
INSERT INTO `sys_notice` VALUES ('12', '第十一条', '1', '1', '2015-09-10 09:51:25', '0', '十二');
INSERT INTO `sys_notice` VALUES ('13', '第十二条', '1', '1', '2015-09-10 09:51:40', '0', '十三');
INSERT INTO `sys_notice` VALUES ('14', '第十三条', '1', '1', '2015-09-10 09:51:54', '0', '十四');
INSERT INTO `sys_notice` VALUES ('15', '第十四条', '1', '1', '2015-09-10 09:52:09', '0', '十五');
INSERT INTO `sys_notice` VALUES ('16', '第十五条', '1', '1', '2015-09-10 09:52:21', '0', '十六');
INSERT INTO `sys_notice` VALUES ('17', '第十六条', '2', '1', '2015-09-10 10:57:54', '0', '十七');
INSERT INTO `sys_notice` VALUES ('18', '啊啊啊啊', '2', '1', '2015-09-10 10:58:11', '0', '十八');
INSERT INTO `sys_notice` VALUES ('19', '去去去去', '2', '1', '2015-09-10 10:58:29', '0', '十九');
INSERT INTO `sys_notice` VALUES ('20', '我我我我', '2', '1', '2015-09-10 10:58:43', '0', '二十');
INSERT INTO `sys_notice` VALUES ('21', '自作主张', '2', '1', '2015-09-10 10:59:05', '0', '二十一');
INSERT INTO `sys_notice` VALUES ('22', '三三四四', '2', '1', '2015-09-10 10:59:23', '0', '二十二');
INSERT INTO `sys_notice` VALUES ('23', '鹅鹅鹅鹅', '2', '1', '2015-09-10 10:59:36', '0', '二十三');
INSERT INTO `sys_notice` VALUES ('24', '柔柔弱弱', '2', '1', '2015-09-10 10:59:47', '0', '二十四');
INSERT INTO `sys_notice` VALUES ('25', '忐忐忑忑', '2', '1', '2015-09-10 11:00:00', '0', '二十五');
INSERT INTO `sys_notice` VALUES ('26', '轻轻巧巧', '2', '1', '2015-09-10 11:00:19', '0', '二十六');
INSERT INTO `sys_notice` VALUES ('27', '以药养医', '2', '1', '2015-09-10 11:00:34', '0', '二十七');
INSERT INTO `sys_notice` VALUES ('28', '坎坎坷坷', '2', '1', '2015-09-10 11:00:50', '0', '二十八');
INSERT INTO `sys_notice` VALUES ('29', '吞吞吐吐', '2', '1', '2015-09-10 11:01:03', '0', '二十九');
INSERT INTO `sys_notice` VALUES ('30', '反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复', '2', '1', '2015-09-10 11:01:17', '0', '三十');
INSERT INTO `sys_notice` VALUES ('31', '巴巴爸爸', '2', '1', '2015-09-10 11:01:29', '0', '三十一');
INSERT INTO `sys_notice` VALUES ('32', '爱爱爱爱', '2', '1', '2015-09-11 16:17:10', '0', '三十二');
INSERT INTO `sys_notice` VALUES ('33', '吞吞吐吐啊啊', '2', '1', '2015-09-11 16:17:27', '0', '三十三');
INSERT INTO `sys_notice` VALUES ('34', '答复答复他如何', '2', '1', '2015-09-11 16:17:38', '0', '三十四');
INSERT INTO `sys_notice` VALUES ('35', '丹甫股份', '2', '1', '2015-09-11 16:17:48', '0', '洒满十');
INSERT INTO `sys_notice` VALUES ('36', '孤鸿寡鹄', '2', '1', '2015-09-11 16:17:59', '0', '三十六');
INSERT INTO `sys_notice` VALUES ('37', '是的是的是的', '2', '1', '2015-09-11 16:18:09', '0', '三十七');
INSERT INTO `sys_notice` VALUES ('38', '风格更好', '2', '1', '2015-09-11 16:18:20', '0', '阿萨斯');
INSERT INTO `sys_notice` VALUES ('39', '场vvcb', '2', '1', '2015-09-11 16:18:34', '0', '完全王企鹅');
INSERT INTO `sys_notice` VALUES ('40', '场vcvcvwsd', '2', '1', '2015-09-11 16:18:47', '0', '飒飒');
INSERT INTO `sys_notice` VALUES ('41', '规范实施', '2', '1', '2015-09-11 16:18:59', '0', '地方');
INSERT INTO `sys_notice` VALUES ('42', '答复答复答复', '2', '1', '2015-09-11 16:19:08', '0', '当然');
INSERT INTO `sys_notice` VALUES ('43', 'see沃尔沃', '2', '1', '2015-09-11 16:19:19', '0', '热热');
INSERT INTO `sys_notice` VALUES ('44', '的所发生的', '2', '1', '2015-09-11 16:19:31', '0', '3额额');
INSERT INTO `sys_notice` VALUES ('45', '不好啊', '1', '1', '2015-10-12 15:03:23', '0', '我我我');
INSERT INTO `sys_notice` VALUES ('46', '阿萨飒飒去问问', '1', '1', '2015-10-20 15:46:19', '0', '你你你');
INSERT INTO `sys_notice` VALUES ('47', '水电费功夫功夫给对方', '1', '1', '2015-10-20 15:47:45', '0', '他他他');
INSERT INTO `sys_notice` VALUES ('48', '电风扇覆盖广泛地方上到山顶', '1', '1', '2015-10-20 16:23:23', '0', '为什么为什么');
INSERT INTO `sys_notice` VALUES ('49', '怎么了啊', '1', '1', '2015-10-21 09:54:39', '0', '怎么了啊');
INSERT INTO `sys_notice` VALUES ('50', '哎哎哎', '1', '1', '2015-10-21 09:57:00', '0', '哎哎哎');
INSERT INTO `sys_notice` VALUES ('51', '有意义', '1', '1', '2015-10-21 10:04:40', '0', '有意义');
INSERT INTO `sys_notice` VALUES ('52', '<p>三十而立</p>', '2', '1', '2015-10-21 10:14:41', '0', '三十而立');
INSERT INTO `sys_notice` VALUES ('53', '<img alt=\"emot.default.smile\" src=\"/OA/plugins/xheditor/xheditor_emot/default/smile.gif\" /><img alt=\"emot.default.smile\" src=\"/OA/plugins/xheditor/xheditor_emot/default/smile.gif\" /><img alt=\"emot.default.tongue\" src=\"/OA/plugins/xheditor/xheditor_emot/default/tongue.gif\" /><img alt=\"emot.default.titter\" src=\"/OA/plugins/xheditor/xheditor_emot/default/titter.gif\" /><img alt=\"emot.default.laugh\" src=\"/OA/plugins/xheditor/xheditor_emot/default/laugh.gif\" />！！！！', '1', '1', '2015-11-03 09:50:19', '0', '关于元旦放假通知');
INSERT INTO `sys_notice` VALUES ('57', '<img alt=\"emot.default.titter\" src=\"/OA/plugins/xheditor/xheditor_emot/default/titter.gif\" /><img alt=\"emot.default.titter\" src=\"/OA/plugins/xheditor/xheditor_emot/default/titter.gif\" />阿萨斯大神大多是', '1', '1', '2015-11-03 10:41:44', '0', '关于迟到早退现象');
INSERT INTO `sys_notice` VALUES ('58', '饿饿色额为访问人人啊', '3', '1', '2015-11-06 12:11:40', '0', '贩夫贩妇');
INSERT INTO `sys_notice` VALUES ('59', '非常好', '3', '1', '2015-11-06 14:55:28', '0', '非诚勿扰');

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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COMMENT='公告用户查阅状态';

-- ----------------------------
-- Records of sys_notice_status
-- ----------------------------
INSERT INTO `sys_notice_status` VALUES ('3', '3', '31', '2015-09-10 11:04:39');
INSERT INTO `sys_notice_status` VALUES ('4', '3', '30', '2015-09-10 17:42:05');
INSERT INTO `sys_notice_status` VALUES ('5', '3', '29', '2015-09-10 17:42:30');
INSERT INTO `sys_notice_status` VALUES ('6', '1', '31', '2015-09-10 17:45:55');
INSERT INTO `sys_notice_status` VALUES ('7', '1', '30', '2015-09-11 14:37:20');
INSERT INTO `sys_notice_status` VALUES ('8', '1', '29', '2015-09-11 14:38:07');
INSERT INTO `sys_notice_status` VALUES ('9', '1', '28', '2015-09-11 14:39:50');
INSERT INTO `sys_notice_status` VALUES ('10', '1', '27', '2015-09-11 14:40:58');
INSERT INTO `sys_notice_status` VALUES ('11', '1', '26', '2015-09-11 14:43:20');
INSERT INTO `sys_notice_status` VALUES ('12', '1', '25', '2015-09-11 14:45:27');
INSERT INTO `sys_notice_status` VALUES ('13', '1', '24', '2015-09-11 14:50:24');
INSERT INTO `sys_notice_status` VALUES ('14', '1', '23', '2015-09-11 14:51:29');
INSERT INTO `sys_notice_status` VALUES ('15', '1', '22', '2015-09-11 14:54:39');
INSERT INTO `sys_notice_status` VALUES ('16', '1', '21', '2015-09-11 14:55:38');
INSERT INTO `sys_notice_status` VALUES ('17', '1', '20', '2015-09-11 15:32:08');
INSERT INTO `sys_notice_status` VALUES ('18', '1', '19', '2015-09-11 15:55:36');
INSERT INTO `sys_notice_status` VALUES ('19', '1', '18', '2015-09-11 16:00:58');
INSERT INTO `sys_notice_status` VALUES ('20', '1', '44', '2015-09-11 16:23:34');
INSERT INTO `sys_notice_status` VALUES ('21', '1', '43', '2015-09-11 16:29:18');
INSERT INTO `sys_notice_status` VALUES ('22', '1', '42', '2015-09-11 16:29:50');
INSERT INTO `sys_notice_status` VALUES ('23', '1', '41', '2015-09-11 16:34:50');
INSERT INTO `sys_notice_status` VALUES ('24', '1', '40', '2015-09-11 16:36:40');
INSERT INTO `sys_notice_status` VALUES ('25', '1', '39', '2015-09-11 16:40:22');
INSERT INTO `sys_notice_status` VALUES ('26', '1', '16', '2015-09-14 09:15:13');
INSERT INTO `sys_notice_status` VALUES ('27', '1', '4', '2015-09-16 09:56:48');
INSERT INTO `sys_notice_status` VALUES ('28', '1', '45', '2015-10-14 13:54:01');
INSERT INTO `sys_notice_status` VALUES ('29', '1', '36', '2015-10-20 14:13:44');
INSERT INTO `sys_notice_status` VALUES ('30', '1', '2', '2015-10-20 14:13:50');
INSERT INTO `sys_notice_status` VALUES ('31', '1', '17', '2015-10-20 14:34:26');
INSERT INTO `sys_notice_status` VALUES ('32', '1', '38', '2015-10-20 14:34:34');
INSERT INTO `sys_notice_status` VALUES ('33', '1', '37', '2015-10-20 14:34:51');
INSERT INTO `sys_notice_status` VALUES ('34', '1', '33', '2015-10-20 14:36:06');
INSERT INTO `sys_notice_status` VALUES ('35', '2', '48', '2015-10-20 17:09:46');
INSERT INTO `sys_notice_status` VALUES ('36', '2', '49', '2015-10-21 09:55:58');
INSERT INTO `sys_notice_status` VALUES ('37', '2', '50', '2015-10-21 09:57:15');
INSERT INTO `sys_notice_status` VALUES ('38', '1', '50', '2015-10-21 09:58:05');
INSERT INTO `sys_notice_status` VALUES ('39', '2', '51', '2015-10-21 10:06:45');
INSERT INTO `sys_notice_status` VALUES ('40', '1', '51', '2015-10-21 10:40:48');
INSERT INTO `sys_notice_status` VALUES ('41', '1', '52', '2015-11-03 09:38:19');
INSERT INTO `sys_notice_status` VALUES ('42', '1', '53', '2015-11-03 09:51:12');
INSERT INTO `sys_notice_status` VALUES ('43', '2', '57', '2015-11-03 10:44:59');
INSERT INTO `sys_notice_status` VALUES ('44', '2', '3', '2015-11-03 10:45:34');
INSERT INTO `sys_notice_status` VALUES ('45', '3', '57', '2015-11-03 10:55:48');
INSERT INTO `sys_notice_status` VALUES ('46', '3', '50', '2015-11-06 12:16:17');
INSERT INTO `sys_notice_status` VALUES ('47', '3', '59', '2015-11-06 14:55:51');

-- ----------------------------
-- Table structure for sys_prev_deparment
-- ----------------------------
DROP TABLE IF EXISTS `sys_prev_deparment`;
CREATE TABLE `sys_prev_deparment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '权限部门编号',
  `dp_name` varchar(45) DEFAULT NULL COMMENT '部门名称',
  `is_del` int(10) unsigned DEFAULT NULL COMMENT '是否删除 0：未删除 1：已删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='权限部门表';

-- ----------------------------
-- Records of sys_prev_deparment
-- ----------------------------
INSERT INTO `sys_prev_deparment` VALUES ('1', '研发部', '0');
INSERT INTO `sys_prev_deparment` VALUES ('2', '人事部', '0');

-- ----------------------------
-- Table structure for sys_prev_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_prev_role`;
CREATE TABLE `sys_prev_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `prev_id` int(11) DEFAULT NULL COMMENT '权限ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=486 DEFAULT CHARSET=utf8 COMMENT='角色权限关系表';

-- ----------------------------
-- Records of sys_prev_role
-- ----------------------------
INSERT INTO `sys_prev_role` VALUES ('188', '4', '18');
INSERT INTO `sys_prev_role` VALUES ('189', '5', '18');
INSERT INTO `sys_prev_role` VALUES ('190', '5', '1');
INSERT INTO `sys_prev_role` VALUES ('457', '3', '1');
INSERT INTO `sys_prev_role` VALUES ('458', '3', '7');
INSERT INTO `sys_prev_role` VALUES ('459', '3', '11');
INSERT INTO `sys_prev_role` VALUES ('460', '3', '12');
INSERT INTO `sys_prev_role` VALUES ('461', '3', '9');
INSERT INTO `sys_prev_role` VALUES ('462', '3', '10');
INSERT INTO `sys_prev_role` VALUES ('463', '3', '8');
INSERT INTO `sys_prev_role` VALUES ('464', '3', '13');
INSERT INTO `sys_prev_role` VALUES ('465', '3', '14');
INSERT INTO `sys_prev_role` VALUES ('466', '3', '16');
INSERT INTO `sys_prev_role` VALUES ('467', '3', '15');
INSERT INTO `sys_prev_role` VALUES ('468', '3', '17');
INSERT INTO `sys_prev_role` VALUES ('469', '3', '2');
INSERT INTO `sys_prev_role` VALUES ('470', '3', '5');
INSERT INTO `sys_prev_role` VALUES ('471', '3', '6');
INSERT INTO `sys_prev_role` VALUES ('472', '3', '4');
INSERT INTO `sys_prev_role` VALUES ('473', '3', '3');
INSERT INTO `sys_prev_role` VALUES ('474', '3', '18');
INSERT INTO `sys_prev_role` VALUES ('475', '3', '19');
INSERT INTO `sys_prev_role` VALUES ('476', '3', '23');
INSERT INTO `sys_prev_role` VALUES ('477', '3', '22');
INSERT INTO `sys_prev_role` VALUES ('478', '3', '21');
INSERT INTO `sys_prev_role` VALUES ('479', '3', '20');
INSERT INTO `sys_prev_role` VALUES ('480', '3', '24');
INSERT INTO `sys_prev_role` VALUES ('481', '3', '26');
INSERT INTO `sys_prev_role` VALUES ('482', '3', '28');
INSERT INTO `sys_prev_role` VALUES ('483', '3', '29');
INSERT INTO `sys_prev_role` VALUES ('484', '3', '27');
INSERT INTO `sys_prev_role` VALUES ('485', '3', '25');

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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COMMENT='系统权限表';

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
INSERT INTO `sys_privilege` VALUES ('18', 'SysManager', 'all', '0', '系统管理中心');
INSERT INTO `sys_privilege` VALUES ('19', 'noticeManager', 'all', '18', '系统公告管理');
INSERT INTO `sys_privilege` VALUES ('20', 'noticeManager', 'add', '19', '公告添加');
INSERT INTO `sys_privilege` VALUES ('21', 'noticeManager', 'publish', '19', '公告发布');
INSERT INTO `sys_privilege` VALUES ('22', 'noticeManager', 'update', '19', '公告修改');
INSERT INTO `sys_privilege` VALUES ('23', 'noticeManager', 'delete', '19', '公告删除');
INSERT INTO `sys_privilege` VALUES ('24', 'HrManager', 'all', '0', '人事管理中心');
INSERT INTO `sys_privilege` VALUES ('25', 'statistics', 'all', '24', '图表统计');
INSERT INTO `sys_privilege` VALUES ('26', 'employeeInfoList', 'all', '24', '员工信息管理');
INSERT INTO `sys_privilege` VALUES ('27', 'HrManager', 'add', '26', '添加员工信息');
INSERT INTO `sys_privilege` VALUES ('28', 'HrManager', 'update', '26', '修改员工信息');
INSERT INTO `sys_privilege` VALUES ('29', 'HrManager', 'delete', '26', '删除员工信息');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('3', '管理员', '0', '1', '管理员');
INSERT INTO `sys_role` VALUES ('4', '普通员工', '1', '1', '部门普通职员');
INSERT INTO `sys_role` VALUES ('5', '游客', '1', '1', '进来看看的');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'admin', 'ICy5YqxZB1uWSwcVLSNLcA==', '0', null, '0', null, null, '2015-11-12 12:28:40', '小黑', '0');
INSERT INTO `sys_user` VALUES ('2', 'my', 'ICy5YqxZB1uWSwcVLSNLcA==', '1', '1', '0', null, '2015-11-02 21:04:29', '2015-11-03 10:49:19', '枫', '0');
INSERT INTO `sys_user` VALUES ('3', 'myy', 'ICy5YqxZB1uWSwcVLSNLcA==', '1', '1', '0', '2015-09-10 17:41:28', '2015-09-10 17:41:31', '2015-11-13 13:54:29', '小枫', '0');
INSERT INTO `sys_user` VALUES ('4', '123456789@qq.com', 'ICy5YqxZB1uWSwcVLSNLcA==', '1', '1', '1', '2015-11-06 15:18:43', null, null, 'zw', '0');
INSERT INTO `sys_user` VALUES ('5', '9998887777@qq.com', 'ICy5YqxZB1uWSwcVLSNLcA==', '1', '1', '0', '2015-11-12 11:48:18', '2015-11-12 11:51:38', null, '张倩', '0');
INSERT INTO `sys_user` VALUES ('6', '9999999@qq.com', 'ICy5YqxZB1uWSwcVLSNLcA==', '1', '1', '1', '2015-11-12 11:53:14', null, null, '王二麻', '0');
INSERT INTO `sys_user` VALUES ('7', '999888777@qq.com', 'ICy5YqxZB1uWSwcVLSNLcA==', '1', '1', '0', '2015-11-12 12:07:23', '2015-11-12 12:28:46', '2015-11-12 12:29:03', '张倩', '0');
INSERT INTO `sys_user` VALUES ('8', 'zhangwu', 'aY1RoZ2KEhzlgUmde3AWaA==', '1', '1', '0', '2015-11-12 12:32:37', '2015-11-12 12:40:08', '2015-11-12 12:40:31', '张武', '0');

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='用户角色关系表';

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('3', '3', '2');
INSERT INTO `sys_user_role` VALUES ('4', '3', '3');
INSERT INTO `sys_user_role` VALUES ('5', '3', '4');
INSERT INTO `sys_user_role` VALUES ('6', '3', '5');
INSERT INTO `sys_user_role` VALUES ('7', '3', '7');
INSERT INTO `sys_user_role` VALUES ('8', '3', '8');
