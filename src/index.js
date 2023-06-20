// write your code here

//to display ramen images
//1. fetch images
//2. create img elements
//3. append img into the div

//Getting the Data
const ramenArray = fetch("http://localhost:3000/ramens")
    .then(res => res.json()) //convert files from JSON to JS 
    .then(ramenArray => {
        createImageElement(ramenArray)  //invokes the function with fetched data
        expandImageElement(ramenArray)  //invokes the function with fetched data
        addRamenFunction(ramenArray)    //invokes the function with fetched data
    })


// #1 creating images
function createImageElement(ramenArray) {
    const ramenImages = ramenArray.map( x => {
        return x.image;                 //returns an array of [link1, link2, link3, link4, link5]
    })

    for (let i = 0; i < ramenImages.length; i++) {  //iterates through the array from index 0 -> 4
        let imgLink = ramenImages[i]                //declare each image once THEN 

        theImageAppender(imgLink)                   //then when declared, run theImageAppender function
    }
}

function theImageAppender(data) {

    const imgDiv = document.getElementById("ramen-menu");
    const imgElement = document.createElement("img");
    imgElement.src = data;                          //adds the src value for the created <img> element
    imgDiv.appendChild(imgElement)                  //appends the new image to the HTML file
}

// #2 getting more details for ramen selected
function expandImageElement(ramenArray) {

    const imgDiv = document.querySelectorAll("#ramen-menu img");        //returns and Array of all img tags

    function theUpdater(e){                         //takes in an event input

        const ramenImages = ramenArray.map( x => {
            return x.image;                         //returns an array of [link1, link2, link3, link4, link5]
        }) 

        const clicked = e.target.getAttribute("src");       //sets clicked to the src of the image we click
        // console.log(e.target.value);                     //doesn't work unfortunately
        // console.log(e.target.src);                       //doesn't work unfortunately

        let indexOfClicked = ramenImages.indexOf(clicked);  //matches the clicked URL to its index in the array

        const temp = ramenArray[indexOfClicked];            //picks the data from the ramenArray based on index

        //declaring all of the data picked
        const ramenLink = temp.image;
        const ramenName = temp.name;
        const ramenRestaurant = temp.restaurant;
        const ramenRating = temp.rating;
        const ramenComment = temp.comment;
    
        //picking out the elements via DOM
        const detailImage = document.querySelector("#ramen-detail img")
        const detailName = document.querySelector(".name")
        const detailRestaurant = document.querySelector(".restaurant")
        const detailRating = document.querySelector("#rating-display")
        const detailComment = document.querySelector("#comment-display")
    
        //update the elements via DOM
        detailImage.src = ramenLink;
        detailName.textContent = ramenName;
        detailRestaurant.textContent = ramenRestaurant;
        detailRating.textContent = ramenRating;
        detailComment.textContent = ramenComment;
    
    }

    for (const ramenClickable of imgDiv) {
        ramenClickable.addEventListener("click", theUpdater);       //this adds an event listener to every single image 
    }

}

// #3 create new ramen

function addRamenFunction(ramenArray) {
    function theAdder(e) {
        //picking out the elements via DOM
        const createName = document.querySelector("#new-name").value
        const createRestaurant = document.querySelector("#new-restaurant").value
        const createImage = document.querySelector("#new-image").value
        const createRating = document.querySelector("#new-rating").value
        const createComment = document.querySelector("#new-comment").value
    
        //prevents page from refreshing on submit
        e.preventDefault();
    
        //creates an object based on the form data
        const newRamen = {
            id: ramenArray.length + 1,
            name: createName,
            restaurant: createRestaurant,
            image: createImage,
            rating: createRating,
            comment: createComment,
        }

        //runs the function with the new image url and adds it to the display
        const imageToPass = newRamen.image;
        theImageAppender(imageToPass);
        
    }
    
    const createForm = document.querySelector("#new-ramen")
    
    createForm.addEventListener("submit", theAdder)

}




//pick out elements in html to add to
//create html tags to add with
//append that information

//what data are we adding? 