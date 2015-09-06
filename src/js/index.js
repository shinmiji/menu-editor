(function(global, $, undefined){
	'use strict';

	var $input = null; // input box
	var $menu = null; // menu 리스트 (ul)
	var $select_menu = null; // 선택한 메뉴 (li)
	var $add_text = null ; // 넣을 텍스트
	var $target = null; // 위로, 아래로 기능 시 사용되는 타겟

	init();
	initEvent();

	function init () {
		$menu = $('ul.menu');
		$input = $('input');
	}

	function initEvent () {
		$menu.on('click', 'li', function(){
			$select_menu = $(this);
			choiceMenu($select_menu);
		});
		$('.add').on('click', function(){
			addMenuEvent();
		});
		$('.update').on('click', function(){
			updateMenuEvent();
		});
		$('.remove').on('click', function(){
			removeMenuEvent();
		});
		$('.up').on('click', function(){
			upMenuEvent();
		});
		$('.down').on('click', function(){
			downMenuEvent();
		});
	}

	// choiceMenu
	function choiceMenu ($select_menu) {
		var $befor_select_menu = $select_menu.parent().children('li.choice');
		if ($befor_select_menu) {
			$befor_select_menu.removeClass('choice');
		}
		$select_menu.addClass('choice');
	}

	// addMenuEvent
	function addMenuEvent () {
		$add_text = $input.val();
		
		if (!$add_text) {
			return false;
		}
		$menu.append(template($add_text));
	}

	// updateMenuEvent
	function updateMenuEvent () {
		$add_text = $input.val();

		// 선택된 메뉴 없거나 값이 없음
		if (!$select_menu || !$add_text) {
			return false;
		}
		$select_menu.html(template($add_text)); 
	}
	// removeMenuEvent
	function removeMenuEvent () {
		// 선택된 메뉴 없음
		if (!$select_menu) {
			return false;
		}
		var $temp = null;
		if ($select_menu.next().length !== 0) {
			$temp = $select_menu.next() ;
		} else {
			$temp = $menu.children().eq(0);
		}
		$temp.addClass('choice');
		$select_menu.remove();
		$select_menu = $temp;
	}

	// upMenuEvent
	function upMenuEvent () {
		$target = $select_menu.prev();
		if(!$select_menu || !$target) {
			return false;
		}
		$select_menu.after($target);
	}
	
	// downMenuEvent
	function downMenuEvent () {
		$target = $select_menu.next();
		if(!$select_menu || !$target) {
			return false;
		}
		$target.after($select_menu);
	}

	// 메뉴 넣을 때 형태
	function template ($add_text) {
		return '<li>&nbsp;&nbsp;&rsaquo;&nbsp;&nbsp;'+$add_text+'</li>'; 
	}

})(window, window.jQuery);