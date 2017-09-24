$(function(){
	
	//切换城市
	(function(){
		var aCity = $("#head .city a");
		aCity.each(function(i){
			$(this).click(function(){
				aCity.attr('class','');
				$(this).attr('class','active');
			});
		});
	})();
	
	//搜索切换
	(function(){
		var aLi = $("#search .menu li");
		var searchTxt = $(".form").find(".searchTxt");
		var arrText = [
			'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣券',
			'例如：东莞出事了，大老虎是谁？',
			'例如：北京初春降雪，天气变幻莫测'
		];
		var index = 0;
		searchTxt.val(arrText[index]);
		aLi.each(function(i){
			$(this).click(function(){
				index = i;
				aLi.attr('class','gradient');
				$(this).attr('class','active');
				searchTxt.val(arrText[index]);
			});
		});
		
		searchTxt.focus(function(){
			if($(this).val()==arrText[index]){
				$(this).val("");
			}
		});
	
		searchTxt.blur(function(){
			if($(this).val()==''){
				$(this).val(arrText[index]);
			}
		});
	
	})();

	//文字自动更换
	(function(){
		var oDiv = $(".update");
		var oUl = $(".updata ul");
		var txtUp = $("#txtUp");
		var txtDown = $("#txtDown");
		var str = "";
		var iHeight = 0;
		var index = 0;
		var timer = null;
		var arrData = [
			{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
			{ 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
		];
		
		for(var i=0;i<arrData.length;i++){
			str += "<li><strong>"+arrData[i].name+"</strong><span>"+arrData[i].time+"分钟前</span>写了一篇文章:<a href='"+arrData[i].url+"'>"+arrData[i].title+"</a></li>"
		}
		oUl.html(str);
		iHeight = oUl.find("li").height();
		
		txtUp.click(function(){
			autoPlay()
			doMove(-1);
		});
		txtDown.click(function(){
			autoPlay();
			doMove(1);
		});
		
		autoPlay();
		function autoPlay(){
			clearInterval(timer);
			timer = setInterval(function(){
				doMove(-1);
			},1500);
		}
		
		oDiv.hover(function(){
			clearInterval(timer);
		},function(){
			autoPlay(-1);
		});
		
		function doMove(dir){
			index += dir;
			if(index>0){
				index=-(arrData.length-1);
			}
			if(index<=-arrData.length){
				index = 0;
			}
			oUl.stop().animate({"top":iHeight*index},2000,"elasticOut");
		}
		
	})();

	//选项卡切换
	(function(){
		function fnTab(oNav,aCon,event){
			var opts = oNav.children();
			aCon.hide().eq(0).show();
			opts.each(function(i){
				opts.css("cursor","pointer");
				$(this).on(event,function(){
					opts.removeClass("active").addClass("gradient");
					$(this).removeClass("gradient").addClass("active");
					opts.find("a").attr("class","triangle_down_grey");
					$(this).find("a").attr("class","triangle_down_red");
					aCon.hide().eq(i).show();
				});
			});
		}
		fnTab($(".hotShopNav"),$(".hotShopNavCon"),"click");
		fnTab($(".subwayNav"),$(".subCon"),"click");
		fnTab($(".knownNav"),$(".knownCon"),"mouseover");
		fnTab($(".couponsNav"),$(".couponsCon"),"mouseover");
	})();

	//焦点图自动播放
	(function(){
		var oDiv = $(".pic_tab");
		var bigLi = oDiv.find("ul li");
		var smallLi = oDiv.find("ol li");
		var oP = oDiv.find("p");
		var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
		var index = 0;
		var timer = null;
		
		picTab();
		function picTab(){
			smallLi.removeClass('active');
			smallLi.eq(index).addClass('active');
			bigLi.fadeOut().css("zIndex",1);
			bigLi.eq(index).fadeIn(1500).css("zIndex",2);
			oP.text(arr[index]);
		}
		
		smallLi.each(function(i){
			$(this).click(function(){
				index = i;
				picTab();
				autoPlay();
			});
		});
		oDiv.hover(function(){
			clearInterval(timer);
		},autoPlay);
		
		autoPlay();
		function autoPlay(){
			clearInterval(timer);
			timer = setInterval(function(){
				index++;
				if(index == arr.length){
					index = 0;
				}
				picTab();
			},2000);
		}
		
	})();
	
	//日历高亮显示
	(function(){
		$(".calender .schedule").hover(function(){
			var left = $(this).parent().position().left+$(this).width()+10;
			var top = $(this).parent().position().top-$(".calender .detail").outerHeight()/2+$(this).height()/2;
	//		console.log(left);console.log(top);
			$(".calender .detail").show().css({"left":left,"top":top}).find("img").attr("src",$(this).attr("src"));
			var today = $(".calender th");
			$(".calender .detail").find("h3 span").text(today.eq($(this).parent().index()%7).text());
		},function(){
			$(".calender .detail").hide();
		});
	})();

	//BBS高亮显示
	(function(){
		$(".bbs ol").find("li").mouseover(function(){
			$(".bbs ol li").removeClass("active").eq($(this).index()).addClass("active");
		});
	})();

	//红人烧客遮罩层
	(function(){
		var arr = [
			'',
			'用户1<br />人气1',
			'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
			'用户3<br />人气3',
			'用户4<br />人气4',
			'用户5<br />人气5',
			'用户6<br />人气6',
			'用户7<br />人气7',
			'用户8<br />人气8',
			'用户9<br />人气9',
			'用户10<br />人气10'
		];
		$(".hot_area li:gt(0)").each(function(i){
			$(this).mouseover(function(){
				$(".hot_area li").find("p").remove();
				var oP = $("<p>");
				oP.css({"width":$(this).width()-12,"height":$(this).height()-12});
				oP.html(arr[$(this).index()]);
				$(this).prepend(oP);
			});
		});
	})();

});
