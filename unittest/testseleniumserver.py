#! /usr/bin/env python

import sys, os, time
import unittest

seleniumConfig = {
    "seleniumHost" : "http://localhost",
    "seleniumPort" : 4444,
    "seleniumDir" : "/home/dwagner/workspace/qooxdoo-schlund/project/testing/selenium/current",
    "seleniumServerJar" : "selenium-server.jar"
}

sys.path.append(os.path.abspath(".."))
from log import Logger
myLog = Logger(filename="unittests.log", level="debug")

import seleniumserver

class TestSeleniumServer(unittest.TestCase):    
    def setUp(self):
        self.selServ = seleniumserver.SeleniumServer(seleniumConfig)
    
    def testStart(self):
        self.assertFalse(self.selServ.isRunning())
        self.selServ.start()
        self.assertTrue(self.selServ.isRunning())
    
    def testStop(self):
        self.selServ.start()
        self.selServ.stop()
        self.assertFalse(self.selServ.isRunning())
    
    def testKill(self):
        self.selServ.start()
        self.selServ.kill()
        time.sleep(5)
        self.assertFalse(self.selServ.isRunning())
    
    def tearDown(self):
        self.selServ.stop()
        del self.selServ

if __name__ == '__main__':
    unittest.main()
