//
//  HBTabbarItem.h
//  ACFunHB
//
//  Created by 何博 on 16/1/7.
//  Copyright © 2016年 何博. All rights reserved.
//

#import <UIKit/UIKit.h>

@class HBTabbarItem;
@protocol HBTabbarItemdelegat <NSObject>

-(void)CustomItemDidTap:(HBTabbarItem *)item;

@end

@interface HBTabbarItem : UIView

@property (nonatomic , weak) id<HBTabbarItemdelegat> delegate;

@property (nonatomic,strong)UIImage *normalIcon;

@property (nonatomic,strong)UIImage *selectedIcon;

@property (nonatomic,strong)UIColor *normalTextColor;

@property (nonatomic,strong)UIColor *selectedTextColor;

@property (nonatomic,strong)NSString *title;

@property (nonatomic,assign,getter=isSelected)BOOL selected;

@property (nonatomic,assign)CGFloat iconTextMargin;

@property (nonatomic,assign)CGFloat leftMargin;

@end
