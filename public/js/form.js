//Serialize Form to Object
$.fn.serializeObject = function () {
    let o = {};
    let a = this.serializeArray();
    // a = a.slice(0, 1);
    // console.log(a);
    // a = a[0];
    // console.log(this.serializeArray());
    // console.log(this.serializeObject());
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


let fileResp = {};


async function getBase64(name){
  let inp = document.querySelector('form input[name='+name+']');
  // console.log(inp.files[0].target);

  if(inp.files[0].type === "image/jpg" || inp.files[0].type === "image/jpeg" || inp.files[0].type === "image/png"){

    let base64Value = "";
    const width = 500;
    if (inp.files && inp.files[0]) {
      var reader = new FileReader();
      const fileName = inp.files[0].name;
      let canvBase64;
      reader.onload = function (e) {

        let img = {};
        // if(){
          img = new Image();
          // }
          img.src = e.target.result;
          base64Value = img.src;

        //   console.log(inp.files[0].size);

        if (inp.files[0].size <= 2000){
            fileResp.name =  inp.files[0].name;
            fileResp.type =  inp.files[0].type;
            fileResp.base64 = base64Value;
        }else{
            alert('File size to Large, Hint: max size is 2bytes');
            inp.value = "";
        }


        }

        reader.readAsDataURL(inp.files[0]);
      }

    }else{
      alert('invalid File type');
      inp.value="";
    }

  }


$('body')


.on('change', '#image-icon', async (elm)=>{

    let target = elm.target;

    let name = target.name;

    await getBase64(name);

    // console.log(fileResp);

})


//It is triggered when the user clicks on the submit or update button
.on('click', '#add_api_btn', async (elm) => {
    // console.log();

    if ( !('name' in fileResp) ) {

        alert('All Fields must be filled');

    }else{


    elm.preventDefault();
    elm.stopImmediatePropagation();

    let {
        formname,
        method,
        url
    } = elm.target.dataset;

    let data = {};

    let form = $('form[name=' + formname + ']');
    // console.log(form);

    let formdata = form.serializeObject();

    $('body #' + formname + '_btn').addClass('hide_button');
    $('body #' + formname + '_loader').removeClass('hide_button');

    
    formdata.img = fileResp;
    console.log(formdata);
    // formdata is the data gotten fro the form... 
    

    }
})
