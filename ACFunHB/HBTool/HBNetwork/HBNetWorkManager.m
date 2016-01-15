//
//  HBNetWorkManager.m
//  ACFunHB
//
//  Created by 何博 on 16/1/8.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBNetWorkManager.h"

static dispatch_queue_t HBNetWorkManagerOperationQueue = nil;

@implementation HBNetWorkManager

+ (HBNetWorkManager *) HBNetWorkManager
{
    static HBNetWorkManager *netWorkManeger = nil;

    static dispatch_once_t onceToken;
    
    dispatch_once(&onceToken, ^{
        
        if (!netWorkManeger) {
            
            netWorkManeger = [[self alloc]init];
            
        }
        
    });

    return netWorkManeger;
}

@end
