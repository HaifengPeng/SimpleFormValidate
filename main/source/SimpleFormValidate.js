/*
	SimpleFormValidate v1.0 beat
	author: pong1989@qq.com
*/
(function($) {
	$.fn.SimpleFormValidate = function (settings){
		settings = $.extend({
			password : {rule:/^([\w]){8,}$/, warning:'应为8位以上的数字或字母'},
			repeatpassword : {rule:/^([\w]){8,}$/, warning:'应为8位以上的数字或字母'},
			phone : {rule: /^((((13|15|18)[0-9]{1}))+\d{8})$/, warning:''},
			name : {rule: /^([0-9a-zA-Z]){6,}$/, warning: '应为6位以上的数字或字母'},
			email : {rule: /^[_\w-]+(\.[_\w-]+)*@([\w-])+(\.[\w-]+)*((\.[\w]{2,})|(\.[\w]{2,}\.[\w]{2,}))$/, wraning: '错误的电子邮件格式'},
			realname : {rule: /^[\u4e00-\u9fa5]{2,4}$/, warning: '应为2-4个中文字'},
			nickname : {rule: /^([a-zA-Z]|[\u4e00-\u9fa5]){2,16}$/, warning: '应为2-16个中文字或字母'},
			qq : {rule: /^[1-9]\d{6,12}$/, warning: '应为6-12位数字'}
		}, settings);

		/**
			显示验证的结果的信息
			type 字符串 消息类型 值可为 success 或 warning, 当需要隐藏时 设为 hide
			msg 字符串 消息内容
			name 字符串 obj的label
		*/	
		function show_form_msg (obj, setting) {
			setting = $.extend({
				type : "success",
				msg : "正确",
				name: "default"
			}, setting);

			var name_tmp = $(obj).closest("div.js-formline").find("label").text();
			if (setting.name == "default") {
				setting.name = name_tmp.replace("*", "").replace(":", "");
			}
			var new_class = setting.type == "hide" ? "" : "" + setting.type;
			$(obj).closest("div.js-formline").find(".validate-info")
			.removeClass("success warning")
			.addClass(new_class)
			.html(setting.name + setting.msg);
		}

		$(this).find("input").each(function(i) {
			var formElement = this;
			//编辑的过程中隐藏先前的提示
			$(this).on("keyup", function() {
				if ($(this).val() != "") {
					$(this).removeClass("vi-invalid vi-valid");
					show_form_msg(formElement, {type: "hide", msg: "", name: ""});
				}
			});
						
			$.each(settings, function(key, ruleSet) {
				if ($(formElement).hasClass(key)) {
					$(formElement).on("blur", function() {
						if ($(formElement).hasClass('no-require') && $(formElement).val() == "") {
							return ;
						}
						var reg = new RegExp(ruleSet.rule);
						if (!reg.test($(formElement).val())) {
							$(formElement).removeClass("vi-valid").addClass("vi-invalid");
							show_form_msg(formElement, {type: "warning", msg: ruleSet.warning});
						} else {
							$(formElement).removeClass("vi-invalid").addClass("vi-valid");
							show_form_msg(formElement);
						}
					});
				}
			});			
		});

		$(".repeatpassword").on("blur", function() {
			console.log($(this).val());
			if ($(".password").val() !== $(this).val()) {
				$(this).removeClass("vi-valid").addClass("vi-invalid");
				show_form_msg(this, {type: "warning", msg: "两次密码应该一致"});
			}
		});

		$(this).submit(function() {
			var validateRult = false;
			$(this).find("input").each(function(i) {
				var formElement = $(this);
				$.each(settings, function(key, ruleSet) {
					if ($(formElement).hasClass('no-require') && $(formElement).val() == "") {
						return true;
					}
					if (formElement.hasClass(key)) {
						var reg = new RegExp(ruleSet.rule);
						if (!reg.test(formElement.val())) {
							formElement.removeClass("vi-valid").addClass("vi-invalid");
							show_form_msg(formElement, {type: "warning", msg: ruleSet.warning});
							validateRult = true;
							return false;
						}
					}
				});
			});

			return  ! validateRult;
		});
	}
})(jQuery);