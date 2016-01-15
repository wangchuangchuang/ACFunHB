//
//  HBSettingItem.h
//  ACFunHB
//
//  Created by 何博 on 16/1/9.
//  Copyright © 2016年 何博. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void(^HBSettingItemOption)();

@interface HBSettingItem : NSObject

@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) NSString *subTitle;
@property (nonatomic, strong) UIImage *image;
@property (nonatomic, copy) HBSettingItemOption option;

@property (nonatomic, assign) Class descVc;

+ (instancetype)itemWithTitle:(NSString *)title;
+ (instancetype)itemWithTitle:(NSString *)title image:(UIImage *)image;

@end
