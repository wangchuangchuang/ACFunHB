//
//  HBAppdelegate.h
//  ACFunHB
//
//  Created by 何博 on 16/1/15.
//  Copyright © 2016年 何博. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface HBAppdelegate : UIResponder <UIApplicationDelegate>
@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) NSTimer *g_timeCount;
@property (nonatomic, assign) BOOL isCurrentPatternLockView;

- (void)startTimer;
@end
