//
//  HBMainController.m
//  ACFunHB
//
//  Created by 何博 on 16/1/7.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBMainController.h"
#import "HBTabBarController.h"

@implementation HBMainController

-(void)viewWillAppear:(BOOL)animated
{
    [self.navigationController.navigationBar setBackgroundImage:[UIImage imageWithRenderColor:[UIColor colorWithRed:1.000 green:0.341 blue:0.110 alpha:1.000] renderSize:CGSizeMake(SCREENW, 50)] forBarMetrics:UIBarMetricsDefault];
    
    self.navigationController.navigationBar.tintColor = [UIColor whiteColor];
    
    NSDictionary * dict=[NSDictionary dictionaryWithObject:[UIColor whiteColor] forKey:NSForegroundColorAttributeName];
    self.navigationController.navigationBar.titleTextAttributes = dict;
    

    if (self.navigationController.viewControllers.count > 0 && self != [self.navigationController.viewControllers objectAtIndex:0])
    {
        UIBarButtonItem *btn = [[UIBarButtonItem alloc] initWithTitle:@"返回" style:UIBarButtonItemStylePlain target:self action:@selector(rightbtnClick)];
        [self.navigationItem setLeftBarButtonItem:btn];
    }
 
    HBTabBarController *HBTabbar = (HBTabBarController *)self.tabBarController;
    
    if ([HBTabbar isKindOfClass:[HBTabBarController class]]) {
    
        if (self.isMain) {
            [HBTabbar showTabbar];
        }
        else{
            [HBTabbar hiddenTabbar];
        }
    
    }

    [super viewWillAppear:YES];
}

-(void)rightbtnClick
{
    [self.navigationController popViewControllerAnimated:YES];

}


- (void)setRightButtonWithTitle:(NSString *)title
{

}

- (void)setLeftButtonWithImageName:(NSString*)imageName bgImageName:(NSString*)bgImageName
{

}

- (void)setRightButtonWithStateImage:(NSString *)iconName stateHighlightedImage:(NSString *)highlightIconName stateDisabledImage:(NSString *)disableIconName titleName:(NSString *)title
{


}



- (void)appendRightBarItemWithCustomButton:(UIButton *)button toOldLeft:(BOOL)state
{

}

- (void)showSuccessMessage:(NSString *)message
{

}

- (void)showErrorMessage:(NSString *)message
{

}
@end
