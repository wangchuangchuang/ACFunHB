//
//  HBBadgeView.m
//  ACFunHB
//
//  Created by 何博 on 16/1/9.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBBadgeView.h"

@implementation HBBadgeView
- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        
        UIImage *backgroundImage = [UIImage imageNamed:@"main_badge"];
        [self setBackgroundImage:backgroundImage forState:UIControlStateNormal];
        self.titleLabel.font = TITLE_MIDDLE;
        self.size = backgroundImage.size;
        
        self.userInteractionEnabled = NO;
    }
    return self;
}


- (void)setBadgeValues:(NSString *)badgeValues
{
    _badgeValues = badgeValues;
    
    if (badgeValues == nil || [badgeValues isEqualToString:@""] || [badgeValues isEqualToString:@"0"]) { // 没有badgeValue，或者badgeValue为空，就隐藏
        self.hidden = YES;// 直接返回
        return;
    }else{
        self.hidden = NO;
    
    
    }
    
    [self setTitle:badgeValues forState:UIControlStateNormal];
    
    CGFloat titleW = [badgeValues boundingRectWithSize:CGSizeMake(MAXFLOAT, MAXFLOAT) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName : TITLE_MIDDLE} context:nil].size.width;
    
    if (titleW > self.width) { // 文字宽度大于按钮宽度
        [self setBackgroundImage:nil forState:UIControlStateNormal];
        [self setImage:[UIImage imageNamed:@"new_dot"] forState:UIControlStateNormal];
    }else{
        [self setBackgroundImage:[UIImage imageNamed:@"main_badge"] forState:UIControlStateNormal];
        [self setImage:nil forState:UIControlStateNormal];
    }
    
}
@end
