//
//  TimeFormatter.m
//  DiMeng
//
//  Created by kejinliang on 15/6/26.
//  Copyright (c) 2015年 dimeng. All rights reserved.
//

#import "NSString+TimeFormatter.h"

@implementation NSString (TimeFormatter)

+ (NSString *)timeTransfor:(NSString *)timeStr {
    return [timeStr substringToIndex:10];
}

+ (NSString *)formatStringFloat:(NSString *)str {
    return [NSString stringWithFormat:@"%.2f", [str floatValue]];
}

// 时间戳转变成格式时间
+ (NSString *)transforFormatter:(NSInteger)sec {
    NSDate * dt = [NSDate dateWithTimeIntervalSince1970:sec];
    NSDateFormatter * df = [[NSDateFormatter alloc] init];
    [df setDateFormat:@"yyyy-MM-dd"];
    NSString *regStr = [df stringFromDate:dt];
    return regStr;
}

// 精确到时分秒
+ (NSString *)transforFormatterWithHMS:(NSInteger)sec {
    NSDate * dt = [NSDate dateWithTimeIntervalSince1970:sec];
    NSDateFormatter * df = [[NSDateFormatter alloc] init];
    [df setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
    NSString *regStr = [df stringFromDate:dt];
    return regStr;
}

// 获取时分秒
+ (NSString *)transforHMS:(NSInteger)sec
{
    NSDate * dt = [NSDate dateWithTimeIntervalSince1970:sec];
    NSDateFormatter * df = [[NSDateFormatter alloc] init];
    [df setDateFormat:@"HH:mm:ss"];
    NSString *regStr = [df stringFromDate:dt];
    return regStr;
}

//需要改为动态倒计时显示
+ (NSString *)intervalSinceNow:(NSTimeInterval)theDate {
    NSTimeInterval late= theDate;
    
    NSDate* dat = [NSDate date];
    NSTimeInterval now=[dat timeIntervalSince1970];
    NSString *timeString=@"";
    
    NSTimeInterval cha=late-now;
    
    if (cha <= 0) {
        return @"";
    }else{
        NSDate *date = [NSDate dateWithTimeIntervalSince1970:theDate];
        NSCalendar *cal = [NSCalendar currentCalendar];
        unsigned int unitFlags =  NSCalendarUnitDay | NSCalendarUnitHour | NSCalendarUnitMinute | NSCalendarUnitSecond ;
        NSDateComponents *d = [cal components:unitFlags fromDate:dat toDate:date options:0];
        timeString = [NSString stringWithFormat:@"%ld天%ld时%ld分%ld秒", (long)[d day],(long)[d hour], (long)[d minute], (long)[d second]];
        return timeString;
    }
    return timeString;
}

/*
*获取当前时间戳
*/

+ (NSString*)currentTimeStampString
{
    NSDate *now = [NSDate date];
    NSTimeInterval timeInterval = [now timeIntervalSinceReferenceDate];
    
    NSString *timeString = [NSString stringWithFormat:@"%lf",timeInterval];
    timeString = [timeString stringByReplacingOccurrencesOfString:@"." withString:@""];
    
    return timeString;
    
}

@end
