//
//  HBSettingViewController.m
//  ACFunHB
//
//  Created by 何博 on 16/1/9.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBSettingViewController.h"
#import "HBBasicSettingCell.h"
#import "HBGroupItem.h"
#import "HBSettingItem.h"
#import "HBTabBarController.h"
#import "HBMainController.h"

@implementation HBSettingViewController

-(instancetype)init
{
    
 
    return [self initWithStyle:UITableViewStyleGrouped];
}


-(NSMutableArray *)groups
{
    if (_groups == nil) {
        _groups = [NSMutableArray array];
    }
    return _groups;
}


-(void)viewDidLoad
{
    [super viewDidLoad];
    
    self.tableView.backgroundColor = MAINCOLOR;
    self.tableView.sectionFooterHeight = 0;
    self.tableView.sectionHeaderHeight = 10.f;
    self.tableView.contentInset = UIEdgeInsetsMake(-25, 0, 0, 0);
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;

}

#pragma UITableView DataSource
- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    HBGroupItem *groupItem = self.groups[section];
    
    return groupItem.heardTitle;

}

- (NSString *)tableView:(UITableView *)tableView titleForFooterInSection:(NSInteger)section
{
    HBGroupItem *groupItem = self.groups[section];
    
    return groupItem.footTitle;
    
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return self.groups.count;

}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    HBGroupItem *groupItem = self.groups[section];
    
    return groupItem.items.count;

}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    HBBasicSettingCell * cell = [HBBasicSettingCell cellWithTableView:tableView];
    HBGroupItem * groupItem = self.groups[indexPath.section];
    HBSettingItem * setItem = groupItem.items[indexPath.row];
    
    cell.item = setItem;
    
    [cell setIndexPath:indexPath rowCount:(int)groupItem.items.count];
    
    return cell;
}

#pragma UITbaleView delegate
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    
    // 获取模型
    HBGroupItem *groupItem = self.groups[indexPath.section];
    HBSettingItem *item = groupItem.items[indexPath.row];
    
    if (item.option) {
        item.option();
        return;
    }
    
    
    if (item.descVc) {
        HBMainController *vc = [[item.descVc alloc] init];
        vc.title = item.title;
        [self.navigationController pushViewController:vc animated:YES];
    }
    
}
-(void)viewWillAppear:(BOOL)animated
{
    [self.navigationController.navigationBar setBackgroundImage:[UIImage imageWithRenderColor:[UIColor colorWithRed:1.000 green:0.341 blue:0.110 alpha:1.000] renderSize:CGSizeMake(SCREENW, 50)] forBarMetrics:UIBarMetricsDefault];
    
    self.navigationController.navigationBar.tintColor = [UIColor whiteColor];
    
    NSDictionary * dict=[NSDictionary dictionaryWithObject:[UIColor whiteColor] forKey:NSForegroundColorAttributeName];
    self.navigationController.navigationBar.titleTextAttributes = dict;
        
    if (self.navigationController.viewControllers.count > 0 && self != [self.navigationController.viewControllers objectAtIndex:0])
    {
        UIBarButtonItem *btn = [[UIBarButtonItem alloc] initWithTitle:@"返回" style:UIBarButtonItemStylePlain target:self action:@selector(rightbtnClick)];
        [self.navigationItem setLeftBarButtonItem:btn];
    }
    
    HBTabBarController *HBTabbar = (HBTabBarController *)self.tabBarController;
    
    if ([HBTabbar isKindOfClass:[HBTabBarController class]]) {
        
        if (self.isMain) {
            [HBTabbar showTabbar];
        }
        else{
            [HBTabbar hiddenTabbar];
        }
        
    }
    
    [super viewWillAppear:YES];
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return 40.f;
}

-(void)rightbtnClick
{
    [self.navigationController popViewControllerAnimated:YES];
    
}


@end
