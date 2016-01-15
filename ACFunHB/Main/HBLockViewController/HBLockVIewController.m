//
//  HBLockVIewController.m
//  ACFunHB
//
//  Created by 何博 on 16/1/15.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBLockVIewController.h"
#import "SPLockScreen.h"
#import "HBTabBarController.h"

#define UIBUTTON_TAG 1236
@interface HBLockVIewController ()<LockScreenDelegate>

@end

@implementation HBLockVIewController
-(void)viewDidLoad
{
    UIImageView *bgView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"pattern_lock_background"]];
    bgView.frame = CGRectMake(0, 0, SCREENW, SCREENH);
    [self.view addSubview:bgView];
    self.spView = [[SPLockScreen alloc] initWithFrame:self.view.bounds];
    self.spView.center = CGPointMake(SCREENW/2, 500.f);
    [self.view addSubview:self.spView];
    self.spView.delegate = self;
    
    //错误信息
    self.infoLabel = [[UILabel alloc]initWithFrame:CGRectMake(0, 50, SCREENW, 20)];
    self.infoLabel.backgroundColor = [UIColor clearColor];
    self.infoLabel.font = TITLE_MOST_BIG;
    self.infoLabel.textColor = [UIColor colorWithRed:49.0f / 255.0f green: 170.0f / 255.0f blue: 242.0f / 255.0f alpha:1.0f];
    self.infoLabel.textAlignment = NSTextAlignmentCenter;
    
    [self.view addSubview:self.infoLabel];
    
    [self updateOutlook];
 
    //忘记手势密码 UIButton
    UIButton *button1 = [UIButton buttonWithType:UIButtonTypeCustom];
    [button1 setTitle:@"忘记手势密码" forState:UIControlStateNormal];
    [button1 setTitleColor:[UIColor colorWithRed:49.0f / 255.0f green: 170.0f / 255.0f blue: 242.0f / 255.0f alpha:1.0f] forState:UIControlStateNormal];
    button1.titleLabel.font =  TITLE_NMB_BIG;
    button1.frame = CGRectMake(0, SCREENH-30, SCREENW/2, 30);
   
    [button1 addTarget:self action:@selector(buttonPressed:) forControlEvents:UIControlEventTouchUpInside];
    button1.tag = UIBUTTON_TAG + 1;
    [self.view addSubview:button1];
    
    //用其他账号登录 UIButton
    UIButton *button2 = [UIButton buttonWithType:UIButtonTypeCustom];
    [button2 setTitle:@"用其他账号登录" forState:UIControlStateNormal];
    [button2 setTitleColor:[UIColor colorWithRed:49.0f / 255.0f green: 170.0f / 255.0f blue: 242.0f / 255.0f alpha:1.0f] forState:UIControlStateNormal];
    button2.titleLabel.font = TITLE_NMB_BIG;
    button2.frame = CGRectMake(SCREENW/2, SCREENH-30, SCREENW/2, 30);
   
    [button2 addTarget:self action:@selector(buttonPressed:) forControlEvents:UIControlEventTouchUpInside];
    button2.tag = UIBUTTON_TAG + 2;
    [self.view addSubview:button2];

}

- (void)lockScreen:(SPLockScreen *)lockScreen didEndWithPattern:(NSNumber *)patternNumber
{



}

- (void) buttonPressed:(UIButton *)sender
{

    HBAppdelegate *appdelegate = (HBAppdelegate *)[UIApplication sharedApplication].delegate;
    
    appdelegate.window.rootViewController = [[HBTabBarController alloc] init];

}

- (void)updateOutlook
{
    self.infoLabel.textColor = [UIColor colorWithRed:49.0f / 255.0f green: 170.0f / 255.0f blue: 242.0f / 255.0f alpha:1.0f];
    
    switch (self.infoLabelStatus) {
        case InfoStatusFirstTimeSetting:
            self.infoLabel.text = @"绘制解锁图案";
            break;
        case InfoStatusConfirmSetting:
            self.infoLabel.text = @"再次绘制解锁图案";
            break;
        case InfoStatusFailedConfirm:
            self.infoLabel.textColor = [UIColor redColor];
            self.infoLabel.text = @"与上次绘制不一致，请重新绘制";
            break;
            
        case InfoStatusSuccessMatch:
            self.infoLabel.text = @"设置成功";
            break;
            
        default:
            break;
    }
}


@end
