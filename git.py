#! /usr/bin/env python

import os
import util

class Git:
    def __init__(self,path=None):
        if path:
            self.path = path
        else:
            self.path = os.getcwd()
        self.startDir = os.getcwd()
    
    def do(self, cmd=None):
        if not cmd:
            return
        os.chdir(self.path)
        (ret,out,err) = util.invokePiped(cmd)
        result = False
        
        if ret > 0:
            result = out + " " + err
        else:
            result = out
        
        os.chdir(self.startDir)
        return result
