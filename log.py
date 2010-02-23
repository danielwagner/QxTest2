#!/usr/bin/env python

import util
import os
import codecs

class Logger:
    class __impl:
        def __init__(self, config):
            self.configuration = config
            self.__logFile = self.createLogFile()
          
        def getId(self):
            return id(self)
          
        def createLogFile(self):
            if "logDirectory" in self.configuration:
                logDirectory = self.configuration["logDirectory"]
            else:             
                logDirectory = os.getcwd()
                
            if "logFileName" in self.configuration:
                logFileName = self.configuration["logFileName"]
            else:             
                logFileName = "%s.log" %util.getTimestamp()
            
            try:
                if not os.path.isdir(logDirectory):
                    os.mkdir(logDirectory)
                fullpath = os.path.join(logDirectory, logFileName)
                logFile = codecs.open(fullpath, 'a', 'utf-8')
                return logFile 
            except Exception, e:
                errMsg = ""
                if (e.args):
                    errMsg = repr(e.args)
                raise RuntimeError, "Unable to open log file: %s" %errMsg 
        
        def log(self, msg, level="[INFO]"):
            out = "%s %s %s\n" %(util.getTimestamp(),level,msg)
            print out
            self.__logFile.write(out)
            
        def info(self, msg):
            self.log(msg, "[INFO]")
        
        def debug(self, msg):
            self.log(msg, "[DEBUG]")
        
        def warn(self, msg):
            self.log(msg, "[WARN]")
        
        def error(self, msg):
            self.log(msg, "[ERROR]")
        
        def logError(self, e):
            if type(e).__name__ == "str":
                self.error(e)
        
            if e.__class__:      
                msg = e.__class__.__name__
                if (e.args):
                    msg += " %s" %repr(e.args)        
                self.error(msg)

    __inst = None

    def __init__(self, config={}):
        # Check whether we already have an instance
        if Logger.__inst is None:
            Logger.__inst = Logger.__impl(config)

        # Store instance reference in the handle
        self.__dict__['_Logger__inst'] = Logger.__inst

    # Delegate attribute getters/setters to instance
    def __getattr__(self, attr):
        return getattr(self.__inst, attr)

    def __setattr__(self, attr, value):
        return setattr(self.__inst, attr, value)
