//
//  HBCustomTabBar.h
//  ACFunHB
//
//  Created by 何博 on 16/1/7.
//  Copyright © 2016年 何博. All rights reserved.
//

#import <UIKit/UIKit.h>
@class HBCustomTabBar;
@protocol HBCustomTabBarDelegate <NSObject>

-(NSArray *)HBCustomTabBarSourceItem:(HBCustomTabBar *)tabBar;

- (void)customTabBar:(HBCustomTabBar *)tabBar didChoosedIndex:(NSInteger)index;

- (void)centerBtnClick;

@end


@interface HBCustomTabBar : UIView
@property (nonatomic , assign) NSInteger select;
@property (nonatomic , weak ) id<HBCustomTabBarDelegate> delegate;

-(instancetype) initWithFrame:(CGRect)frame byDataSource: (id <HBCustomTabBarDelegate>) delegate;

@end
