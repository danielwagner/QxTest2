#!/usr/bin/env python

import os
import log

try:
    import json
except ImportError, e:
    try:
        import simplejson as json
    except ImportError, e:
        raise RuntimeError, "No JSON module available"

##
# Attempts to determine the name of the operating system by using os.uname(),
# falling back to platform.system()
def getOperatingSystemName():
    msg = "Couldn't determine operating system!"
  
    try:   
        return os.uname()[0]      
    except AttributeError:
        try:
            import platform
            return platform.system()
        except Exception, e:
            log.Logger().error("Unable to determine OS name:")
            log.Logger().logError(e)
    except Exception, e:      
        log.Logger().error("Unable to determine OS name:")
        log.Logger().logError(e)
        return msg
      

##
# Invokes a shell command, waits for it to finish, then returns its STDOUT and 
# STDERR output.
#
# @param cmd {str} The command to be executed
# @return {tuple} The command's return code, STDOUT output and STDERR output
def invokePiped(cmd):
  import subprocess
  p = subprocess.Popen(cmd, shell=True,
                       stdout=subprocess.PIPE,
                       stderr=subprocess.PIPE,
                       universal_newlines=True)
  output, errout = p.communicate()
  rcode = p.returncode

  return (rcode, output, errout)


##
# Invokes a shell command and waits for it to finish.
#
# @param cmd {str} The command to be executed
# @return {int} The exit code of the process
def invokeExternal(cmd):
    import subprocess
    import sys
    p = subprocess.Popen(cmd, shell=True,
                         stdout=sys.stdout,
                         stderr=sys.stderr)
    return p.wait()


##
# Invokes a shell command and gets its STDOUT/STDERR output while the process is 
# running. Optionally writes the output to either a file-like object or a logger
# object that has an "info" function.
#
# @param cmd {str} The command to be executed
# @param log {obj} Log file object or logger
# @param quiet {bool} Print the process' output
def invokeLog(cmd, log=None, quiet=False):
    import subprocess
    p = subprocess.Popen(cmd, shell=True,
                           stdout=subprocess.PIPE,
                           stderr=subprocess.STDOUT,
                           universal_newlines=True)
  
    while True:
        line = p.stdout.readline()
        if (not line): 
            break
        
        if not quiet:
            print(line.rstrip("\n"))
        
        if log:
            if type(log).__name__ == "file":
                log.write(line)
            elif hasattr(log, "info"):
                log.info(line.rstrip("\n"))


##
# Sends a multipart text/html e-mail
#
# @param configuration {dict} Mail settings 
def sendMultipartMail(configuration):
  import smtplib
  from email.MIMEMultipart import MIMEMultipart
  from email.MIMEText import MIMEText
  msg = MIMEMultipart()
  msg['Subject'] = configuration['subject']
  msg['From'] = configuration['mailFrom']
  msg['To'] = configuration['mailTo']
  msg.preamble = 'Test Results'

  msgText = MIMEText(configuration['html'], 'html')
  msg.attach(msgText)
  
  log.Logger().debug("Sending e-mail. Subject: " + configuration['subject'] + " Recipient: " 
        + configuration['mailTo'])
  
  mailServer = smtplib.SMTP(configuration['smtpHost'], configuration['smtpPort'])  
  mailServer.ehlo()
  mailServer.starttls()
  mailServer.ehlo()
  mailServer.sendmail(configuration['mailFrom'], configuration['mailTo'], msg.as_string())
  mailServer.close()
  

def getTimestamp():
  import time
  return time.strftime('%Y-%m-%d_%H-%M-%S')


def mergeDict(oldDict, newDict):
  for key, value in newDict.iteritems():
      if not key in oldDict:
          oldDict[key] = value    
      else:
          # key exists, need to recurse
          if type(value).__name__ == "dict":
              mergeDict(oldDict[key], value)
          else:
              oldDict[key] = value


##
# Download a file and save it in a local directory.
#
# @param url {str} URL of the file to be downloaded
# @param dir {str} Directory to save the file in. Will be created if it 
# doesn't exist.
def download(url, dir):
    import urllib
    try:
        webFile = urllib.urlopen(url)
    except IOError, e:
        log.Logger().error("util.download: Failed to download file %s" %url)
        log.Logger().logError(e)
        return
    
    try:
        if not os.path.isdir(dir):
            os.mkdir(dir)
    except Exception, e:
        log.Logger().error("util.download: Failed to create directory %s" %dir)
        log.Logger().logError(e)
        return
    
    filename = url.split('/')[-1]
    localDir = os.path.join(dir, filename)
    
    try:
        localFile = open(localDir, 'w')
        localFile.write(webFile.read())
        webFile.close()
        localFile.close()
    except Exception, e:
        log.Logger().error("util.download: Failed to save file in %s" %localDir)
        log.Logger().logError(e)
        return
    
    log.Logger().debug("Downloaded file %s to dir %s" %(url,dir))
    return localDir


  ##
  # Extract a ZIP-compressed archive into a given directory.   
  #
  # @param file {str} Path to the ZIP archive or alternatively a file-like object.
  # @param dir {str} Directory to unpack the file into. Will be created if it 
  # doesn't exist.
