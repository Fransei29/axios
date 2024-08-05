document.getElementById('fetchBreeds').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/with-cors');
        const data = await response.json();
        const breedList = document.getElementById('breedList');
        breedList.innerHTML = '';

        const breeds = await fetch('https://dog.ceo/api/breeds/list/all');
        const breedsData = await breeds.json();

        for (const breed in breedsData.message) {
            const li = document.createElement('li');
            li.textContent = breed;
            breedList.appendChild(li);
        }
    } catch (error) {
        console.error('Error fetching breeds:', error);
    }
});

document.getElementById('fetchProduct').addEventListener('click', async () => {
    const productId = document.getElementById('productId').value;
    if (!productId) {
        alert('Please enter a product ID');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        const data = await response.json();
        const productInfo = document.getElementById('productInfo');
        productInfo.textContent = data.msg;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
});
