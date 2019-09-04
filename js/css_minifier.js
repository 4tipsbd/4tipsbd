$(document).ready(function(e) {
	function setTheme() {
		theme = $.trim($("#themes").val());
		font_size = $.trim($("#font_size").val());
		
		editorAce1.setTheme("ace/theme/" + theme);
		$("#code1").css({"font-size" : (font_size + "px")});
		editorAce1.setOptions({
			enableBasicAutocompletion : true,
			enableSnippets : true,
			enableLiveAutocompletion : true
		});
		
		editorAce2.setTheme("ace/theme/" + theme);
		$("#code2").css({"font-size" : (font_size + "px")});
		editorAce2.setOptions({
			enableBasicAutocompletion : true,
			enableSnippets : true,
			enableLiveAutocompletion : true
		});
	}
	
	function show_msg(msg, type)
	{
		if(type == "info")
		{
			$("#msg").html('<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;' + msg).removeClass("text-danger")
			.addClass("text-info");
			$("#msg_modal").modal({backdrop : false});
		}else if(type == "error")
		{
			$("#msg").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;' + msg).removeClass("text-info")
			.addClass("text-danger");
			$("#msg_modal").modal({backdrop : false});
		}
	}
	
	ace.require("ace/ext/language_tools");
	var editorAce1 = ace.edit("code1");
	editorAce1.focus();
	editorAce1.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
    editorAce1.setTheme("ace/theme/chrome");
    editorAce1.getSession().setMode("ace/mode/css");
	
	var editorAce2 = ace.edit("code2");
	editorAce2.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
    editorAce2.setTheme("ace/theme/chrome");
    editorAce2.getSession().setMode("ace/mode/css");
	
	$("#clear").click(function(e) {
    	e.preventDefault();
		editorAce1.setValue("");
		editorAce2.setValue("");
    });
	
	$("#clear_code1,#clear_code2").click(function(e) {
        e.preventDefault();
		if($(this).is("#clear_code1"))
		{
			editorAce1.setValue("");
		}else
		{
			editorAce2.setValue("");
		}
    });
	
	$("#copy_data1").zclip({
		path : "/js/zclip/ZeroClipboard.swf",
		setHandCursor : true,
		copy : function() {
				return editorAce1.getValue();
			}
	});
	
	$("#copy_data2").zclip({
		path : "/js/zclip/ZeroClipboard.swf",
		setHandCursor : true,
		copy : function() {
				return editorAce2.getValue();
			}
	});
	
	$("#download").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce2.getValue());
		if(data == "")
		{
			show_msg("The result is empty!", "error");
			return false;
		}
		blob = new Blob(["" + data + ""], {
			type : "text/plain;charset=utf-8"
		});
		saveAs(blob, "data.txt");
    });
	
	$("#max_code1").click(function(e) {
        e.preventDefault();
		if(!$(this).is(".maximized"))
		{
			$(this).addClass("maximized");
			$("div.buttons_div,div.div_code2").hide();
			$("#code1").css({"width" : "100%"});
			$("div.div_code1").removeClass("col-md-6").addClass("col-md-12");
			$(this).find("span").removeClass("glyphicon-resize-full").addClass("glyphicon-resize-small");
			$("#zclip-ZeroClipboardMovie_1").css({"left" : ($("#copy_data1").position().left - 5) + "px", "top" : $("#copy_data1").position().top + "px"});
			$(this).attr("title", "minimize");
			editorAce1.resize();
			editorAce2.resize();
		}else
		{
			$(this).removeClass("maximized");
			$("div.div_code1").removeClass("col-md-12").addClass("col-md-6");
			$("#code1").css({"width" : "100%"});
			$("div.buttons_div,div.div_code1,div.div_code2").show();
			$(this).find("span").removeClass("glyphicon-resize-small").addClass("glyphicon-resize-full");
			$("#zclip-ZeroClipboardMovie_1").css({"left" : ($("#copy_data1").position().left - 5) + "px", "top" : $("#copy_data1").position().top + "px"});
			$(this).attr("title", "maximize");
			editorAce1.resize();
			editorAce2.resize();
		}
    });
	
	$("#max_code2").click(function(e) {
        e.preventDefault();
		if(!$(this).is(".maximized"))
		{
			$(this).addClass("maximized");
			$("div.buttons_div,div.div_code1").hide();
			$("#code2").css({"width" : "100%"});
			$("div.div_code2").removeClass("col-md-6").addClass("col-md-12");
			$(this).find("span").removeClass("glyphicon-resize-full").addClass("glyphicon-resize-small");
			$("#zclip-ZeroClipboardMovie_2").css({"left" : ($("#copy_data2").position().left - 5) + "px", "top" : $("#copy_data2").position().top + "px"});
			$(this).attr("title", "minimize");
			editorAce1.resize();
			editorAce2.resize();
		}else
		{
			$(this).removeClass("maximized");
			$("div.div_code2").removeClass("col-md-12").addClass("col-md-6");
			$("#code2").css({"width" : "100%"});
			$("div.buttons_div,div.div_code1,div.div_code2").show();
			$(this).find("span").removeClass("glyphicon-resize-small").addClass("glyphicon-resize-full");
			$("#zclip-ZeroClipboardMovie_2").css({"left" : ($("#copy_data2").position().left - 5) + "px", "top" : $("#copy_data2").position().top + "px"});
			$(this).attr("title", "maximize");
			editorAce1.resize();
			editorAce2.resize();
		}
    });
	
	$("#code1").resizable({
		handles: 's',
		alsoResize: "#code2",
    	resize: function(event, ui) {
    		editorAce1.resize();
			editorAce2.resize();
    	}
	});
	
	$("#code2").resizable({
		handles: 's',
		alsoResize: "#code1",
    	resize: function(event, ui) {
    		editorAce1.resize();
			editorAce2.resize();
    	}
	});
	
	$(window).resize(function(e) {
        $("#code1,#code2").css({"width" : "100%"});
    });
	
	$("#sample").click(function(e) {
        e.preventDefault();
		data = "css";
		editorAce1.getSession().setUseWorker(false);
		editorAce1.setValue("Please wait ...");
		$.ajax({
			type	: "POST",
			url		: "/get-sample.php",
			data	: {"data" : data},
			success : function(data)
			{
				editorAce1.getSession().setUseWorker(true);
				editorAce1.setValue(data);
				$("#minify_css").click();
			},
			error 	: function()
			{
				editorAce1.getSession().setUseWorker(true);
				editorAce1.setValue("Connection lost. Try again!");
			}
		});
    });
	
	$("#load_url").click(function(e) {
        e.preventDefault();
		$("#url_modal").modal({backdrop : false});
    });
	
	$("#load").click(function(e) {
        e.preventDefault();
		url = $.trim($("#url").val());
		if(url != "")
		{
			editorAce1.getSession().setUseWorker(false);
			editorAce1.setValue("Please wait while loading file from url.");
			$.ajax({
				type	: "POST",
				url		: "/get_data.php",
				dataType: "text",
				data	: {"url" : url},
				success : function(data)
				{
					if(data == "file_not_found")
					{
						editorAce1.setValue("Unable to load file from url!");
					}else
					{
						editorAce1.getSession().setUseWorker(true);
						editorAce1.setValue(data);
					}
				},
				error 	: function()
				{
					editorAce1.setValue("Unable to load file from url!");
				}
			});
		}
    });
	
	$("#browse").click(function(e) {
        e.preventDefault();
		$("#file").click();
    });
	
	function read_file(e)
	{
		f = e.target.files[0];
		if(f)
		{
			r = new FileReader();
			r.onload = function(e)
			{
				var contents = e.target.result;
				var file_name = f.name;
				editorAce1.getSession().setUseWorker(true);
				editorAce1.setValue(contents);
			}
			r.readAsText(f);
		}
		else
		{
			editorAce1.getSession().setUseWorker(false);
			editorAce1.setValue("Unable to load file!");
		}
	}
	
	$("#file").change(function(e) {
        e.preventDefault();
		read_file(e);
    });
	
	$("#beautify_css").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce1.getValue());
		if(data != "")
		{
			out = cssbeautify(data, {
				indent : '	',
				openbrace : 'end-of-line',
				autosemicolon : true
			});
			editorAce2.setValue(out);
		}
    });
	
	$("#minify_css").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce1.getValue());
		if(data != "")
		{
			editorAce2.setValue(vkbeautify.cssmin(data, false));
		}
    });
	
	themelist = ace.require("ace/ext/themelist");
	theme = "";
	$(themelist.themes).each(function(key, value) {
		theme += '<option value="' + value.name + '">' + value.caption + '</option>';
    });
	$("#themes").append(theme);
	
	$("#themes").val("chrome");
	$("#font_size").val("14");
	
	$("#themes,#font_size").change(function(e) {
        setTheme();
		editorAce1.focus();
    });
});