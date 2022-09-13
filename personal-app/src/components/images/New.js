import React from "react";

export default function New(){
    const [input, setInput] = React.useState({itemName: ''})
    const [items, setItems] = React.useState([])
    const [total, setTotal] = React.useState(0)

    function update(e){
        const {name, value} = e.target
        setInput((old) =>  {
         return{
                [name]: value
        }})
    }

    function addToCart(){
        {input.itemName && setItems((previous) => [...previous,{tag: input.itemName, qty: 0}])
        setInput((old) => {
           return {
               ...old,
                itemName: ''
           } 
        })}
     
    }

    function add(index){
        
        const newItem = [...items]
        newItem[index].qty++
        setItems(newItem)
        
        calculateTotal()
    }
    
    function subtract(index){
        const newItems = [...items]
        {items[index].qty > 0 && newItems[index].qty--
        setItems(newItems)}
        
        calculateTotal()
    }

    function calculateTotal(){
        const totalItemCount = items.reduce((total, item) => {
            return total + item.qty
        }, 0)
        setTotal(totalItemCount)
    }


    const body = items.map((item, index) => 
        <div className="item-row">
            <div className="indicate"></div>
            <div>{item.tag}</div>
            <div className="amount">
                <div className="decrease" onClick={() => subtract(index)}>V</div>
                <div>{item.qty}</div>
                <div className="increase" onClick={() => add(index)}>V</div>
            </div>
        </div>
    )
    

    return (
        <div>
            <div className="top">
                <input 
                    type='text'
                    value={input.itemName}
                    placeholder='Add an item'
                    name="itemName"
                    onChange={update}
                    className="input"
                />
                <span onClick={addToCart} className="list-plus">+</span>
            </div>
            {body}
            <div className="total">Total: {total}</div>
        </div>
    )
}