;(function(win, $, undefined){
	var win = window;
	var doc = document;

	var INDEX = (function(){
		var 
			$input = $('input[name="txt"]'),
			$btnPlay = $('.btn_play'),
			audioPlay = doc.getElementById('audioPlay');

		return {
			init: function(){
				// rem
				this.rem();

				// 事件绑定
				this.bindEvent();

				
				audioPlay.play();
				audioPlay.pause();
				audioPlay.currentTime = 0;
			},

			// rem
			rem: function(){
				var rootNode = doc.documentElement, 
					clientWidth = rootNode.clientWidth;

				function computedRootSize(){
					var _fz = clientWidth * 20 / 375;
						_fz = _fz >= 40 ? 40 : _fz;

					rootNode.style.fontSize = _fz + 'px';
				}
				computedRootSize();

				win.onresize = function(){
					clientWidth = rootNode.clientWidth;
					computedRootSize();
				}
			},

			// 事件绑定
			bindEvent: function(){
				// 播放按钮
				$btnPlay.on('click', function(e){
					if( !$input.val() ){
						alert('请输入文字！');
						$input.focus();
						return;
					}

					// 请求接口
					$.ajax({
						url: 'audio.php',
						type: 'GET',
						dataType: 'json',
						data: {
							txt: $input.val(),
							time: new Date().getTime()
						},
						success: function(d){
							// alert(9);
							console.log(d);

							if( d && d.status && d.status == 200 ){
								audioPlay.setAttribute('src', 'data:audio/mpeg;base64,' + d.data);
								audioPlay.pause();
								audioPlay.currentTime = 0;
								audioPlay.play();
							} else {
								d.msg && alert(d.msg);
							}
						}
					});					
				});
			}
		}
	})();

	$(function(){
		INDEX.init();
	});

})(this, jQuery);