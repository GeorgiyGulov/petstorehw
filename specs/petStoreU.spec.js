/**const axios = require('axios'); // If using Node.js

describe('PetStore Test Suite', () => {

  it("Verify that allows updating and image", async () => {

const petId = 125;
const fileToUpload = 'C:\Users\Nina_Pyshcheva\Desktop\API\helpers\images\panda.png'; // Replace with the path to your file
const apiUrl = `https://petstore.swagger.io/v2/pet/${petId}/uploadImage`; // Replace with your API endpoint
const additionalMetadata = "new file";

// Create a FormData object and append the file to it
const formData = new FormData();
formData.append('file', fileToUpload);
formData.append('additionalMetadata', "newImage")

// Send a POST request with Axios to upload the file
const response = await axios.post(apiUrl, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

expect(response.status).to.equal(200);
console.log(response.data)
expect(response.data.message).to.include("File uploaded");

  });

});*/
