//
//  HBTabBarController.m
//  ACFunHB
//
//  Created by 何博 on 16/1/7.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBTabBarController.h"
#import "HomeViewController.h"
#import "AttractController.h"
#import "ChannelController.h"
#import "ProfileController.h"
#import "HBNavigationController.h"
#import "HBCustomTabBar.h"
@interface HBTabBarController ()<HBCustomTabBarDelegate>
@property (nonatomic,strong) HBCustomTabBar * HBTabbar;

@end

@implementation HBTabBarController
-(void)viewDidLoad
{
   [super viewDidLoad];
    
    [self setUpChildViewControllers];
    
}

-(void)setUpChildViewControllers
{
    HomeViewController *Hvc = [[HomeViewController alloc] init];
    
    Hvc.isMain = YES;
    
    [self setUPOneViewController:Hvc title:@"首页"];
    
    ChannelController *Cvc = [[ChannelController alloc] init];
    
    Cvc.isMain = YES;
    
    [self setUPOneViewController:Cvc title:@"频道"];
    
    AttractController *Avc = [[AttractController alloc] init];
    
    Avc.isMain = YES;
    
    [self setUPOneViewController:Avc title:@"关注"];
    
    ProfileController *Pvc = [[ProfileController alloc] init];
    
    Pvc.isMain = YES;
    
    [self setUPOneViewController:Pvc title:@"我的"];
    
    HBCustomTabBar * HBCustomTabbar = [[HBCustomTabBar alloc] initWithFrame:self.tabBar.frame byDataSource:self];

    self.HBTabbar = HBCustomTabbar;
    
    self.HBTabbar.delegate = self;
    
    self.HBTabbar.backgroundColor = [UIColor whiteColor];
    
    [self.view addSubview:self.HBTabbar];
    
   self.tabBar.hidden = YES;
    
    

}

-(void)setUPOneViewController:(UIViewController *)vc title:(NSString *)title
{
    HBNavigationController *hnv = [[HBNavigationController alloc]initWithRootViewController:vc];
    
    vc.title = title;

    [self addChildViewController:hnv];

}

-(NSArray *) HBCustomTabBarSourceItem:(HBCustomTabBar *)tabBar
{

    NSArray * ImageArray = @[@{@"normal":@"ic-home1",@"select":@"ic-home-hover1"},
                             @{@"normal":@"ic-home2",@"select":@"ic-home-hover2"},
                       
                             @{@"normal":@"ic-home3",@"select":@"ic-home-hover3"},
                             @{@"normal":@"ic-home4",@"select":@"ic-home-hover4"}];

    return ImageArray;
}

- (void)customTabBar:(HBCustomTabBar *)tabBar didChoosedIndex:(NSInteger)index
{
    if (self.selectedIndex == index) {
        
        return;
    }

    self.selectedIndex = index;


}

-(void)hiddenTabbar
{
    [UIView animateWithDuration:05 animations:^{
        
        self.HBTabbar.alpha = 0.f;
    }];

}
-(void)showTabbar
{
    [UIView animateWithDuration:05 animations:^{
        self.HBTabbar.alpha = 1.0f;
        
    }];


}

-(void)centerBtnClick
{
    UIAlertController *Avc = [UIAlertController alertControllerWithTitle:@"提示" message:@"请选择日志类型" preferredStyle:UIAlertControllerStyleAlert];
        
    UIAlertAction *action = [UIAlertAction actionWithTitle:@"发布" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
            
            NSLog(@"发布");
            
        }];
        
    [Avc addAction:action];
    
    [self.childViewControllers[0] presentViewController:Avc animated:YES completion:nil];
    

}

@end
