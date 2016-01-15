//
//  HBSwithItem.m
//  ACFunHB
//
//  Created by 何博 on 16/1/9.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBSwithItem.h"

@implementation HBSwithItem

- (void)setOn:(BOOL)on
{
    _on = on;
    
    // 数据存储
    [HBUserDefaults setBool:on forKey:self.title];
    
}

- (void)setTitle:(NSString *)title
{
    [super setTitle:title];
    
    self.on = [HBUserDefaults boolForKey:title];
}


@end
