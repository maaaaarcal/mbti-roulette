var colors = ["#886D98", "#836793", "#7D608C", "#765985",
              "#99C16D", "#738D56", "#6b874c", "#59753C",
              "#72CBCC", "#57b3b5", "#439b9c", "#299294",
              "#e7d355", "#E0CA46", "#D9C037", "#C9AC18"];

var bgGradient;

var types = ["INTJ","INTP","ENTJ","ENTP",
            "INFJ","INFP","ENFJ","ENFP",
            "ISTJ","ISTP","ESTJ","ESTP",
            "ISFJ","ISFP","ESFJ","ESFP",];

var spinAngle = 0;

var startAngle = 0;
var arc = Math.PI / 8;
var spinTimeout = null;

var spinArcStart = 16;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 250.5;
    var textRadius = 200.5; 
    var insideRadius = 170.5;
   
    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,550,550);
   
    ctx.lineWidth = 0;
   
    ctx.font = 'bold 19px Montserrat';
    
    for(var i = 0; i < 16; i++) {
      var angle = startAngle + i * arc;
      ctx.fillStyle = colors[i];
     
      ctx.beginPath();
      ctx.arc(275.5, 275.5, outsideRadius, angle, angle + arc, false);
      ctx.arc(275.5, 275.5, insideRadius, angle + arc, angle, true);
      ctx.fill();
     
      ctx.save();
      ctx.fillStyle = "white";
      ctx.translate(275 + Math.cos(angle + arc / 2) * textRadius,
                    275 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = types[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }
   
    //Arrow
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(275.5 - 15, 275 - (outsideRadius + 5));
    ctx.lineTo(275.5 + 15, 275 - (outsideRadius + 5));
    ctx.lineTo(275.5 + 0, 275 - (outsideRadius - 15));
    ctx.fill();
  }
}
   
function spin() {
  spinAngleStart = Math.random() * 10 + 10 * 2;
  spinTime = 0;
  spinTimeTotal = 5000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 10;
  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 20);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.font = 'bold 40px MontserratSemiBold';
  
  var text = types[index]

  if(text==="INTJ"||text==="INTP"||text==="ENTJ"||text==="ENTP") {
      bgGradient = "linear-gradient(to right bottom, #886D98, #765985) no-repeat"
  }
  else if(text==="INFJ"||text==="INFP"||text==="ENFJ"||text==="ENFP") {
      bgGradient = "linear-gradient(to right bottom, #99C16D, #59753C) no-repeat"
  }
  else if(text==="ISTJ"||text==="ISTP"||text==="ESTJ"||text==="ESTP") {
      bgGradient = "linear-gradient(to right bottom, #72CBCC, #299294) no-repeat"
  }
  else if(text==="ISFJ"||text==="ISFP"||text==="ESFJ"||text==="ESFP") {
      bgGradient = "linear-gradient(to right bottom, #E0CA46, #C9AC18) no-repeat"
  }
  else {
      bgGradient = "linear-gradient(to right bottom, #ffffff, #333333) no-repeat"
  }

  document.body.style.background = bgGradient;


  /*var debug = [
    { var: "spinTimeTotal", value: spinTimeTotal },
    { var: "spinAngleStart", value: spinAngleStart },
    { var: "spinAngle", value: spinAngle },
    { var: "startAngle", value: startAngle },
    { var: "arc", value: arc },
    { var: "arcd", value: arcd },
    { var: "degrees", value: degrees },
    { var: "index", value: index },
    { var: "text", value: text },
  ];

  console.table(debug);*/


  ctx.fillText(text, 275 - ctx.measureText(text).width / 2, 275 + 10);
  ctx.restore();
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();