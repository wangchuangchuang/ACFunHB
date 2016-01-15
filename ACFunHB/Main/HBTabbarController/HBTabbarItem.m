//
//  HBTabbarItem.m
//  ACFunHB
//
//  Created by 何博 on 16/1/7.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBTabbarItem.h"

@implementation HBTabbarItem
-(instancetype) initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        
        UITapGestureRecognizer * tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tapItem)];
        
        [self addGestureRecognizer:tap];
        
        self.userInteractionEnabled = YES;
        
    }

    return self;
}

-(void)drawRect:(CGRect)rect
{
    CGSize iconSize = self.normalIcon.size;
    
    CGFloat originX = (rect.size.width - iconSize.width)/2;
    
    CGFloat originY = (rect.size.height - iconSize.height)/2;
    
    CGRect iconRect = CGRectMake(originX, originY, iconSize.width , iconSize.height );
    
    if (_selected) {
        [self.selectedIcon drawInRect:iconRect];
        return;
    }
    
    [self.normalIcon drawInRect:iconRect];
    
}


- (void)setSelected:(BOOL)selected
{
    if (_selected == selected) {
        return;
    }
    _selected = selected;
    
    [self setNeedsDisplay];
}

-(void)tapItem
{
    if (self.delegate && [self.delegate respondsToSelector:@selector(CustomItemDidTap:)]) {
        [self.delegate CustomItemDidTap:self];
    }
    
}

@end
