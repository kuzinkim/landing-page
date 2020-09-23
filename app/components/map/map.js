// $('#region, #city, #city_popup').selectize({
// });
$('#region, #city, #city_popup').select2({
    sorter: function(data) {
        /* Sort data using lowercase comparison */
        return data.sort(function (a, b) {
            a = a.text.toLowerCase();
            b = b.text.toLowerCase();
            if (a > b) {
                return 1;
            } else if (a < b) {
                return -1;
            }
            return 0;
        });
    }
});

var pageScript={
    map:null,
    dataLoaded:false,
    regions:[],
    cities:[],
    data:[],
    currentRegion:'',
    currentCity:'',
    loadData:function(){
        $.get('assets/data/data_new.json',function(data){
            pageScript.data=data;
            pageScript.createlists();
        },"json");
    },
    init:function(){
        this.loadData();
    },
    createlists:function(){
        $.each(pageScript.data,function(i,row){
            if(pageScript.regions.indexOf(row[0])==-1){
                pageScript.regions.push(row[0]);
            }
            if(typeof(pageScript.cities[row[0]])=="undefined"){
                pageScript.cities[row[0]]=[];
            }
            if(pageScript.cities[row[0]].indexOf(row[1])==-1){
                pageScript.cities[row[0]].push(row[1]);
            }
        });
        this.fillRegions();
    },
    fillRegions:function(){
        $selectRegion=$("select[name=\"region\"]");
        $selectRegion.html("");
        $.each(pageScript.regions,function(i,val){
            $selectRegion.append("<option value='"+val+"'>"+val+"</option>");
        });
        this.fillCity();
        $("select[name=\"region\"]").on('change',function(){
            pageScript.fillCity();
        });
        $("select[name=\"city\"]").on('change',function(){
            pageScript.changeFunc();
        });
    },
    fillCity:function(){
        $currentRegion=$("select[name=\"region\"]").val();
        $selectCity=$("select[name=\"city\"]");
        $selectCity.html("");
        $.each(pageScript.cities[$currentRegion],function(i,val){
            $selectCity.append("<option value='"+val+"'>"+val+"</option>");
        });
        this.changeFunc();
    },
    changeFunc:function(){
        pageScript.currentRegion=$("select[name=\"region\"]").val();
        pageScript.currentCity=$("select[name=\"city\"]").val();
        this.drawPlaceMarks();
    },
    placemarks:[],
    drawPlaceMarks:function(){
        pageScript.map.geoObjects.removeAll();
        pageScript.placemarks=[];
        pageScript.helperCoors=[];
        $.each(pageScript.data,function(i,row){
            if(row[0]!=pageScript.currentRegion)return true;
            if(row[1]!=pageScript.currentCity)return true;
            if(row[9]=='нет на карте')return true;
            row[9]=row[9].replace(" ",'');
            row[9]=row[9].replace(" ",'');
            row[9]=row[9].replace(" ",'');
            var coords=row[9].split(",");

            pageScript.helperCoors.push(coords);
            row[4]=row[4].replace(new RegExp('&qout;','ig'),'"');

            if(/Значком STIHL/i.test(row[8])){
                var MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                );
                var t=new ymaps.Placemark(coords, {
                    zIndex:3,
                    balloonContent: '<strong>'+row[4]+'</strong><br>'+row[3]+'<br>'+row[5]
                }, {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '../assets/images/icon.png',
                    iconImageSize: [35, 50],
                    iconImageOffset: [-17, -50],
                    iconContentOffset: [17, 25],
                    iconContentLayout: MyIconContentLayout
                });

            }else{
                var t=new ymaps.Placemark(coords, {
                    balloonContent: '<strong>'+row[4]+'</strong><br>'+row[3]+'<br>'+row[5]
                }, {
                    zIndex:2,
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                });
            }
            pageScript.placemarks.push( t );
            pageScript.map.geoObjects.add(t);

        });
        setTimeout(function(){
            pageScript.setZoom();
        },500);

    },
    helperCoors:[],
    setZoom:function(){
        pageScript.map.setCenter(pageScript.helperCoors[0],11);
    }
};

ymaps.ready(init);
    function init(){
        pageScript.map = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 7
        });
        pageScript.init();
        pageScript.map.behaviors.disable('scrollZoom');
    }