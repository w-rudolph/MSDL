(function ($){
  $.fn.extend({
     MSDL: function(options){
		 //settings
		 var _defaults = {
			 width: '150',
			 fieldName: 'msdl-data',
			 displayNum: 8,
			 listHeight: '22', // height for each list
			 data: ['item1','item2','item3','item4','item5','item6'],
			 translate:{
				 SA: 'All',
				 OK: 'ok',
				 placeholder: ''
			 },
			 classicModel: true
		 };
		 options = $.extend(_defaults, options);
         if(options.data.length < options.displayNum)  options.displayNum = options.data.length;
		 //layout
		 var _layoutinit = function(obj){
			var $this = $(obj),
			    $ipt = $('<input type="text" readonly name="'+options.fieldName+'" />'),
			    $container = $('<div class="msdl-container"></div>'),
				$top = $('<div class="msdl-top"></div>'),
			    $content = $('<div class="msdl-content"></div>'),
			    count = options.data.length,
			    HeightOfLists = ( parseInt(count * options.listHeight) > parseInt(options.displayNum*options.listHeight) ) ? options.displayNum*options.listHeight : count * options.listHeight;
			
			
		    $ipt.width(options.width).attr('placeholder', options.translate.placeholder);
			$ipt.height(options.width.height);
			$content.height(HeightOfLists);
			
			for(var i = 0; i < count; i++){
			   var $list = '';
			    
			   $list = $('<div class="msdl-item msdl-item-'+(i+1)+'" ><input type="checkbox" class="msdl-item-box" value='+options.data[i]+' /><span>'+options.data[i]+'</span><br></div>'); 
			   if(i == 0) $list.addClass('msdl-item-first');
			   if(i == count-1)  $list.addClass('msdl-item-last');
			   $list.appendTo($content);
			}
			
			$ipt.appendTo($this);
			$top.height(options.listHeight);
			$container.append($top).append($content).appendTo($this);
			
			var $all, $btn;
			if(options.classicModel){
				$all = $('<input type="checkbox" class="msdl-selectAll"/><span>'+options.translate.SA+'</span>');
				$btn = $('<span class="msdl-ok">'+options.translate.OK+'</span>');
			}
            $all.appendTo($top);
            $btn.appendTo($top);
			
			$this.addClass('msdl-select');
			$ipt.addClass('msdl-input');
		 };
		 
		 //effect
		 var _action = function(obj){
			var $this = $(obj),
			    $ipt = $('.msdl-input',  $this),
			    $container = $('.msdl-container',  $this),
			    $top = $('.msdl-top',  $this),
				$ok = $('.msdl-ok',  $this),
				$content = $('.msdl-top',  $this),
				$boxes = $('.msdl-item-box',  $this),
				$items = $('.msdl-item', $this),
				$all = $('.msdl-selectAll',  $this);
				
		    $container.css({'min-width': $ipt.width()+'px', 'position': 'absolute', 'top': $ipt.outerHeight()+'px'});
		    $container.addClass('msdl-hidden');
		
			$ipt.on('click' , function(){$container.toggleClass('msdl-hidden')});
			$ok.on('click' , function(){$container.addClass('msdl-hidden')});
			$content.css('height', $('.msdl-item', $this).outerHeight*options.displayNum);
				// select All
			$all.on('click', function(){
					var _datas = [];
					if($(this).is(':checked')) $boxes.each(function(){$(this).parent().addClass('msdl-selected');$(this)[0].checked = 'checked';_datas.push($(this).val())})
					else $boxes.each(function(){$(this).parent().removeClass('msdl-selected');$(this)[0].checked = ''; _datas = [];});
					$ipt.val(_datas.join(';')); 	 
			});
			//each list click
		    $items.on('click', function(){
					var $_boxes = $('.msdl-item-box:checked',  $this),
					   _datas = [],
					   $_item = $(this).find('.msdl-item-box');
					if($_item.is(':checked')){$(this).addClass('msdl-selected');$_item[0].checked = 'checked'}
					else {$(this).removeClass('msdl-selected');$_item[0].checked = ''}
					$_boxes.each(function(){_datas.push($(this).val())});
					$all[0].checked = ($_boxes.length === options.data.length) ? 'checked' : '';
				    $ipt.val(_datas.join(';')); 	
			});		
				 	
		 }; 
		 //do init
		 return this.each(function(){
			_layoutinit(this);
			_action(this);
		 });
	 }
  });
})(jQuery)