//
//  HBloginController.m
//  ACFunHB
//
//  Created by 何博 on 16/1/8.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBloginController.h"

@implementation HBloginController

-(void) viewWillAppear:(BOOL)animated
{
    if (iPhone4) {
        [self.navigationController.navigationBar setHidden:YES];
    }
    else{
    self.title = @"登录";
    }
}

@end
