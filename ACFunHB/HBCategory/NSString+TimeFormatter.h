//
//  TimeFormatter.h
//  DiMeng
//
//  Created by kejinliang on 15/6/26.
//  Copyright (c) 2015年 dimeng. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (TimeFormatter)
+ (NSString *)timeTransfor:(NSString *)timeStr;
+ (NSString *)formatStringFloat:(NSString *)str;
+ (NSString *)transforFormatter:(NSInteger)sec;
+ (NSString *)intervalSinceNow:(NSTimeInterval)theDate;
+ (NSString *)transforFormatterWithHMS:(NSInteger)sec;
+ (NSString *)transforHMS:(NSInteger)sec;
+ (NSString*)currentTimeStampString;
@end
