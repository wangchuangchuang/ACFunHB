//
//  HBBasicSettingCell.m
//  ACFunHB
//
//  Created by 何博 on 16/1/9.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBBasicSettingCell.h"
#import "HBSettingItem.h"
#import "HBArrowItem.h"
#import "HBSwithItem.h"
#import "HBCheckItem.h"
#import "HBBadgeItem.h"
#import "HBBadgeView.h"
#import "HBLabelItem.h"

@interface HBBasicSettingCell ()

@property (nonatomic, strong) UIImageView *arrowView;
@property (nonatomic, strong) UISwitch *switchView;
@property (nonatomic, strong) UIImageView *cheakView;
@property (nonatomic, strong) HBBadgeView *badgeView;
@property (nonatomic, weak) UILabel *labelView;

@end

@implementation HBBasicSettingCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]) {
        self.detailTextLabel.font = [UIFont systemFontOfSize:14];
        
        // 设置背景view
        self.backgroundView = [[UIImageView alloc] init];
        self.selectedBackgroundView = [[UIImageView alloc] init];
        self.backgroundColor = [UIColor clearColor];
    }
    return self;
}

- (UILabel *)labelView
{
    if (_labelView == nil) {
        UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, SCREENW, 40)];
        _labelView = label;
        _labelView.textAlignment = NSTextAlignmentCenter;
        _labelView.textColor = [UIColor whiteColor];
        _labelView.backgroundColor = [UIColor orangeColor];
        [self addSubview:_labelView];
    }
    return _labelView;
}
- (HBBadgeView *)badgeView
{
    if (_badgeView == nil) {
        _badgeView = [[HBBadgeView alloc] init];
    }
    return _badgeView;
}
- (UIImageView *)arrowView
{
    if (_arrowView == nil) {
        _arrowView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"common_icon_arrow"]];
    }
    return _arrowView;
}

- (UISwitch *)switchView
{
    if (_switchView == nil) {
        _switchView = [[UISwitch alloc] init];
        [_switchView addTarget:self action:@selector(switchChange:) forControlEvents:UIControlEventValueChanged];
        
    }
    return _switchView;
}

- (UIImageView *)cheakView
{
    if (_cheakView == nil) {
        _cheakView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"common_icon_checkmark"]];
    }
    return _cheakView;
}



+ (instancetype)cellWithTableView:(UITableView *)tableView
{
    static NSString *ID = @"cell";
    
    HBBasicSettingCell *cell = [tableView dequeueReusableCellWithIdentifier:ID];
    
    if (cell == nil) {
        cell = [[self alloc] initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:ID];
    }
    
    return cell;
    
}

- (void)setItem:(HBSettingItem *)item
{
    _item = item;
    
    // 设置数据
    [self setUpData];
    // 设置模型
    [self setUpRightView];
}

- (void)setUpData
{
    self.textLabel.text = _item.title;
    self.detailTextLabel.text = _item.subTitle;
    self.imageView.image = _item.image;
}

- (void)setUpRightView
{
    if ([_item isKindOfClass:[HBArrowItem class]]) { // 箭头
        self.accessoryView = self.arrowView;
    }else if ([_item isKindOfClass:[HBSwithItem class]]){ // 开关
        self.accessoryView = self.switchView;
        HBSwithItem *switchItem = (HBSwithItem *)_item;
        self.switchView.on = switchItem.on;
        
    }else if ([_item isKindOfClass:[HBCheckItem class]]){ // 打钩
        HBCheckItem *badgeItem = (HBCheckItem *)_item;
        if (badgeItem.cheak) {
            self.accessoryView = self.cheakView;
        }else{
            self.accessoryView = nil;
        }
    }else if ([_item isKindOfClass:[HBBadgeItem class]]){
        HBBadgeItem *badgeItem = (HBBadgeItem *)_item;
        HBBadgeView *badge = self.badgeView;
        badge.badgeValues = badgeItem.badgeValue;
        self.accessoryView = badge;
        
    }else if ([_item isKindOfClass:[HBLabelItem class]]){
        HBLabelItem *labelItem = (HBLabelItem *)_item;
        UILabel *label = self.labelView;
        label.text = labelItem.text;
        
    }else{ // 没有
        self.accessoryView = nil;
        [_labelView removeFromSuperview];
        _labelView = nil;
    }
    
}

- (void)setIndexPath:(NSIndexPath *)indexPath rowCount:(int)count
{
    UIImageView *bgView = (UIImageView *)self.backgroundView;
    UIImageView *selBgView = (UIImageView *)self.selectedBackgroundView;
    if (count == 1) { // 只有一行
        bgView.image = [UIImage resizableWithImageName:@"common_card_background"];
        selBgView.image = [UIImage resizableWithImageName:@"common_card_background_highlighted"];
        
    }else if(indexPath.row == 0){ // 顶部cell
        bgView.image = [UIImage resizableWithImageName:@"common_card_top_background"];
        selBgView.image = [UIImage resizableWithImageName:@"common_card_top_background_highlighted"];
        
    }else if (indexPath.row == count - 1){ // 底部
        bgView.image = [UIImage resizableWithImageName:@"common_card_bottom_background"];
        selBgView.image = [UIImage resizableWithImageName:@"common_card_bottom_background_highlighted"];
        
    }else{ // 中间
        bgView.image = [UIImage resizableWithImageName:@"common_card_middle_background"];
        selBgView.image = [UIImage resizableWithImageName:@"common_card_middle_background_highlighted"];
    }
    
}

- (void)switchChange:(UISwitch *)switchView
{
    
    HBSwithItem *switchItem = (HBSwithItem *)_item;
    switchItem.on = switchView.on;
    
}

@end