def unzipToDir(file, dir):
    import zipfile
    try:
        if not os.path.isdir(dir):
            os.mkdir(dir)
    except Exception, e:
      log.Logger().error("util.unzipToDir: Failed to create directory")  
      log.Logger().logError(e)
      
    zfobj = zipfile.ZipFile(file)
    
    # The first entry in the zip file's name list is the top qooxdoo directory
    topDirName = zfobj.namelist()[0]
    topDir = os.path.join(dir, topDirName)
    
    # If the top directory already exists, recursively delete it  
    if os.path.isdir(topDir):
        log.Logger().info("util.unzipToDir: Deleting directory %s" %topDir)
        for root, dirs, files in os.walk(topDir, topdown=False):
            for name in files:
                os.remove(os.path.join(root, name))
            for name in dirs:
                os.rmdir(os.path.join(root, name))

    # Write the zip file's contents    
    for name in zfobj.namelist():
        if name.endswith('/'):
            os.mkdir(os.path.join(dir, name))
        else:
            outfile = open(os.path.join(dir, name), 'wb')
            outfile.write(zfobj.read(name))
            outfile.close()
    
    log.Logger().debug("Unzipped file %s to dir %s" %(repr(file),dir))
    return topDir

  
  ##
  # Adds options from a dictionary to a specified Generator config file. Options
  # must be specified in a dictionary using the same structure as a Generator
  # config file.  
  #
  # @param configFilePath {str} Path of the config file to be edited
  # @param newConfig {dict} Generator config options to be added
def editConfigJson(configFilePath=None, newConfig=None):
    import demjson, codecs
    
    if not configFilePath or not newConfig:
        raise Exception("Missing parameter for editJobConfig!")
    
    log.Logger().info("Editing config file %s" %configFilePath)
    configFile = codecs.open(configFilePath, 'r', 'utf-8')
    configJson = configFile.read()
    configFile.close()

    parsedConfig = demjson.decode(configJson, allow_comments=True)
    
    mergeDict(parsedConfig, newConfig)

    newConfigJson = demjson.encode(parsedConfig, strict=False, compactly=False, escape_unicode=True, encoding="utf-8")

    configFile = codecs.open(configFilePath, 'w', 'utf-8')
    log.Logger().info("Writing new config to file: %s" %configFilePath)
    configFile.write(newConfigJson)
    configFile.close()


def killProcess(procName="None"):
    osName = getOperatingSystemName()
    if not procName:
        return
    
    if "Linux" in osName or "Mac OS X" in osName:
          log.Logger().info("Killing *nix process: %s" %procName)      
          invokeExternal("pkill %s" %procName)
    else:
        script = "kill %s.vbs" %procName
        if (os.path.isfile(script)):
            log.Logger().info("Killing Windows process: %s" %procName)
            invokeExternal("wscript %s" %script)


def getJsonFromUrl(url):
    if not url:
        raise RuntimeError, "No URL specified!"
    import urllib

    try:
        jsonData = urllib.urlopen(url)
    except Exception, e:
        log.Logger().error("util.getJsonFromUrl: Couldn't open URL %s" %url)
        log.Logger().logError(e)
    
    try:
        data = json.load(jsonData)
        return data
    except Exception, e:
        log.Logger().error("Could not parse JSON: %s" %repr(jsonData))
        log.Logger().logError(e)


def getJson(data):
    return json.dumps(data)


def getSvnVersion(path):
    #ret,out,err = invokePiped("svnversion %s" %path)
    out = invokePiped("svnversion %s" %path)[1]
    rev = out.rstrip('\n')
    return rev


def svnRevert(path):
    log.Logger().debug("Reverting SVN repository %s" %path)
    status, std, err = invokePiped("svn revert -R %s" %path) #@UnusedVariable
    if status > 0:
        log.Logger().error("svn revert finished with error %s" %err)


def svnUpdate(path):
    log.Logger().debug("Updating SVN repository %s" %path)
    status, std, err = invokePiped("svn up %s" %path) #@UnusedVariable
    if status > 0:
        log.Logger().error("svn up finished with error %s" %err)


def getHostName():
    import socket
    hostname = socket.gethostname()
    return socket.gethostbyname(hostname)


def locate(startDir, pattern):
    import fnmatch
    for path, dirs, files in os.walk(os.path.abspath(startDir)): #@UnusedVariable
        for filename in fnmatch.filter(files, pattern):
            yield os.path.join(path, filename)


def getLastLineFromString(string):
    import re
    m = re.search("[\n\r](.*)$", string)
    if m:
        if m.group(1):
            return m.group(1)
    return None 


def stripComments(jsonstr):
    import re
    eolComment = re.compile(r'(?<![a-zA-Z]:)//.*$', re.M)
    mulComment = re.compile(r'/\*.*?\*/', re.S)
    result = eolComment.sub('',jsonstr)
    result = mulComment.sub('',result)
    return result