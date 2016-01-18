# ACFunHB
#<在任何界面,屏幕自动进入屏保或者手势解锁 第一次开启需要点击事件,点击事件过后,在设定的息屏时间不触碰屏幕后,屏幕自动进入手势解码/> 
#define AUTO_LOCK_SCREEN 5 设置息屏时间
#代码写的很凌乱,主要是自定义的HBWindow 里从写拦截触摸事件的方法 还有自己个人设定界面的封装HBSettingController,
#继承HBSettingController之后可以容易设定个人界面 第一次写,希望大家鼓励
#如果下载编译遇到linker command failed with exit code 1 报错找到Build settings->Linking->Other Linker Flags，继续添加属性-all_load 
