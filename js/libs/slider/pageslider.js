/**
 * Created by 轶卓 on 14-4-24.
 * 自制专场动画控制
 */

function PageSlider(container) {

    var container = container,
        currentPage;
        window.stateHistory = [];

    // 根据hash内容，判断当前移动方向
    this.slidePage = function(page) {

        var l = stateHistory.length,
            state = window.location.hash;

        if (l === 0) {
            stateHistory.push(state);
            this.slidePageFrom(page);
            return;
        }
        if (state === stateHistory[l-2]) {
            stateHistory.pop();
            this.slidePageFrom(page, 'left');
        } else {
            stateHistory.push(state);
            this.slidePageFrom(page, 'right');
        }

    };

    this.classes = ["page", "center", "left", "right", "transition"];

    this.removeAllClass = function(page){
        for(var i= 0, len = this.classes.length; i < len; i++) {
            if(page.hasClass(this.classes[i])){
                page.removeClass(this.classes[i]);
            }
        }
    }
    // 此函数可手动指定方向
    this.slidePageFrom = function(page, from) {

        container.append(page);

        if (!currentPage || !from) {
            //page.attr("class", "page center");
            this.removeAllClass(page);
            page.addClass("page center");
            currentPage = page;
            return;
        }

        // 动画开始前定位页面
        this.removeAllClass(page);
        page.addClass("page " + from);

        currentPage.one('webkitTransitionEnd', function(e) {
            $(e.target).remove();
        });

        //小米经测试不会触发webkitTransitionEnd....可恶的安卓，比ie还可恶......
        setTimeout(function(){
            $('.right').remove();
            $('.left').remove();
        },300);

        // 强制 reflow.
        container[0].offsetWidth;

        this.removeAllClass(page);
        page.addClass("page transition center");
        this.removeAllClass(currentPage);
        currentPage.addClass("page transition " + (from === "left" ? "right" : "left"));
        currentPage = page;
    };

}