import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorResult } from './behavior.service.result';
import { BehaviorConfiguration } from './behavior.config';

declare let facephi: any;

@Injectable({
  providedIn: 'root'
})
export class BehaviorService 
{
  constructor(public platform: Platform) { }       

  initializeBehavior = async (value: BehaviorConfiguration): Promise<BehaviorResult> => 
  {
    return facephi.plugins.wgt.behavior.initialize(value);
  };

  setUserId = async (value: string): Promise<BehaviorResult> => 
  {
    return facephi.plugins.wgt.behavior.setUserId(value);
  };

  setPosition = async (value: string): Promise<BehaviorResult> => 
  {
    return facephi.plugins.wgt.behavior.setPosition(value);
  };

  setSessionId = async (value: string): Promise<BehaviorResult> => 
  {
    return facephi.plugins.wgt.behavior.setSessionId(value);
  };

  clearSessionData = async (): Promise<BehaviorResult> => 
  {
    return facephi.plugins.wgt.behavior.clearSessionData();
  };
}