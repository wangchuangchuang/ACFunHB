//
//  ProfileController.m
//  ACFunHB
//
//  Created by 何博 on 16/1/7.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "ProfileController.h"
#import "HBGroupItem.h"
#import "HBArrowItem.h"
#import "HBBasicSettingCell.h"
#import "HBSettingViewController.h"
#import "ProfleCell.h"
#import "ProfileChildController.h"
#import "HBSwithItem.h"
#import "HBBadgeItem.h"
#import "HBCheckItem.h"
#import "HBLabelItem.h"

@interface ProfileController ()

@end

@implementation ProfileController
- (void)viewDidLoad
{
    [self setUpGroup0];
    
    [self setUpGroup1];
    
    [self setUpGroup2];
    
    [self setUpGroup3];
    
    [self setUpGroup4];
    
}

- (void)setUpGroup0
{
    HBArrowItem * friend = [HBArrowItem itemWithTitle:@"好友" image:[UIImage imageNamed:@"bh_102"]];
    
    HBGroupItem *group = [[HBGroupItem alloc] init];
    
    friend.subTitle = @"(2)";
    
    friend.descVc = [ProfileChildController class];
    
    group.items = @[friend];
    
    [self.groups addObject:group];

}

- (void)setUpGroup1
{
    HBArrowItem * friend = [HBArrowItem itemWithTitle:@"我的" image:[UIImage imageNamed:@"bh_102"]];
    
    HBArrowItem * friend1 = [HBArrowItem itemWithTitle:@"好友" image:[UIImage imageNamed:@"bh_103"]];
    
    HBGroupItem *group = [[HBGroupItem alloc] init];
    
    group.items = @[friend,friend1];
    
    [self.groups addObject:group];
    
}

- (void)setUpGroup2
{
    HBArrowItem * friend = [HBArrowItem itemWithTitle:@"好友" image:[UIImage imageNamed:@"bh_105"]];
    
    HBBadgeItem * friend1 = [HBBadgeItem itemWithTitle:@"打啊" image:[UIImage imageNamed:@"bh_107"]];
    
    friend1.badgeValue = @"5";
    
    HBGroupItem *group = [[HBGroupItem alloc] init];
    
    group.items = @[friend,friend1];
    
    [self.groups addObject:group];
    
}

- (void)setUpGroup3
{
    HBArrowItem * friend = [HBArrowItem itemWithTitle:@"好友" image:[UIImage imageNamed:@"bh_106"]];
    
    HBSwithItem * friend1 = [HBSwithItem itemWithTitle:@"检查" image:[UIImage imageNamed:@"bh_107"]];
    
     HBCheckItem * friend2 = [HBCheckItem itemWithTitle:@"看看" image:[UIImage imageNamed:@"bh_105"]];
    
    friend2.cheak = YES;
    
    friend1.on = YES;
    
    HBGroupItem *group = [[HBGroupItem alloc] init];
    
    group.items = @[friend,friend1,friend2];
    
    [self.groups addObject:group];
    
}

-(void)setUpGroup4
{
    HBLabelItem * label = [[HBLabelItem alloc]init];
    
    label.text = @"退出";
    
    HBGroupItem *group = [[HBGroupItem alloc] init];
    
    group.items = @[label];
    
    [self.groups addObject:group];
    
    
}

- (UITableViewCell *) tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    
    
    ProfleCell * cell = [ProfleCell cellWithTableView:tableView];

    HBGroupItem *groupItem = self.groups [indexPath.section];
    HBSettingItem *setItem = groupItem.items[indexPath.row];
    
    cell.item = setItem;
    
    [cell setIndexPath:indexPath rowCount:(int)groupItem.items.count];
    
    return cell;

}


@end
