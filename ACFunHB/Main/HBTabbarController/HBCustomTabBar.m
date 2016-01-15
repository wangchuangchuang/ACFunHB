//
//  HBCustomTabBar.m
//  ACFunHB
//
//  Created by 何博 on 16/1/7.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBCustomTabBar.h"
#import "HBTabbarItem.h"

#define RedTipLabeltagMargin 256
#define BaritemtagMargin 775

@interface HBCustomTabBar ()<HBTabbarItemdelegat>

@property (nonatomic,strong) UILabel *redTipLabel;

@property (nonatomic,strong)UIImageView *topSeprateLine;

@end

@implementation HBCustomTabBar
-(instancetype) initWithFrame:(CGRect)frame byDataSource: (id <HBCustomTabBarDelegate>) adelegate
{
    if (self = [super initWithFrame:frame]) {
        self.userInteractionEnabled = YES;

        self.delegate = adelegate;

        [self setUpSubViews];
        
        self.topSeprateLine = [[UIImageView alloc]init];
        self.topSeprateLine.width = SCREENW;
        self.topSeprateLine.height = 0.5f;
        self.topSeprateLine.y = 0.f;
        self.topSeprateLine.x = 0.f;
        self.topSeprateLine.backgroundColor = LINE_COLOR;
        [self addSubview:self.topSeprateLine];
    
        [self refreshTipLabel];
        
    }

    return self;

}

-(void) setUpSubViews
{
    NSArray *dataArray = [self.delegate HBCustomTabBarSourceItem:self];
    
    CGFloat itemWidth = (SCREENW/(dataArray.count+1));
    
    CGFloat itemHeight = 49.f;
    
    for (int index = 0; index < dataArray.count ; index ++) {
        
        NSDictionary *imageDic = dataArray[index];
        
        CGFloat itemX;
      
        if (index >1) {
              itemX= itemWidth * (index+1);
        
        }
        else{
                itemX = itemWidth * index;
        }
       
        CGFloat itemY = 0;
        
        CGRect itemRect = CGRectMake(itemX, itemY, itemWidth, itemHeight);
        
        
        UIImage * norImage = [UIImage imageNamed:imageDic[@"normal"]];
        
        UIImage * selectImage = [UIImage imageNamed: imageDic[@"select"]];
        
        HBTabbarItem *item = [[HBTabbarItem alloc] initWithFrame:itemRect];
        
        item.normalIcon = norImage;
        
        item.selectedIcon = selectImage;
        
        item.backgroundColor = [UIColor clearColor];
    
        item.delegate = self;
        
        item.tag = BaritemtagMargin + index;
        
        [self addSubview:item];
        
        if (index == 0) {
            
            item.selected = YES;
            
            self.select = index;
         
        }
        self.redTipLabel = [[UILabel alloc] init];
        self.redTipLabel.size = CGSizeMake(18, 18);
        self.redTipLabel.backgroundColor = [UIColor redColor];
        self.redTipLabel.textColor = [UIColor whiteColor];
        self.redTipLabel.layer.cornerRadius = self.redTipLabel.width/2.0;
        self.redTipLabel.layer.masksToBounds = YES;
        self.redTipLabel.font = TITLE_SMALL;
        self.redTipLabel.textAlignment = NSTextAlignmentCenter;
        self.redTipLabel.tag = RedTipLabeltagMargin + index;
      

        self.redTipLabel.center = item.center;
        self.redTipLabel.x += 12.f;
        self.redTipLabel.y -= 12.f;
        self.redTipLabel.hidden = YES;
        
        [self addSubview:self.redTipLabel];
        
    }
    //中间Button创建
    UIButton *CenterBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    
    CenterBtn.frame = CGRectMake(itemWidth * 2, 0, itemWidth, itemHeight);
    
    [self addSubview:CenterBtn];
    
    [CenterBtn setImage:[UIImage imageNamed:@"tabbar_compose_icon_add"] forState:UIControlStateNormal];
    [CenterBtn setImage:[UIImage imageNamed:@"tabbar_compose_icon_add_highlighted"] forState:UIControlStateHighlighted];
    [CenterBtn setBackgroundImage:[UIImage imageNamed:@"tabbar_compose_button"] forState:UIControlStateNormal];
    [CenterBtn setBackgroundImage:[UIImage imageNamed:@"tabbar_compose_button_highlighted"] forState:UIControlStateHighlighted];
    
    
    [CenterBtn addTarget:self action:@selector(clickAddBtn) forControlEvents:UIControlEventTouchUpInside];
    
    [self bringSubviewToFront:self.redTipLabel];
 

}

-(void)clickAddBtn
{
    if (self.delegate && [self.delegate respondsToSelector:@selector(centerBtnClick)]) {
        [self.delegate centerBtnClick];
    }

}

-(void) CustomItemDidTap:(HBTabbarItem *)item
{
    NSInteger currentIndex = item.tag - BaritemtagMargin;
   
    if (self.delegate && [self.delegate respondsToSelector:@selector(customTabBar:didChoosedIndex:)]) {
        [self.delegate customTabBar:self didChoosedIndex:currentIndex];
    
    }
    
    HBTabbarItem *barItem = (HBTabbarItem *)[self viewWithTag:BaritemtagMargin + self.select];
    
    self.select = currentIndex;
    
    barItem.selected = NO;
    
    item.selected = YES;
    
    self.redTipLabel = [self viewWithTag:(currentIndex+RedTipLabeltagMargin)];
    
    self.redTipLabel.hidden = YES;
    
    self.select = currentIndex;
    
    [self refreshTipLabel];
    
}

-(void) refreshTipLabel
{
    NSInteger count = 99;
    
    if (count > 99)
    {
        count = 99;
    }

    if (count > 0)
    {
        for (UILabel *label in self.subviews) {
            if ([label isKindOfClass:[self.redTipLabel class]])
            {
                if (label.tag != self.select + RedTipLabeltagMargin && label.tag != 2 + RedTipLabeltagMargin) {
                    label.hidden = NO;
                    label.text = [NSString stringWithFormat:@"%ld",count];
                }
               
            }
        }

    }
    else
    {
        self.redTipLabel.hidden = YES;
    }

}


@end
