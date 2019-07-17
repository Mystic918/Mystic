$(document).ready(function(){
//start 
	var conf ={
		index:{
			slideTxtBox:function(){
				// 轮播图
				jQuery(".slideTxtBox").slide({mainCell:".bd ul",autoPlay:true}); 
			},
			gfwimg:function(obj,big,small,i){
				// 清风网模块
				$(obj).find("li").each(function(index){
					 
					if(index==i){
						$(this).mouseout(function(){
							$(this).find("div").stop().animate({bottom:big},300,"linear",function(){
								return;
							})
						});
					}else if(index>i){
							$(this).mouseout(function(){
								$(this).find("div").stop().animate({bottom:small},300,"linear",function(){
									return;
								})
							});
					}

					$(this).mouseover(function(){
						$(this).find("div").stop().animate({bottom:"0px"},300,"linear",function(){
							return;
						})
					});

				});
			},
			list1:function(tobj,bobj){
				$(tobj).find(".item").each(function(index1){
				$(this).mousemove(function(){
						$(tobj).find(".item").each(function(index2){
							$(this).removeClass("on");
					});
						$(this).addClass("on");

					$(bobj).find("ul").each(function(index3){
						$(this).hide();
						if(index1==index3){
							$(this).show();
						}
					});
							});	
					});
			},
			qfw:function(hand,deviation,objp,objn){
				var i =hand;
					$(objn).click(function(){
						if(i==deviation){return;} 
						$(".qfwimgbody").find("li").each(function(index){
							if(i==index){
								$(this).hide();
							}
							if(index==(i+1)){
								$(this).removeClass("small");
								$(this).addClass("big");
							}
						});	
					$(".qfwimgbody").find(".big").each(function(){
						$(this).find("div").css("bottom","-93px");
					});
					conf.index.gfwimg(".qfwimgbody","-93px","-43px",i+1);
					i=i+1;
					});

					$(objp).click(function(){
						if(i==0){return;} 
						$(".qfwimgbody").find("li").each(function(index){
							if((i-1)==index){
								$(this).show();
							}
							if(index==i){
								$(this).removeClass("big");
								$(this).addClass("small");
							}
						});	
                 $(".qfwimgbody").find(".small").each(function(){
						$(this).find("div").css("bottom","-43px");
					});
					conf.index.gfwimg(".qfwimgbody","-93px","-43px",i-1);
					i=i-1;
					});		
					return i;	
			},
			dataTime:function(obj){
				var data = new Date();
				var day = "";
				switch(data.getDay()){
					case 0:day="星期天";break;
					case 1:day="星期一";break;
					case 2:day="星期二";break;
					case 3:day="星期三";break;
					case 4:day="星期四";break;
					case 5:day="星期五";break;
					case 6:day="星期六";break;
				}

				var datat="";
				datat="今天："+data.getFullYear()+"年"+(data.getMonth()+1)+"月"+data.getDate()+"日  "+day;

				$(obj).text(datat);
			}
		}
	}

// 方法调用
// 滚动轮播图
conf.index.slideTxtBox();
// 清风网
conf.index.gfwimg(".qfwimgbody","-93px","-45px",0);
// 图片展示  复用模块
conf.index.gfwimg(".ztztbody2","-48px","-48px",0);
conf.index.list1(".listt1",".listb1");
conf.index.list1(".listt2",".listb2");
conf.index.list1(".listt3",".listb3");
conf.index.list1(".listt4",".listb4");
conf.index.list1(".listt5",".listb5");

// 指针  偏移数  上一张按钮  下一张按钮

conf.index.qfw(0,parseInt($(".qfwimgbody").find("li").length)-5,"#previmg","#nextimg");
// 首页时间
conf.index.dataTime("#datat");

// end
});