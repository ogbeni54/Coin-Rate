const item = document.querySelector('.rate_container');
const search = document.querySelector('.search_box input');

const rate = document.getElementsByClassName('rate_item')

const coinData =  async() => {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        if(res.status !== 200) {
            throw new Error ('not found')
        }

        const data = res.json();
        return data;
}

coinData()
    // Consuming the data from the promise returned and attaching another function to the return value of the initial function
    .then(data => { 
        // let output = '';
        // console.log(data);
        setData(data);
       
    });

    const setData = (data) => {
        // console.log(data);
        item.innerHTML = '';
        data.forEach(coin => {
            const {image, name, current_price,
            price_change_24h} = coin;
            
            const coinEl = document.createElement('div');
            coinEl.classList.add('rate_item');
            // console.log(coin);
            coinEl.innerHTML= `
           
            <div class = "rate_details">
            <div class = "rate_image">
            <img src=${coin.image} >
            </div>
            <div class = "rate_name">
            <p class = "coin_name">${coin.name}</p> 
            </div>

            </div>
            
            <div class = "rate_prices">
            <div class = "rate_actual">
            <p class = "pri"> Price: </p><p class = "val">${coin.current_price}</p>
            </div>
            <div class = "rate_volumes">
            <p class = "pri">24h change: </p>  <p class="vol"> ${coin.price_change_24h.toFixed(3)} %</p>
            </div>

            </div>
                           
            `
            item.appendChild(coinEl)
            
        });
    
        search.addEventListener('keyup', () => {
           
             const term = search.value.trim().toLowerCase();
            //  console.log(item.children);
            Array.from (item.children)
            .filter((todo) => !todo.textContent.toLowerCase().includes(term))   // includes is used to compare string values, filtering an array with a condition of the ones that are not
            .forEach((todo) => todo.classList.add('filtered'));

            Array.from(item.children) 
                .filter((todo) => todo.textContent.toLowerCase().includes(term))   
                .forEach((todo) => todo.classList.remove('filtered'));
        });
}
           
    


           
        



