async function loadEvent () {
    console.log("load");
    const rootElement = document.getElementById("root")

    
    const d = new Date();

    
    //fetch API 
    const nasaApiKey = "9ZvY9xKOw5h16yOBEm5JZcvaG6hvFqTOMkFBf3ru" 
    const todaysDate = `${d.getFullYear()}-${(d.getMonth()+1)}-${d.getDate()}`
    const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${todaysDate}`)
    
    
    const apodJson = await apod.json()
    console.log(apodJson);
    
   
    
    const contentHTML = `
    <h1 class="heading">Astronomy Picture Of The Day</h1>
    <div id="content">
        <div class="text">
            <h1>${apodJson.title}</h1>
            <p>${apodJson.explanation}</p>
        </div>
        <img src="${apodJson.url}">
    </div>
    <div id="form">
        <form>
            <h3>Get another day's Astronomy Picture!</h3>
            <input id="input" name="input" type="text" class="input" placeholder="Type your date here..." autocomplete="off">
            <button>GO</button>
            <p class="date-format"> (date format: YYYY-MM-DD) </p>
            
        </form>
    </div>
    `;
    
    
    
    rootElement.insertAdjacentHTML("beforeend", contentHTML)
    
    
    const form = rootElement.querySelector("form")

    const inputList = document.querySelectorAll("input")

    
    let requestedDate = ""
    
    Array.from(inputList).map(function(input){
        input.addEventListener("input", function(e) {
            // console.log(e.target.value);
            requestedDate = `${e.target.value}`
        })
    })
    

    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }

    

    form.addEventListener("submit", async function(e){               
        e.preventDefault()
        console.log(e.target);
        const apod2 = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${requestedDate}`)
        const apodJson2 = await apod2.json()
        document.getElementById("content").innerHTML = `
        
  

        <div id="content">
            <div class="text">
                <h1>${apodJson2.title}</h1>
                <p>${apodJson2.explanation}</p>
            </div>
            <img src="${apodJson2.url}">
        </div>
        `;
        console.log(apodJson2); 

        
        
    
        console.log(isImage(`${apodJson2.url}`));
    })
     
    console.log(isImage(`${apodJson.url}`))
    

    
    
    
    

    
    
 

}
window.addEventListener("load", loadEvent);
