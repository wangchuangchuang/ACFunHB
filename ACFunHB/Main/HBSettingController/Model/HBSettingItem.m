//
//  HBSettingItem.m
//  ACFunHB
//
//  Created by 何博 on 16/1/9.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBSettingItem.h"

@implementation HBSettingItem
+ (instancetype)itemWithTitle:(NSString *)title image:(UIImage *)image
{
    HBSettingItem *item = [[self alloc] init];
    item.image = image;
    item.title = title;
    return item;
}

+ (instancetype)itemWithTitle:(NSString *)title
{
    HBSettingItem *item = [self itemWithTitle:title image:nil];
    return item;
}

@end
