//
//  HBMainController.h
//  ACFunHB
//
//  Created by 何博 on 16/1/7.
//  Copyright © 2016年 何博. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface HBMainController : UIViewController

@property (nonatomic , strong) MBProgressHUD *MBHUD;

@property (nonatomic , assign) BOOL isMain;


/**
 *  创建右边按钮没有图片
 *
 *  @param title 设置右边按钮的title
 */
- (void)setRightButtonWithTitle:(NSString *)title;

- (void)setLeftButtonWithImageName:(NSString*)imageName bgImageName:(NSString*)bgImageName;

- (void)setRightButtonWithStateImage:(NSString *)iconName stateHighlightedImage:(NSString *)highlightIconName stateDisabledImage:(NSString *)disableIconName titleName:(NSString *)title;

/**
 *  向导航栏右边添加一个item,在原来的项的右边还是左边
 *
 *  @param button
 *  @param state
 */
- (void)appendRightBarItemWithCustomButton:(UIButton *)button toOldLeft:(BOOL)state;

- (void)showSuccessMessage:(NSString *)message;

- (void)showErrorMessage:(NSString *)message;


@end
