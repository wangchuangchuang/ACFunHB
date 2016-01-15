//
//  HomeViewController.m
//  ACFunHB
//
//  Created by 何博 on 16/1/6.
//  Copyright © 2016年 何博. All rights reserved.
//

#import "HomeViewController.h"

@interface HomeViewController ()<UIWebViewDelegate>

@property (nonatomic,weak) UIWebView *webview;

@end

@implementation HomeViewController


-(void)viewDidLoad
{
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor colorWithRed:0.400 green:0.800 blue:1.000 alpha:1.000];
    UIWebView *webView = [[UIWebView alloc] initWithFrame:self.view.bounds];
    _webview = webView;
    [self.view addSubview:_webview];
    _webview.delegate = self;
    
    NSString *path = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html"];
    NSString *eno = [path stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    NSURL *url = [NSURL URLWithString:eno];
    [_webview loadRequest:[NSURLRequest requestWithURL:url]];
}

-(void)webViewDidFinishLoad:(UIWebView *)webView
{
    [_webview.scrollView setMj_header:[MJRefreshNormalHeader headerWithRefreshingBlock:^{
    NSLog(@"123");
        
    }]];

    [_webview.scrollView setMj_footer:[MJRefreshAutoFooter footerWithRefreshingBlock:^{
        NSLog(@"321");
    }]];

}

-(BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{


    return YES;
}
@end
