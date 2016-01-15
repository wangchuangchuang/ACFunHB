//
//  HBWindow.m
//  ACFunHB
//
//  Created by 何博 on 16/1/15.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBWindow.h"
#import "HBAppdelegate.h"

@implementation HBWindow
-(instancetype)initWithFrame:(CGRect)frame
{
    if (self= [super initWithFrame:frame]) {
        
    }
    return self;
}

- (void)sendEvent:(UIEvent *)event
{
    HBAppdelegate * appDelegate = (HBAppdelegate *)[UIApplication sharedApplication].delegate;
    if (event.type == UIEventTypeTouches || event.type == UIEventTypeMotion || event.type == UIEventTypeRemoteControl || event.type == UIEventTypePresses) {
        [appDelegate startTimer];
        
    }

    [super sendEvent:event];

}

@end
