//
//  HBAppdelegate.m
//  ACFunHB
//
//  Created by 何博 on 16/1/15.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBAppdelegate.h"
#import "HBTabBarController.h"
#import "HBWindow.h"
#import "HBLockVIewController.h"

#define AUTO_LOCK_SCREEN 5

@implementation HBAppdelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    
    self.window = [[HBWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    
    HBTabBarController *HbVc = [[HBTabBarController alloc] init];
    
    self.window.rootViewController = HbVc;
    
    [self.window makeKeyAndVisible];
    
    return YES;
}

- (void)startTimer
{

    if (_g_timeCount) {
        [_g_timeCount invalidate];
        _g_timeCount = nil;
    }
    _g_timeCount = [NSTimer scheduledTimerWithTimeInterval:AUTO_LOCK_SCREEN target:self selector:@selector(lockScreen) userInfo:nil repeats:NO];
}

- (void)lockScreen
{
    [_g_timeCount invalidate];
    
    _g_timeCount = nil;
    
    HBLockVIewController *lvc = [[HBLockVIewController alloc] init];
    
    self.window.rootViewController = lvc;

}

- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end
