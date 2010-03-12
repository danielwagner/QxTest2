#!/usr/bin/env python

import os
import codecs
import time
import util
import log

try:
    import json
except ImportError, e:
    import simplejson as json

class Builder():
    timeFormat = '%Y-%m-%d_%H-%M-%S'
  
    def __init__(self, config=None, simulate=False):
        self.log = log.Logger()
        self.simulate = simulate
        self.config = config
        try:
            buildStatusFile = os.path.join(self.config["stageDir"], "trunk", "qooxdoo", "buildStatus.json")
            self.buildStatus = self.getBuildStatusFromFile(buildStatusFile)
        except Exception, e:
            self.buildStatus = {}
        
    
    def prepareBuildLog(self, buildLogDir, target):
        try:
            if not os.path.isdir(buildLogDir):
                os.mkdir(buildLogDir)
        except Exception, e:
            self.log.error("Failed to create build log directory %s" %buildLogDir)
            self.log.logError(e)
            return False
          
        buildLog = os.path.join(buildLogDir, target + '_' + util.getTimestamp() + '.log')
        self.log.info("Opening build log file %s" %buildLog)
        try:
            buildLogFile = codecs.open(buildLog, 'a', 'utf-8')
        except Exception, e:
            self.log.error("Error while opening build log file")
            self.logError(e)
          
        return buildLogFile

    
    def buildApp(self, target):
        buildLog = None
        if "buildLogDir" in self.config:
            buildLog = self.prepareBuildLog(self.config["buildLogDir"], target)
            
        cmd = "%s -w %s %s" %(self.config["batbuild"], self.config["stageDir"], self.config["targets"][target])
        
        buildStatusFile = os.path.join(self.config["stageDir"], "trunk", "qooxdoo", "buildStatus.json")
        self.buildStatus = self.getBuildStatusFromFile(buildStatusFile)
        self.buildStatus[target] = {
          "SVNRevision" : util.getSvnVersion(os.path.join(self.config["stageDir"], "trunk")),
          "BuildError"  : False,
          "BuildStarted" : time.strftime(Builder.timeFormat),
          "BuildFinished" : False
        }
        
        if "branch" in self.config:
            self.buildStatus[target]["branch"] = self.config["branch"] 
        
        if (self.simulate):
            if buildLog:
                buildLog.write("Building target %s: %s" %(target, cmd))
                buildLog.close()
            return
          
          
        if (self.config["buildLogLevel"] == "debug" and buildLog):
            # Start build with full logging
            util.invokeLog(cmd, buildLog)
            buildLog.close()
            return
        
        # Start build, only log errors
        self.buildAppWithErrorLogging(target, cmd, buildLog)
        
        self.storeBuildStatus()
        
    def buildAppWithErrorLogging(self, target, cmd, buildLog):
        self.log.info("Building %s: %s" %(target,cmd))
        status, std, err = util.invokePiped(cmd) #@UnusedVariable
        if status > 0:
            if buildLog:
                self.logBuildErrors(buildLog, target, cmd, err)
                buildLog.close()
            
            self.buildStatus[target]["BuildError"] = "Unknown build error"
              
            """Get the last line of batbuild.py's STDERR output which contains
            the actual error message. """
            error = util.getLastLineFromString(err)
            if error:
                self.buildStatus[target]["BuildError"] = error
        else:
            self.log.info("%s build finished without errors." %target)
            self.buildStatus[target]["BuildFinished"] = time.strftime(Builder.timeFormat)
          
    
    def logBuildErrors(self, buildLogFile, target, cmd, err):
        self.log.error("Error while building %s, see build log file for details." %target)
        err = err.rstrip('\n')
        err = err.rstrip('\r')
        buildLogFile.write(target + "\n" + cmd + "\n" + err)
        buildLogFile.write("\n========================================================\n\n")
        
    
    def storeBuildStatus(self, path=None):
        if not path:
            path = os.path.join(self.config["stageDir"], "trunk", "qooxdoo")
      
        jsonData = json.dumps(self.buildStatus, sort_keys=True, indent=2)
        fPath = os.path.join(path,'buildStatus.json')
        if (self.simulate):
            self.log.debug("SIMULATION: Storing build status in file " + fPath)
        else:
            self.log.debug("Storing build status in file " + fPath)
            rFile = codecs.open(fPath, 'w', 'utf-8')
            rFile.write(jsonData)
            rFile.close()
            
    @classmethod
    def getBuildStatusFromFile(cls, path=None):
        buildStatus = {}
        
        if not os.path.isfile(path):
            return buildStatus
        
        try:        
            statusFile = codecs.open(path, 'r', 'utf-8')
            statusJson = statusFile.read()
        except Exception, e:
            log.Logger().warn("Unable to open build status file %s" %path)
        
        try:
            buildStatus = json.loads(statusJson)
            log.Logger().debug("Build status retrieved from file %s" %path)
        except Exception, e:
            log.Logger().warn("Unable to parse build status from file %s" %path)
        
        return buildStatus

        
    def buildAll(self):
        rootPath = os.path.join(self.config["stageDir"], "trunk", "qooxdoo")
        
        if self.config["svnRevert"]:
            util.svnRevert(rootPath)
        
        if self.config["svnUpdate"]:
            util.svnUpdate(rootPath)
            self.log.info("Updated to revision %s" %util.getSvnVersion(rootPath))
        
        self.log.info("Building all configured targets.")
        for target in self.config["targets"]:
            self.buildApp(target)

        