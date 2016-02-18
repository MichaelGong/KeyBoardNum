(function(global,factory){
    if(typeof define === 'function' && define.amd){
        define(function(){
            return factory();
        });
    }else if(typeof module !== 'undefined' && module.exports){
        module.exports = factory();
    }else{
        global.KeyBoardNum = factory(global);
    }
}(typeof window !== 'undefined' ? window : this,function(win){
    var idTag = 0;
    var keyBoardNum = function(numberId,option){
        var me = this,insertId = 'keyBoardNum'+(++idTag),payId = 'keyBoardPay'+(idTag);
        var defaultOpt = {
            itemHeight:60, //一个数字键的高度
            decimal:2, //小数点长度
            integer:4, //整数部分长度
            fontSize:'30px', //数字字体大小
            color:'#333', //数字的颜色
            bgColor:'#fff', //背景颜色
            borderColor:'#E5E5E5', //边框颜色
            activeColor:'#ebebeb', //键盘被点击时的背景颜色
            btnText:'确认', //按钮显示的文字
            btnColor:'#fff', //按钮文字的颜色
            btnFontSize:'70px', //按钮文字大小
            btnBgColor:'#bcbcbc', //按钮的背景颜色
            btnActiveBgColor:'#fe9b20', //按钮激活的背景颜色
            btnTouchBgColor:'#e27d00', //按钮激活后被点击时的背景颜色
            btnCallBack:null, //按钮点击后的回调
            delImg:delImgBase, //删除按钮图片
            hideImg:hideImgBase, //隐藏按钮图片
        }
        for(var item in defaultOpt){
            if(option[item]){
                defaultOpt[item] = option[item];
            }
        }
        this.option = defaultOpt;
        var style = '.keyboardNum,.keyboardNum *{-webkit-tap-highlight-color: transparent;-webkit-focus-ring-color: transparent;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;margin: 0;padding: 0;border: 0;font-style: normal;}body {font-family: Hiragino Sans GB, Heiti SC, "微软雅黑", Verdana, sans-serif, SimHei, "黑体";}.keyboardNum.show {-webkit-transform: translateY(0);-moz-transform: translateY(0);-ms-transform: translateY(0);-o-transform: translateY(0);transform: translateY(0);}.keyboardNum:after{content: "";height: 0;visibility: hidden;display: block;clear: both;}.keyboardNum.show-trans {-webkit-transition: all linear 0.2s;-moz-transition: all linear 0.2s;-ms-transition: all linear 0.2s;-o-transition: all linear 0.2s;transition: all linear 0.2s;}.keyboardNum {width: 100%;height: '+me.option.itemHeight*4+'px;position: fixed;bottom: 0;left:0;background-color: '+me.option.bgColor+';z-index: 999;color: '+me.option.color+';font-size: '+me.option.fontSize+';line-height:'+me.option.itemHeight+'px;-webkit-transform: translateY(100%);-moz-transform: translateY(100%);-ms-transform: translateY(100%);-o-transform: translateY(100%);transform: translateY(100%);-webkit-transition: all linear 0.2s;-moz-transition: all linear 0.2s;-ms-transition: all linear 0.2s;-o-transition: all linear 0.2s;transition: all linear 0.2s;}.keyboardNum i {display: block;width: 25%;height: 25%;line-height: 60px;font-size: inherit;color: inherit;text-align: center;border: 2px solid '+me.option.borderColor+';border-left: none;border-bottom: none;transition: all 0.1s;float: left;position: relative;}.keyboardNum i:nth-child(1),.keyboardNum i:nth-child(6),.keyboardNum i:nth-child(9),.keyboardNum i:nth-child(12) {border-left: 2px solid transparent;}.keyboardNum i >img {height: 25px;position: absolute;top: 0;left: 0;bottom: 0;right: 0;margin: auto;}.keyboardNum i.keyBoardPay {float: right;height: '+me.option.itemHeight*3+'px;line-height: 1.2;background-color: '+me.option.btnBgColor+';color: '+me.option.btnColor+';font-size: 25px;padding: 0px 20px;border: none;display: -webkit-box;box-align: center;-webkit-box-align: center;box-pack: center;-webkit-box-pack: center;}.keyboardNum i.no-right {border-right: none;}.keyboardNum i.hover,.keyboardNum i:active {background-color: '+me.option.activeColor+';}.keyboardNum i.keyBoardPay.active {background-color: '+me.option.btnActiveBgColor+';}.keyboardNum i.keyBoardPay.active.hover,.keyboardNum i.keyBoardPay.active:active {background-color: '+me.option.btnTouchBgColor+';}'

        $('head').append('<style type="text/css">'+style+'</style>');

        var html = '<div id="'+insertId+'" class="keyboardNum">'+
                    '    <i data-num="1">1</i>'+
                    '    <i data-num="2">2</i>'+
                    '    <i data-num="3">3</i>'+
                    '    <i data-num="del" style="border-right:none;">'+
                    '       <img src="'+me.option.delImg+'">'+
                    '    </i>'+
                    '    <i data-num="callback" id="'+payId+'" class="keyBoardPay">'+me.option.btnText+'</i>'+
                    '    <i data-num="4">4</i>'+
                    '    <i data-num="5">5</i>'+
                    '    <i data-num="6" class="no-right">6</i>'+
                    '    <i data-num="7">7</i>'+
                    '    <i data-num="8">8</i>'+
                    '    <i data-num="9" class="no-right">9</i>'+
                    '    <i data-num="hide">'+
                    '       <img src="'+me.option.hideImg+'"></i>'+
                    '    <i data-num="0">0</i>'+
                    '    <i data-num="." class="no-right"><span>.</span></i>'+
                    '</div>';
        $('body').append(html);
        this.dom = $('#'+insertId);
        this.numDom = $(numberId);
        this.payDom = $('#'+payId);
        this.init = function(){ //插入style、元素 
            me.dom.on('touchstart','i',function(evt){
                evt.preventDefault();
                var num = $(this).data('num');
                switch(num){
                    case 'del':
                        me.delete(me.numDom);
                        break;
                    case 'callback':
                        me.callback();
                        break;
                    case 'hide':
                        me.hideBoard(me.dom);
                        break;
                    default:
                        me.insert(me.numDom,num,me.option);
                }
            });
        }

        this.init();
        return this;
    }
    keyBoardNum.prototype.show = function(){
        var me = this;
        setTimeout(function(){
            me.dom.addClass('show');
        },200); 
        return this;
    }
    keyBoardNum.prototype.delete = function(dom){
        var str = dom.text().trim();
        if(str !== ''){
            dom.text(str.substring(0,str.length-1));
            if(dom.text()==''){
                this.payDom.removeClass('active');
                this.num = 0;
            }else this.num = dom.text();
        }
        return this;
    }
    keyBoardNum.prototype.callback = function(){
        if(this.payDom.hasClass('active')){
            this.option.btnCallBack && this.option.btnCallBack(parseFloat(this.num));
        }
    }
    keyBoardNum.prototype.hideBoard = function(){
        this.dom.removeClass('show');
        return this;
    }
    keyBoardNum.prototype.insert = function(dom,num,option){
        var str = dom.text();
        if(str == ''){ //没有内容
            if(num == '.'){
                dom.text('0.');
                return;
            }
        }else if(str == '0' && str.length == 1 && num != '.'){ //如果之前输入了0，后面只能输入小数点
            return;
        }else if(str.indexOf('.')>-1){ //已经输入过小数点了
            if(num == '.') return;
            if(str.substring(str.indexOf('.')+1,str.length).length == option.decimal) return;
        }else if(num != '.'){ //没有输入过小数点
            if(str.length==option.integer) return;
        }
        this.num = str + num;
        dom.text(this.num);
        this.payDom.addClass('active');
        return this;
    }

    var delImgBase = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAABICAMAAADCrCubAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAH+UExURQAAAE1PVU1PV05OVU5QVk1PVktOV05QVk1PVk5QVgAAAEtPVk5QV01NVEtOVU1PVk1QVk5QVk5QVktLS01PV05OTklJUktLV01NVisrVU1PV05PVk5QVk1PVk1QVk1PV01PVk5PVktPVE5PVjtOTk1PVklJSU1NVk1PVkBAQDMzM0dHVU1PVkxPVk5OU0lPVU1QVkBAVU1NTUZGUU1QVk1NVU1PVU1NVU5QVUZPT0xOVU5PVk1PV01PVk1PV05QV05PVk5OVU1PVU5PV0hOVU5OVgAAAE5PVk5OVk5PVk1QVkVOTk5PVk1QVk5PVk1QV0dHUk1QVk5OVkxOVk5PVk1PVkxPV01NVEpPU0xPVk5QVk1OVkxMU0tQVU1QV01QV01NVUxPVU1PV05QV01PVktLU05OVU5PVjk5VUxOVU1QVk1PV05OVU1QV01QVkxMVwAAVU5PV0lOU01PVklJUElJVU5PVk5PV05PVk1QV01QVk5QVkxPVU1QV01PV0pOVk1PVU1PVk1NU01QV01PV01PV05OVENDUU5QVk5OVU5QVk5PV01PV01PVkxQVE5PVk5OVk1PVkpKVUtOVk5OV05QV05PV0xMVU1PV0xOVk1QV01QVkxMVUlJSU5QV05QVk1QV0xMVU1QV0hQUE5PV0tLUU5QVk1PVk1OV05QV9QbdoYAAACpdFJOUwBa90j5+FiA/vwBR/1MS/vN9uMR8RccLFkG9LuDeu3uiO868g1xDlZ0BAUShUouKr0MChamHng8Zh1yuOv10fq+aXvLJ3kCz1/BoxrVU6dwGVA7ZaGRYUk3TcyMJTPWmT9UZ9zhImyaCW+g6EWtwC8D3zHeIxWUxbHd6p1Rbb8+frUolqXUUhPpJOaKqMdDq1yyGGJV2eI2vH/gyRsHkPCwObkgzinzlZxCpCGRAAADg0lEQVRYw72Z5UPbUBDAD2iBFi+UFpfirkMHbMjYxgwZM9hgBhsMxpi7u7u75L9c30uappLkkr7kvtDeHe8HL/fu7l0AFOXT+D1Ov6zt+ecuA5Q4z3ORyp+/qwhQ2S+OgaSVDqmBPvdxbOTdnDJo6CnxcsTpltz9J1J41LllRdJN4lPkgkgkPS+Dos4oOV0jHtYDEKFkplJUm7zHLLHHl0PE0kRRV2Ttl2zEvg0YSCbdwPsy1qvRxLoXmMh6slZpeFvdV2JssbMhVZMIXAxr+vmAgBqygJFs9K42Es5w+jUB9ZSxAsFR73IFYfSN/QR0aDMzEOSSBUPVVT+IvqCeHQjiwpLsLUQd3QaGk74QbeIWMJy0huaOI2A4aScFFYLhpCSa5TfZDScVpxFVThUYTaovIJoNJWA0qdVBFCe3q/6iq2I4PaTkDVe4sKS70+R7/oAqKC/RW4oXAnULRd6jkYcjNT2mfUyxKmiKhmd0glSXQIsMN4UhVV6nJ3aH+qaXciEoASRXgwJI9nHqug7xeOe5YJQPxM0jSA+pZw0mkFqzg1AxPlB2qzqpk3oew8XsjE1Y2RpDQVbhq21GPSKexZOPXZXI4xErRflBsepRHtNLPu1pRJ9ECQoDEklv6cafcmo49H4UBuQjDXSTn937NOUXEYUBCaTmD/ROtUtjKgtEKYME0i3quVtz1pSiVEACiT6kdh0J2m3DggTSBb2kWouPZKlFkR7p3L1aq3/3rMkY0mq+rohItkgjwpKMqYR8SdcY5YEgNZTv5PJtiqaTK4JsNgxKzEYvOY3ZKEkEucUItCRh+gi+nURnWD8oCiAKgZJUjQktVWNSCpKiJhEk+1Z8JXR6AkASlMeJqLlZOejqPhYEkqDGMB1LSSq2Y+kMBvlRnagurPkgsgtbCgGJqCVcZ3n4OO0sb6iiCkn+cQfqoqxKV5TgbnnFg+yWRwfbO4J1HbODo/gbwBOLSTcAgPJEk241AJc5k25qADVm3T4BLpp1o4bl52ZNCWDurFmTD0gfMWmaA5D5xqQJFcDvfAOmbilhLd/T2E8SHTL1O4XpdJRk+i4ZIz8/YjnxfS9n5ZsYhlPsOln7BNvJ/Ed5B76JYfa24Y6CC9/EMHqDsqjoxTcxTN4KOV4o/0F8E8NApjvU/ne+iYlYGqrVt3nFEzmn/xXqibr6euP1S8btbxXiOfoPzODF0TnV49AAAAAASUVORK5CYII=';
    var hideImgBase = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAABICAMAAAC0lpkQAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAC0UExURQAAAImJiYiIiImJkomMkYmLkYqMkomLkYmLkYqMkomLkYmMkoiKkYmLkomJkImLkIqMkYmMkXFxjomLkoCAgImLkomLkYqKkYiLkYeLj4CLi4qLkomLkWZmZoeHkomLkomJkoqKkIWFj4mJkISEjomJiYmJkYiKkYqMkoqLkomMkYiIkYqLkomMkYmLkIqKjoaLkImMkYmMkIeLj4CAgImMkomLkYmMkomLkImLkoiKkYqMkluLW+YAAAA7dFJOUwANDzibtfzy/f7Y2WuaJ4j2zgnCAvDhSlhEFpinBTG2HEwZThsaQ3j652ge6eZsPTeZakIMsZzzbndt+xsz9AAAAeFJREFUWMPtmNeWgjAQhoOiWMDeRUXsvWxf3v+9lmREJUHEk7nak/8GDcNHTjKO84cQ0NQcFQ1PTkZxZDrkXq6V9XCU1Wc37Njw8GRMAuw+52Eq93uZLS7WB7MZu4aHLYOu8Qk+5/W0RuSkHa08wCw/wSATVl2CofkOssIhZ5gtDtYHw4xNkmFXnWBJZ7wMKbJrGo2bZrwCgWzQ0LgaZASBDbwOcxnz6uB1XHEV9z9x5fU/uCofFFdxVX1Q+aC4ihvDTdKvP0LE9etJ/MUr3MBfJPFDr3A/L37IBP825+/3EznWPv9YF/zbmTjgN3dvXMCgngBbH/DYFfjNaWDkvLx1fA+F9FpPsa1eeMvS+sUfn/xvM9HPV2s0bFh5gq0MaVitKvp5l96YiOcPNnt/5wm3w6Js8fxhDPP/FsE/7EY5FltmMQsRuw8WZiIsRa5NxxuZGGymQUPawpyM8W3FZzp/HtUs0fFU4SG2kKIBpSZ/HmW5ob10zFHxK8Fzce+l52fThP+u7ehDJVgnGS0iuQv5fsCOwNoIfUZE3sPvRlabLYfdbnA6o8MyhF0esFqudYi7xuvl+nElV0J3xVgouVK6FmOu5ErrUoyh5GKqc1dyUVW+llxc+cUYSi62Uh+p5MF/VYeijC2Upf4AAAAASUVORK5CYII=';
    return keyBoardNum;
}));


