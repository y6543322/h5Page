function getEle(selector) {
    return document.querySelector(selector);
}
function getAllEle(selector) {
    return document.querySelectorAll(selector);
}
function getCls(element) {//获取样式class
    return element.className;
}
function setCls(element, cls) {//设置样式
    element.className = cls;
}
function addCls(element, cls) {//添加样式
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) === -1) {
        setCls(element, baseCls + ' ' + cls);
    }
}
function delCls(element, cls) {//删除样式
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) > -1) {
        setCls(element, baseCls.split(cls).join(' ').replace('/\s+/g', ' '));
    }
}
/*初始化样式*/
function setEleInit(screen) {
    var eleInit = setScreenAnimate[screen];
    for (var i = 0; i < eleInit.length; i++) {
        var ele = document.querySelector(eleInit[i]);
        var baseCls = getCls(ele);
        setCls(ele, baseCls + ' ' + baseCls + '_init');
    }
}
/*结束样式*/
function setEleDone(screen) {
    var eleInit = setScreenAnimate[screen];
    for (var i = 0; i < eleInit.length; i++) {
        var ele = document.querySelector(eleInit[i]);
        var baseCls = getCls(ele);
        setCls(ele, baseCls.replace('init', 'done'));
    }
}
var setScreenAnimate = {
    '.screen-1': ['.screen-1__heading', '.screen-1__subheading'],
    '.screen-2': ['.screen-2','.screen-2__heading', '.screen-2__subheading', '.screen-2__tip', '.screen-2__pic-2', '.screen-2__pic-3'],
    '.screen-3': ['.screen-3__heading', '.screen-3__subheading', '.screen-3__tip', '.screen-3__pic', '.screen-3__feature'],
    '.screen-4': ['.screen-4__heading', '.screen-4__subheading', '.screen-4__tip', '.screen-4__item-1', '.screen-4__item-2', '.screen-4__item-3', '.screen-4__item-4'],
    '.screen-5': ['.screen-5__heading', '.screen-5__subheading', '.screen-5__tip', '.screen-5__pic']
};
window.onload = function () {
    var k;
    var navItem = getAllEle('.header__nav-item'),
        outlineItem = getAllEle('.outline__item'),
        outline=getEle('.outline'),
        navTip = getEle('.header__nav-tip');
    for (k in setScreenAnimate) {
        if(k==='.screen-1') continue;
        setEleInit(k);
    }
    setTimeout(setEleDone('.screen-1'),100)
    /*切换active*/
    function switchNavActive(j) {
        for (var i = 0; i < navItem.length - 1; i++) {
            delCls(navItem[i], 'header__nav-item_active');
            delCls(outlineItem[i], 'outline__item_active');
        }
        addCls(navItem[j], 'header__nav-item_active');
        addCls(outlineItem[j], 'outline__item_active');
    }

    /*滚动屏幕播放动画   滚动到哪屏相应的导航和大纲处于active状态*/
    window.onscroll = function () {
        var scrTop = document.body.scrollTop;
        if(scrTop>60){
            addCls(outline,'outline_in');
        }
        else {
            setCls(outline,'outline');
        }
        //设置切换nav处于active
        if (scrTop >= 0) {
            setEleDone('.screen-1');
            switchNavActive(0);
            navTip.style.left=20+'px';
        }
        if (scrTop > 640 - 60) {
            setEleDone('.screen-2');
            switchNavActive(1);
            navTip.style.left=(20+96)+'px';
        }
        if (scrTop > 640 * 2 - 60) {
            setEleDone('.screen-3');
            switchNavActive(2);
            navTip.style.left=(20+96*2)+'px';
        }
        if (scrTop > 640 * 3 - 60) {
            setEleDone('.screen-4');
            switchNavActive(3);
            navTip.style.left=(20+96*3)+'px';
        }
        if (scrTop > 640 * 4 - 60) {
            setEleDone('.screen-5');
            switchNavActive(4);
            navTip.style.left=(20+96*4)+'px';
        }
    }
    /*点击跳转  难点 重点*/
    function jumpScreen(j, lib) {
        lib[j].onclick = function () {
            document.body.scrollTop = j * 640;
        }
    }
    for (var i = 0; i < navItem.length; i++) {
        jumpScreen(i, navItem);
    }
    for (var i = 0; i < outlineItem.length; i++) {
        jumpScreen(i, outlineItem);
    }
    /*滑动门特效*/
    function switchTip(j, lib) {
        lib[j].onmouseover = function () {
            navTip.style.left = (j * 96 + 20) + 'px';
        }
        lib[j].onmouseout = function () {
            for (var i = 0; i < lib.length - 1; i++) {
                if (getCls(lib[i]).indexOf('header__nav-item_active') > -1) {
                    navTip.style.left = (i * 96 + 20) + 'px';
                    break;
                }
            }
        }
    }
    for (var i = 0; i < navItem.length - 1; i++) {
        switchTip(i, navItem);
    }
    jumpScreen(0,getAllEle('.screen-6'));
};


