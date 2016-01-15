//
//  HBLockVIewController.h
//  ACFunHB
//
//  Created by 何博 on 16/1/15.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HBMainController.h"
#import "SPLockScreen.h"

@interface HBLockVIewController : HBMainController
@property (nonatomic, retain)  UILabel *infoLabel;
@property (nonatomic,strong) SPLockScreen *spView;
@property (nonatomic) InfoStatus infoLabelStatus;
@property (nonatomic) int redirectFlag;
@end
