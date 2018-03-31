/*!
 * comic-viewer.js
 * Copyright (c) 2018- tomalatte
 *
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 * Project home: http://tomalatte.com/
 * Version:  1.0.0
 */
var comic = {};

comic.param = {
	dir : null, 
	extension : null, 
	no : null, 
	loading : null, 
	count : null, 
	start : null, 
	rightPage : null, 
	leftPage : null, 
	rightButton : null, 
	leftButton : null, 
	info : null
};

comic.viewerResize = function() {
	// image size
	var windowHeight = $(window).height();
	var headerHeight = $('#header-comic').outerHeight(true);
	var footerHeight = $('#footer-comic').outerHeight(true);
	var contentsHeight = windowHeight - headerHeight - footerHeight;
	$('#comic-viewer').css('height', contentsHeight + 'px').css('margin-top', headerHeight + 'px');
	
	// move page button
	var moveButtonHeight = $('div#comic-viewer i.move-button').outerHeight(true);
	var buttonTop = contentsHeight / 2 - (moveButtonHeight / 2);
	$('div#comic-viewer i.move-button').css('top', buttonTop + 'px');
};

comic.getImgPath = function(dir, extension, no, count) {
	if (no < 1 || no > count) {
		return null;
	} else {
 		return imgPath = dir + '/' + no + '.' + extension;
	}
};

comic.isRightClickable = function() {
	return (this.param.no > 1);
};

comic.isLeftClickable = function() {
	return (this.param.no + 1 < this.param.count);
};

comic.setJustifyContent = function(target, value) {
	var val = value;
	var webkitVal = value;
	var msVal = value;
	if (value == 'flex-start') {
		msVal = 'start';
	}
	if (value == 'flex-end') {
		msVal = 'end';
	}
	target.css({'justify-content' : val, '-webkit-justify-content' : webkitVal, '-ms-flex-pack' : msVal});
};

comic.showImage = function() {
	
	this.param.info.find('#comic-page-no').html(this.param.no >= 1 ? this.param.no : 1);
	
	var loadingPath = this.param.loading;
	var rightPath = this.getImgPath(this.param.dir, this.param.extension, this.param.no, this.param.count);
	var leftPath = this.getImgPath(this.param.dir, this.param.extension, this.param.no + 1, this.param.count);
	
	if (rightPath == null) {
		this.param.rightPage.hide();
	} else {
		comic.setJustifyContent(this.param.rightPage.parent(), 'center');
		this.param.rightPage.attr('src', loadingPath);
		this.param.rightPage.attr('data-original', rightPath);
		this.param.rightPage.lazyload({load: function() {
			var self = $(this);
			comic.setJustifyContent(self.parent(), 'flex-start');
			return false;
		}});
	}

	if (leftPath == null) {
		this.param.leftPage.hide();
	} else {
		comic.setJustifyContent(this.param.leftPage.parent(), 'center');
		this.param.leftPage.attr('src', loadingPath);
		this.param.leftPage.attr('data-original', leftPath);
		this.param.leftPage.lazyload({load: function() {
			var self = $(this);
			comic.setJustifyContent(self.parent(), 'flex-end');
			return false;
		}});
	}
};

comic.showInfo = function() {
	this.param.info.show();
};

comic.hideInfo = function() {
	this.param.info.hide();
};

comic.mouseEnterRight = function() {
	comic.showInfo();
	if (comic.isRightClickable()) {
		this.param.rightPage.css('cursor', 'pointer');
		this.param.rightButton.show();
	}
};

comic.mouseEnterLeft = function() {
	comic.showInfo();
	if (comic.isLeftClickable()) {
		this.param.leftPage.css('cursor', 'pointer');
		this.param.leftButton.show();
	}
};

comic.mouseLeave = function() {
	comic.hideInfo();
	this.param.rightPage.css('cursor', 'default');
	this.param.rightButton.hide();
	this.param.leftPage.css('cursor', 'default');
	this.param.leftButton.hide();
};

/** PC init */
comic.pcInit = function() {
	
	// show
	var comicViewer = $('#comic-viewer');
	comicViewer.show();
	
	// set parameter
	comic.param.dir = $('#comic-dir-large').val();
	comic.param.extension = $('#comic-extension').val();
	comic.param.loading = $('#comic-loading').val();
	comic.param.count = parseInt($('#comic-page-count').val());
	comic.param.start = $('#comic-page-start').val();
	comic.param.rightPage = $('#comic-right-page');
	comic.param.leftPage = $('#comic-left-page');
	comic.param.rightButton = $('#comic-right-button');
	comic.param.leftButton = $('#comic-left-button');
	comic.param.info = $('#comic-info');
	comic.param.no = (comic.param.start == 'l') ? 0 : 1;
	
	$('#comic-info-title').html($('#comic-title').val());
	$('#comic-page-all').html(comic.param.count);

	// window resize
	comic.viewerResize();
	$(window).resize(function() {
		comic.viewerResize();
	});
	
	// show image
	comic.showImage();
	
	// icon event
	$('#comic-right-page, #comic-right-button').on('mouseenter', function() {
		comic.mouseEnterRight();
	});
	$('#comic-right-page, #comic-right-button').on('mouseleave', function() {
		comic.mouseLeave();
	});
	$('#comic-left-page, #comic-left-button').on('mouseenter', function() {
		comic.mouseEnterLeft();
	});
	$('#comic-left-page, #comic-left-button').on('mouseleave', function() {
		comic.mouseLeave();
	});
	
	// move page event
	$('#comic-right-page, #comic-right-button').on('click', function() {
		if (comic.isRightClickable()) {
			comic.param.no = comic.param.no - 2;
			comic.showImage();
			comic.mouseLeave();
			comic.mouseEnterRight();
		}
	});
	$('#comic-left-page, #comic-left-button').on('click', function() {
		if (comic.isLeftClickable()) {
			comic.param.no = comic.param.no + 2;
			comic.showImage();
			comic.mouseLeave();
			comic.mouseEnterLeft();
		}
	});
};

/** SP init */
comic.spInit = function(windowWidth) {
	
	// show
	var comicViewerSp = $('#comic-viewer-sp');
	comicViewerSp.show();
	
	// set parameter
	comic.param.dir = $('#comic-dir-small').val();
	comic.param.extension = $('#comic-extension').val();
	comic.param.loading = $('#comic-loading').val();
	comic.param.count = parseInt($('#comic-page-count').val());
	comic.param.start = $('#comic-page-start').val();

	// viewer
	var headerHeight = $('#header-comic').outerHeight(true);
	var footerHeight = $('#footer-comic').outerHeight(true);
	$('#comic-viewer-sp').css('margin-top', headerHeight + 'px').css('margin-bottom', footerHeight + 'px');

	// show image
	var width = windowWidth - 20;
	for (var i = 1; i <= comic.param.count; i++) {
		var imgPath = comic.getImgPath(comic.param.dir, comic.param.extension, i, comic.param.count);
		comicViewerSp.append('<img class="lazyload" src="' + comic.param.loading + '" data-original="' + imgPath + '" style="max-width:' + width + 'px;">');
	}
	$('img.lazyload').lazyload();
};

/** init */
$(function() {
	
	var windowWidth = $(window).width();
	if (windowWidth > 750) {
		comic.pcInit();
	} else {
		comic.spInit(windowWidth);
	}
});

