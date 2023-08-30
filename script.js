document.addEventListener("DOMContentLoaded", function() {
    
    //const result = document.querySelector("#result"); 


function btnClicking(){
    document.querySelector("#dec-btn").addEventListener("click",function(){
        document.querySelector("#decryption").style.display="block"
        document.querySelector("#encryption").style.display="none"
        document.querySelector("#dec-btn").style.backgroundColor="#333"
        document.querySelector("#enc-btn").style.backgroundColor="#222"
        document.querySelector("#main>h1 span img").style.rotate="180deg"
       document.querySelector("#result").style.display="none"
    })

    document.querySelector("#enc-btn").addEventListener("click",function(){
        document.querySelector("#encryption").style.display="block"
        document.querySelector("#decryption").style.display="none"
        document.querySelector("#enc-btn").style.backgroundColor="#333"
        document.querySelector("#dec-btn").style.backgroundColor="#222"
        document.querySelector("#main>h1 span img").style.rotate="0deg"
        document.querySelector("#result").style.display="none"

    })

    document.querySelector("button").addEventListener("click",function(){
        document.querySelector("#result").style.display="block"

    })

}


function encryption(){
    document.querySelector("#encrypt-btn").addEventListener("click",function(){

       // console.log(password)
       var input = document.getElementById("etxtmsg").value
       var password = document.getElementById("epassword").value
       var clutter="";
        const str = input.split("") // convert string to array
        //console.log(str)

        str.forEach(element => {
        clutter +=`&#128${element.charCodeAt()} ` //128+codeValueOfChar
        });
        //console.log(clutter)

       // document.querySelector("#result").style.display="block"
        document.querySelector("#result").innerHTML=clutter

        var datai=[];

        if(JSON.parse(localStorage.getItem('data1'))){
            datai = JSON.parse(localStorage.getItem('data1'))
            datai.push({"pass":password,"input":input,"clutter":clutter})
        }
        else{
            datai=[{"pass":password,"input":input,"clutter":clutter}]
        }

        localStorage.setItem('data1',JSON.stringify(datai))
    })
}


function decryption(){
    document.querySelector("#decrypt-btn").addEventListener("click",function(){

        var clutter2 = "";

        var input2 = document.querySelector("#emojimsg").value 

        var pass2 = document.querySelector("#finalpassword").value 

        var user = JSON.parse(localStorage.getItem('data1'))
        //console.log(user)

        var str2 = input2.split(" ")
        str2.forEach(element => {
            clutter2 += `&#${(element.codePointAt(0))} ` //        // Decrypt emoji message and find a match in stored data 
        })

        var found;
        for (let i of user) {
            if (i.clutter == clutter2) {
                found = i;
            }
        }

        // Display appropriate result based on match
        if (found && found.clutter === clutter2) {
            // Correct match: display decrypted input text
            document.querySelector("#result").style.display = `block`;
            document.querySelector("#result").style.color = `#eee`;
            document.querySelector("#result").innerHTML = found.input;
        } else {
            // Incorrect match: display error message
            document.querySelector("#result").style.display = `block`;
            document.querySelector("#result").style.color = `red`;
            document.querySelector("#result").innerHTML = "Wrong password!";
        }


    })
}



encryption();
decryption();
btnClicking();
});