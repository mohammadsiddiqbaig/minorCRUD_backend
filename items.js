const express = require('express');

const router = express.Router();





let items = [
   {
    id: 101,
    "image": "https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/schezwan-margherita.4371d9483546db47a97c5503ccad0c2f.1.jpg?width=200",
    "name": "Margherita",
    "description": "Classic delight with 100% real mozzarella cheese",
    "price": 6.99
  },
  {
    "id": 102,
    "image": "https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/awesome-american-cheesy.17f198e5a73db40c367ddfe96da54a4c.1.jpg?width=300",
    "name": "Pepperoni",
    "description": "Pepperoni and cheese",
    "price": 8.99
  },
  {
    "id": 103,
    "image": "https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/ultimate-tandoori-veggie.059dfd9b3f088818ed725872d98d20b6.1.jpg?width=300",
    "name": "ltimate Tandoori VeggieNEW ",
    "description": "Classic delight with 100% real mozzarella cheese",
    "price": 6.99
  },
  {
    "id": 104,
    "image": "https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=600",
    "name": "Margherita",
    "description": "Classic delight with 100% real mozzarella cheese",
    "price": 6.99
  },
  {
    "id": 105,
    "image": "https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/schezwan-margherita.4371d9483546db47a97c5503ccad0c2f.1.jpg?width=300",
    "name": "Chicken Tikka Supreme",
    "description": "Classic delight with 100% real mozzarella cheese",
    "price": 6.99
  },
  {
    "id": 106,
    "image": "https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/mazedar-makhni-paneer.cb3150d2be9cb8dcd248be70921c5196.1.jpg?width=300",
    "name": "Chicken Supreme",
    "description": "Classic delight with 100% real mozzarella cheese",
    "price": 6.99
  },
  {
    "id": 107,
    "image": "https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/triple-chicken-feast.e4a546e7a8581a60952b99e3fe22987e.1.jpg?width=300",
    "name": "Triple Chicken Feast",
    "description": "Classic delight with 100% real mozzarella cheese",
    "price": 6.99
  },

  {
    "id": 108,
    "image": "https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/chicken-tikka.6d441a65371e941db36c2754586119a8.1.jpg?width=300",
    "name": "Chicken Tikka",
    "description": "Classic delight with 100% real mozzarella cheese",
    "price": 6.99
  }
]


// CRUD -- CREATE , READ , UPDATE , DELETE




// GET Request : Retrive all users


router.get("/", (req,res)=>{
    res.send(items);
})




// GET REQUEST : Retrieve a Single USing email ID


router.get("/:id", (req, res) => {
    const id = req.params.id;
    const filtered_items = items.filter(item => item.id == id);
    

    if (filtered_items.length > 0) {
        res.send(filtered_items);
    } else {
        res.status(404).send({ message: "Item not found" });
    }
});





// DELETE REQUEST : Delete using email name


router.delete("/:id", (req, res) => {
    const id = req.params.id; // Corrected to use 'id' instead of 'name'
    
    // Filter out the item with the given id
    const initialLength = items.length;
    items = items.filter(item => item.id != id);

    if (items.length < initialLength) {
        res.send(`Item with the id ${id} deleted`);
    } else {
        res.status(404).send(`Unable to find an item with the id ${id}`);
    }
});


// PUT  REQUEST : Update user by email
router.put("/:id" , (req,res)=>{
    const id = req.params.id;
    let filtered_items = items.filter(item=>item.id == id);
    if(filtered_items.length>0){
        let filtered_item = filtered_items[0];
        
       /* let image = req.query.image;
        let name = req.query.name;
        let description = req.query.description;
        let price = req.query.price;*/
        const { image, name, description, price } = req.query;
       
        
        if(image){
            filtered_item.image = image;
        }
        if(name){
            filtered_item.name = name;
        }
        if(description){
            filtered_item.description= description;
        }
        if(price){
            filtered_item.price= price;
        }
       // items = items.filter(item => item.id != id );
        //items.push(filtered_items)
        items = items.map(item => item.id == id ? filtered_item : item);
        
        res.send(`User with the data ${id} updated`);
    }else{
        res.send("Unable to find the User");
    }


})




// POST REQUEST : CREATE  A NEW USER


router.post("/" , (req,res)=>{
    items.push({
        "id": req.query.id,
        "image":req.query.image,
        "name":req.query.name,
        "description":req.query.description,
        "price":req.query.price
    });
    res.send("The user has been added...");
})

module.exports = router;
