function addDropDown(dotInfo ){
    var parent = $("#dot_dropdown");
    for (var i = 0;i < dotInfo.length; i++ ){
        var item = dotInfo[i];
        var name = item["Name"];
        var id = item["ID"];
        var li = $("<li>").appendTo(parent );
        var check = $("<input>").attr("type", "radio").addClass("dot check")
                .attr("name", "dot-filter")
                .attr("id", id )
                .attr("data-val", id ).appendTo(li );
        if (i == 0 ){
            $(check).attr("checked", true );
        }
        $("<label>").attr("for", id).html(name ).appendTo(li);
        
    }
}

function displayCompanyMedal(data ){
    if (data.length == 0 ) return;
    data = data[0];
    var gold = data.Gold;
    var silver = data.Silver;
    var bronze = data.Bronze;

    $(".medal_img_item.gold .medal_count").html(gold );
    $(".medal_img_item.silver .medal_count").html(silver );
    $(".medal_img_item.bronze .medal_count").html(bronze );
}

function displayDotYLegend(dot_info){
    var parent = $("#dot-y-legend");
    for (var i = 0;i < dot_info.length; i++ ){
        var item = dot_info[i];
        var dot_name = item.Name;
        $("#dot-company-name").html(item.Company.display_value);
        $("#company_title_name").html(item.Company.display_value);
        var row = $("<div>").addClass("data-row").appendTo(parent);
        $("<div>").addClass("data-col")
            .html("<span class='dot-col'>" + dot_name + "</span>").appendTo(row );
    }
}

function displayAttackVectorInfo(data ){
    if (data.length == 0 ) return;
    var parent = $("#attack_medal_count");
    var legend_parent = $("#av-legend-container");
    var attack_comp_parent = $("#attack_comp_medal");

    for (var i = 0; i < data.length;i++ ){
        var item = data[i];
        $("<div>").addClass("data-col font-bold attack-" + item.ID ).html("0").appendTo(parent );

        var div = $("<div>").addClass("data-col img-col attack-legend-" + item.ID ).appendTo(legend_parent);
        $("<img>").attr("src", getDomain() + item.Inactive_Logo)
                    .attr("data-active", getDomain() + item.Active_Logo)
                    .addClass("legend-attack-img attack-img-" + item.ID).appendTo(div );
        $("<span>").addClass("av-legend").html(item.Vector_Name ).appendTo(div );

        // attack company vector
        $("<div>").addClass("data-col attack-comp-" + item.ID )
                .attr("data-medal", "none" )
                .html('<span class="circle graph-circle no-val"></span>')
                .appendTo(attack_comp_parent );
    }
}

function setAttackVectorModal(data ){
    if (data.length == 0 ) return;
    for (var i = 0; i < data.length; i++ ){
        var item = data[i];
        var attack_id = item.Reptile_Index_Theory_Attack_Vector.ID;
        var medal = item.Medal.toLowerCase();
        var img = "assets/imgs/comp_" + medal + ".png";
        $(".attack-comp-" + attack_id)
                .attr("data-medal", medal )
                .html("<img src='" + img + "' class='graph-company'>");

        $(".attack-" + attack_id).html("1");
    }
}

function displayAttackVectorValue(dot_info, attacks, attack_dot_value){
    var parent = $("#attack-dot-container");
    for (var i = 0; i < dot_info.length; i++ ){
        var dot = dot_info[i];
        var dot_id = dot.ID;
        var dot_div = $("<div>").addClass("data-row data-content dot-" + dot_id ).appendTo(parent );

        for (var j = 0; j < attacks.length; j++ ){
            var attack = attacks[j];
            var attack_id = attack.ID;
            $("<div>").addClass("data-col dot-attack-" + attack_id)
                    .html("<span class='circle graph-circle no-val'></span>").appendTo(dot_div );
        }
    }

    for (var i = 0; i < attack_dot_value.length; i++ ){
        var item = attack_dot_value[i];
        var dot_id = item.DOT.ID;
        var attack_id = item.Reptile_Index_Theory_Attack_Vector.ID;
        var medal = item.Medal.toLowerCase();
        $(".dot-" + dot_id + " .dot-attack-" + attack_id)
            .attr("data-attackmedal", medal )
            .html("<span class='circle graph-circle has-" + medal + "'></span>");
        
        $(".attack-img-" + attack_id).attr("src", $(".attack-img-" + attack_id).attr("data-active"));
    }
}

function displayRecommend(data, user_info ){   
    user_info = user_info[0];
    //var email = user_info.Email;
    for (var i = 0; i < data.length; i++){
        var url = getDomain() + "/bluewire/customer-portal#Page:Recommendation_Engine_S?loginUserEmail=" + user_email;
        var item = data[i];
        var complete = item.Complete;
        if (complete == "false"){
            var dot_id = item.DOT.ID;
            var attack_id = item.Reptile_Index_Theory_Attack_Vector.ID;
            //var attack_medal = $(".attack-comp-" + attack_id ).attr("data-medal");

            url = url + "&selectedDOTid=" + dot_id;
            url = url + "&selectedAttackVectorID=" + attack_id;
            var dot_div = $(".dot-" + dot_id + " .dot-attack-" + attack_id);
            var attack_medal = $(dot_div).attr("data-attackmedal");
            $(dot_div).html("");

            if (attack_medal && attack_medal != "" ){
                $("<a>").attr("href", "javascript:;")
                    .attr("data-href", url )
                    .on("click", function(e){
                        var url = $(this).attr("data-href");
                        window.open(url, "_parent");
                    })
                    .html("<span class='circle rec-circle rec-" + attack_medal + "'></span>")
                    .appendTo(dot_div );
            }else{
                $("<a>").attr("href", "javascript:;")
                    .attr("data-href", url )
                    .on("click", function(e){
                        var url = $(this).attr("data-href");
                        window.open(url, "_parent");
                    })
                    .html("<span class='circle rec-circle rec-none'></span>")
                    .appendTo(dot_div );
            }
            //.html("<a href='" + url + "'><span class='circle rec-circle rec-" + attack_medal + "'></span></a>");
        }
    }
}

function getDomain(){
    var loc = window.location.href;
    var a = loc.split("?")[1].split("=")[1].replace("%3A%2F%2F", "://");
    return a;
}