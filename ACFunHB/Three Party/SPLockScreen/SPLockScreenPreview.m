//
//  SPLockScreenPreview.m
//  tdxiPhone2.0Beta
//
//  Created by tdxmac2 on 14-2-17.
//  Copyright (c) 2014年 tdx. All rights reserved.
//

#import "SPLockScreenPreview.h"

@interface SPLockScreenPreview ()

@property(nonatomic, copy) NSString *patternNumber;

@end


@implementation SPLockScreenPreview

@synthesize patternNumber;

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
        self.backgroundColor = [UIColor clearColor];
        patternNumber = [[NSString alloc] initWithFormat:@"%.0f", 0.0f];
    }
    return self;
}

// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect
{
    // Drawing code
    CGContextRef context = UIGraphicsGetCurrentContext();
    
    // 绘制九宫格
    float margin = 1.0f;
    float radius = 5.0f;
    float left = margin;
    float top = margin;
    float lineWidth = 1.0f;
    CGContextSetLineWidth(context, lineWidth);
    for (int i = 0; i < 9; ++i) {
        if (i != 0 && i % 3 == 0) {
            top += (self.bounds.size.height - 2 * margin -  2 * radius) / 2;
            left = margin;
        }
        
        NSString *strPos = [[NSString alloc] initWithFormat:@"%d", i + 1];
        
        if ([patternNumber rangeOfString:strPos].location == NSNotFound) {
             CGContextSetFillColorWithColor(context, [UIColor clearColor].CGColor);
        }else{
             CGContextSetFillColorWithColor(context, [UIColor colorWithRed:208.0/255.0 green:237.0/255.0 blue:255.0/255.0 alpha:0.9].CGColor);
        }
        
        strPos = nil;
        
        CGContextSetStrokeColorWithColor(context, [UIColor colorWithRed:165.0/255.0 green:175.0/255.0 blue:200.0/255.0 alpha:0.9].CGColor);
        CGContextStrokeEllipseInRect(context, CGRectMake(left, top, 2 * radius, 2 * radius));
        
        CGContextAddEllipseInRect(context, CGRectMake(left, top, 2 * radius, 2 * radius));
      
        
        CGContextFillPath(context);
        left += (self.bounds.size.width - 2 * margin - 2 * radius) / 2;
    }
    
    
}

- (void) refresh:(NSString *) pn
{
    patternNumber = pn;
    [self setNeedsDisplay];
}

@end
