//
//  ProfleCell.m
//  ACFunHB
//
//  Created by 何博 on 16/1/9.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "ProfleCell.h"

@implementation ProfleCell
- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]) {
        self.detailTextLabel.font = [UIFont systemFontOfSize:12];
    }
    return self;
}
- (void)layoutSubviews
{
    [super layoutSubviews];
    
    self.detailTextLabel.x = CGRectGetMaxX(self.textLabel.frame) + 5;
}

@end
