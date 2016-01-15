//
//  ChannelController.m
//  ACFunHB
//
//  Created by 何博 on 16/1/7.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "ChannelController.h"
#import "firstController.h"
#import "SecondController.h"
#import "ThirdController.h"

@interface ChannelController ()<UIScrollViewDelegate>
{
    UISegmentedControl *_segmentControl;

    UIScrollView *_scrollView;

}

@end

@implementation ChannelController
-(void)viewDidLoad
{
    self.view.backgroundColor = [UIColor yellowColor];
    
    [self configChildControllers];
    
    [self configUI];

}


- (void)configChildControllers
{
    firstController * fvc =[[firstController alloc] init];
    fvc.title = @"A股";
    [self addChildViewController:fvc];
 
    SecondController * svc = [[SecondController alloc] init];
    svc.title = @"港美股";
    [self addChildViewController:svc];
    
    ThirdController * tvc = [[ThirdController alloc] init];
    tvc.title = @"模拟炒股";
    [self addChildViewController:tvc];
    
}


- (void)configUI
{
    if (!_segmentControl) {
        NSArray *segmentArray = @[@"A股",@"港美股",@"模拟炒股"];
        
        _segmentControl = [[UISegmentedControl alloc] initWithItems:segmentArray];
        
        _segmentControl.frame = CGRectMake(0, 50, 200, 25);
        
        self.navigationItem.titleView = _segmentControl;
        
        [_segmentControl addTarget:self action:@selector(segmentedSelectedChange:) forControlEvents:UIControlEventValueChanged];
        
        _segmentControl.backgroundColor = [UIColor clearColor];
        
        _segmentControl.layer.borderColor = [UIColor whiteColor].CGColor;
        
        _segmentControl.layer.borderWidth = 0.9;
        
        _segmentControl.layer.masksToBounds = YES;
        
        _segmentControl.layer.cornerRadius = 12.5;
        
        _segmentControl.selectedSegmentIndex = 0;
    }
    
    if (!_scrollView) {
        
        _scrollView = [[UIScrollView alloc] initWithFrame:CGRectMake(0, 0, SCREENW, SCREENH)];
        
        [self.view addSubview:_scrollView];
        
        _scrollView.contentSize = CGSizeMake(self.childViewControllers.count * SCREENW, 0);
        
        _scrollView.pagingEnabled = YES;
        
        _scrollView.delegate = self;
        
        CGFloat vcX= 0;
        
        CGFloat vcY = 0;
        
        CGFloat vcWidth = SCREENW;
        
        CGFloat vcHeignt = SCREENH;
        
        for (int i = 0; i < self.childViewControllers.count; i++) {
            
            UIViewController *vc = self.childViewControllers[i];
            
            vcX = i *SCREENW;
            
            vc.view.frame = CGRectMake(vcX, vcY, vcWidth, vcHeignt);
            
            
            
            [_scrollView addSubview:vc.view];
            
        }
        
    }
    
}


#pragma segmentControl点击事件
- (void)segmentedSelectedChange:(UISegmentedControl *)segmentControl
{
    switch (segmentControl.selectedSegmentIndex) {
        case 0:
            [_scrollView setContentOffset:CGPointMake(0, 0) animated:YES];
            break;
            
        case 1:
            [_scrollView setContentOffset:CGPointMake(SCREENW, 0) animated:YES];
            break;
            
        case 2:
            [_scrollView setContentOffset:CGPointMake(SCREENW * 2, 0) animated:YES];
            break;
    }

}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    if (scrollView.contentOffset.x == 0)
    {
        _segmentControl.selectedSegmentIndex = 0;
    }
    else if (scrollView.contentOffset.x == SCREENW)
    {
        _segmentControl.selectedSegmentIndex = 1;
    }
    else if (scrollView.contentOffset.x == SCREENW*2)
    {
        _segmentControl.selectedSegmentIndex = 2;
    }
    

}

@end
