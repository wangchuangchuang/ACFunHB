//
//  HBBasicSettingCell.h
//  ACFunHB
//
//  Created by 何博 on 16/1/9.
//  Copyright © 2016年 何博. All rights reserved.
//

#import <UIKit/UIKit.h>
@class HBSettingItem;
@interface HBBasicSettingCell : UITableViewCell

@property (nonatomic, strong) HBSettingItem *item;


+ (instancetype)cellWithTableView:(UITableView *)tableView;

- (void)setIndexPath:(NSIndexPath *)indexPath rowCount:(int)rowCount;

@end
