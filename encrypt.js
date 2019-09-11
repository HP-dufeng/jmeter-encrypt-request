log.info("------------ Start: encrypt sign ---------------------------------------")
load(vars.get("crypto.js"));

var argument = sampler.getArguments().getArgument(0);

var body = JSON.parse(argument.getValue());

var signKey = body.app_key;
var sign = calcSign(body, signKey);

body.sign = sign;
argument.setValue(JSON.stringify(body));



function calcSign(data, signKey) {
    delete data['sign'];
   
       var exceptKeys=['app_secret','sign','http_method','token','resource_flag','rely'];
        var keys = [];
        for(var k in data) {
            if(exceptKeys.indexOf(k)==-1){ //判断是否存在
                 keys.push(k);
            }
        }
           keys.sort();  
       
       var kv = [];
       kv.push(signKey);
       for (var v in keys) {
           if(typeof(data[v])=='string'){
                if(data[v]===''||data[v].replace(' ','')==='')
                continue;

               kv.push(v +  data[v]);
           }else{
               var str=JSON.stringify(data[v]);

               kv.push(v +  str);
           }
           
       }
       
       kv.push(signKey);
       var kvStr = kv.join('');
   
       var sign =  CryptoJS.MD5(kvStr, signKey).toString().toUpperCase();
       return sign;
   }
   