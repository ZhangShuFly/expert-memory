
## UI优化

### 相关概念

**16ms**

Android 设备页面刷新的频率为60帧/S,大概相当于16毫秒每帧，就是说如果一次渲染超过16ms就会让用户感觉到卡顿。

Android开发过程中，有一个比较重要的错误：ANR，Application Not Response.当我们的页面超过5s没有响应，通知超过10s没有返回系统就会报ANR。

**过度绘制**

过度绘制是指同一像素在同一次刷新中被重复多次绘制。浪费CPU和GPU资源，延长页面的渲染时间。


### 工具

**发现过度绘制**

通过手机里的开发者选项，打开 'Show GPU Overdraw'.即可观察过度绘制。

    蓝色： 意味着overdraw 1倍。像素绘制了两次。大片的蓝色还是可以接受的（若整个窗口是蓝色的，可以摆脱一层）。
    绿色： 意味着overdraw 2倍。像素绘制了三次。中等大小的绿色区域是可以接受的但你应该尝试优化、减少它们。
    淡红： 意味着overdraw 3倍。像素绘制了四次，小范围可以接受。
    深红： 意味着overdraw 4倍。像素绘制了五次或者更多。这是错误的，要修复它们。

**使用 Hierarchy Viewer 详细定位**

打开 Hierarchy Viewer，依次找到：Android Studio -> Tools -> Android -> Android Device Monitor

### 平时编码和设计注意事项

    1尽量多使用 ConstraintLayout、RelativeLayout、LinearLayout
    >>>·尽量使用 ConstraintLayout
    >>>·在布局层级相同的情况下，使用 LinearLayout 代替 RelativeLayout,因为RelativeLayout会让子View调用2次onMeasure,LinearLayout 在有weight时，才会让子View调用2次onMeasure
    >>>·在布局复杂或层级过深时，使用 RelativeLayout 代替 LinearLayout 使界面层级扁平化
    >>>·尽量避免RelativeLayout嵌套RelativeLayout，恶性循环。
    2将可复用的组件抽取出来并通过 include 标签使用
    3使用 merge 减少布局的嵌套层级
    4使用 ViewStub 加载一些不常用的布局
    5尽可能少用 layout_weight
    6去除不必要的背景，减少过度绘制
    >>>·有多层背景重叠的，保留最上层。或者可以统一的使用一个大的背景
    >>>·对于 Selector 当背景的，可以将 normal 状态的 color 设置为 @android:color/transparent
    7 利用高级View的特殊属性
    >>>使用TextView的drawableLeft(Right,Top,Bottom)
    >>>利用Android:lineSpacingExtra  和 \n  使一个textview显示出多个textview的效果
    >>>使用LinearLayout自带的分割线实现。android:divider="@drawable/divider"；android:showDividers="middle"。其中divider.xml是分隔线样式。就是一个shape，showDividers 是分隔线的显示位置
    >>>使用Space控件（4.0新增的），Space控件在布局中只占位置，而不去绘制渲染。比如组件中的间隙用Space控件填充比用其它控件填充可以提高效率


**集成BlockCanary**