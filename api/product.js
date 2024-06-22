export const getProduct = () => new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve({
            products:[
        {
            id:1,
            name:"Product 1",
            price:10
        }
    ]
        })
    },2000)
});

