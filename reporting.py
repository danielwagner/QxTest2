#! /usr/bin/env python

import urllib
import urllib2
import util

def sendResultToReportServer(reportServerUrl, data, resultType = "testRun" ):
    if type(data).__name__ != "str":
        data = util.getJson(data)
    
    postdata = urllib.urlencode({resultType : data})
    req = urllib2.Request(reportServerUrl, postdata)
    
    try:
        response = urllib2.urlopen(req)    
    except urllib2.URLError, e:
        fileName = "reportservererror_%s.html" %util.getTimestamp()
        errorFile = open(fileName, "w")
        errorFile.write(e.read())
        errorFile.close()
        raise RuntimeError, e
      
    return response.read()