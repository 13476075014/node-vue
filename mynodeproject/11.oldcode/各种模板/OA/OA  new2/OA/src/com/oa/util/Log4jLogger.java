/**   
* Copyright: Copyright (c) 2015 xlz
* 
* @ClassName: Log4jLogger.java
* @Description: 日志打印工具类
*
* @version: v1.0.0
* @author: xuyiping
* @date: 2015-4-20 上午9:37:24 
*
* Modification History:
* Date         Author          Version            Description
*---------------------------------------------------------*
* 2014-1-13     xuyiping           v1.0.0               修改原因
*/
package com.oa.util;

import java.text.MessageFormat;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.spi.LoggingEvent;
public class Log4jLogger {  
  
    private final Logger logger;  
    private static final String FQCN;  
  
    static {  
        FQCN = Log4jLogger.class.getName();  
    }  
      
    private Log4jLogger(Class<?> clazz){  
        logger = Logger.getLogger(clazz);  
    }  
      
    private Log4jLogger(){  
        logger = Logger.getRootLogger();  
    }  
      
    public static Log4jLogger getLogger(Class<?> clazz){  
        return new Log4jLogger(clazz);  
    }  
      
    public static Log4jLogger getRootLogger(){  
        return new Log4jLogger();  
    }  
      
    public void trace(Object message){  
        if(logger.isTraceEnabled()){  
            forcedLog(logger, Level.TRACE, message);  
        }  
    }  
      
    public void trace(Object message, Throwable t) {  
        if (logger.isTraceEnabled()) {  
            forcedLog(logger, Level.TRACE, message, t);  
        }  
    }  
  
    public void trace(String pattern, Object... arguments) {  
        if (logger.isTraceEnabled()) {  
            forcedLog(logger, Level.TRACE, format(pattern, arguments));  
        }  
    }  
    public void trace(String pattern, Throwable t, Object... arguments) {  
        if (logger.isTraceEnabled()) {  
            forcedLog(logger, Level.TRACE, format(pattern, arguments), t);  
        }  
    }  
      
    public void debug(Object message) {  
        if (logger.isDebugEnabled()) {  
            forcedLog(logger, Level.DEBUG, message);  
        }  
    }  
  
    public void debug(Object message, Throwable t) {  
        if (logger.isDebugEnabled()) {  
            forcedLog(logger, Level.DEBUG, message, t);  
        }  
    }  
  
    public void debug(String pattern, Object... arguments) {  
        if (logger.isDebugEnabled()) {  
            forcedLog(logger, Level.DEBUG, format(pattern, arguments));  
        }  
    }  
    public void debug(String pattern, Throwable t, Object... arguments) {  
        if (logger.isDebugEnabled()) {  
            forcedLog(logger, Level.DEBUG, format(pattern, arguments), t);  
        }  
    }  
    
    public void info(Object message) {  
        if (logger.isInfoEnabled()) {  
            forcedLog(logger, Level.INFO, message);  
        }  
    }  
  
    public void info(Object message, Throwable t) {  
        if (logger.isInfoEnabled()) {  
            forcedLog(logger, Level.INFO, message, t);  
        }  
    }  
  
    public void info(String pattern, Object... arguments) {  
        if (logger.isInfoEnabled()) {  
            forcedLog(logger, Level.INFO, format(pattern, arguments));  
        }  
    }  
    public void info(String pattern, Throwable t, Object... arguments) {  
        if (logger.isInfoEnabled()) {  
            forcedLog(logger, Level.INFO, format(pattern, arguments), t);  
        }  
    }  
      
    public void warn(Object message) {  
        if (logger.isEnabledFor(Level.WARN)) {  
            forcedLog(logger, Level.WARN, message);  
        }  
    }  
  
    public void warn(Object message, Throwable t) {  
        if (logger.isEnabledFor(Level.WARN)) {  
            forcedLog(logger, Level.WARN, message, t);  
        }  
    }  
  
    public void warn(String pattern, Object... arguments) {  
        if (logger.isEnabledFor(Level.WARN)) {  
            forcedLog(logger, Level.WARN, format(pattern, arguments));  
        }  
    }  
    public void warn(String pattern, Throwable t, Object... arguments) {  
        if (logger.isEnabledFor(Level.WARN)) {  
            forcedLog(logger, Level.WARN, format(pattern, arguments), t);  
        }  
    }  
      
    public void error(Object message) {  
        if (logger.isEnabledFor(Level.ERROR)) {  
            forcedLog(logger, Level.ERROR, message);  
        }  
    }  
  
    public void error(Object message, Throwable t) {  
        if (logger.isEnabledFor(Level.ERROR)) {  
            forcedLog(logger, Level.ERROR, message, t);  
        }  
    }  
  
    public void error(String pattern, Object... arguments) {  
        if (logger.isEnabledFor(Level.ERROR)) {  
            forcedLog(logger, Level.ERROR, format(pattern, arguments));  
        }  
    }  
    public void error(String pattern, Throwable t, Object... arguments) {  
        if (logger.isEnabledFor(Level.ERROR)) {  
            forcedLog(logger, Level.ERROR, format(pattern, arguments), t);  
        }  
    }  
      
    public void fatal(Object message) {  
        if (logger.isEnabledFor(Level.FATAL)) {  
            forcedLog(logger, Level.FATAL, message);  
        }  
    }  
  
    public void fatal(Object message, Throwable t) {  
        if (logger.isEnabledFor(Level.FATAL)) {  
            forcedLog(logger, Level.FATAL, message, t);  
        }  
    }  
  
    public void fatal(String pattern, Object... arguments) {  
        if (logger.isEnabledFor(Level.FATAL)) {  
            forcedLog(logger, Level.FATAL, format(pattern, arguments));  
        }  
    }  
    public void fatal(String pattern, Throwable t, Object... arguments) {  
        if (logger.isEnabledFor(Level.FATAL)) {  
            forcedLog(logger, Level.FATAL, format(pattern, arguments), t);  
        }  
    }  
      
    public void assertLog(boolean assertion, String message) {  
        if (!assertion) {  
            forcedLog(logger, Level.ERROR, message);  
        }  
    }  
      
    private static void forcedLog(Logger logger, Level level, Object message) {  
        logger.callAppenders(new LoggingEvent(FQCN, logger, level, message, null));  
    }  
  
    private static void forcedLog(Logger logger, Level level, Object message, Throwable t) {  
        logger.callAppenders(new LoggingEvent(FQCN, logger, level, message, t));  
    }  
  
    private static String format(String pattern, Object... arguments) {  
        return MessageFormat.format(pattern, arguments);  
    }  
      
}  