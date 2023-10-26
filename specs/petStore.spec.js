const axios = require("axios");
const testData = require("../config/data.json");
const petId = 136;
describe('PetStore Test Suite', () => {

it('1. Verify that allows creating a User', async () => {
   const response = await axios ({
        url:"https://petstore.swagger.io/v2/user/",
        method: "post",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        data: {
            "id": 1,
            "username": "FunnyCat",
            "firstName": "John",
            "lastName": "Wood",
            "email": "j.wood@test.com",
            "password": "AaTest123",
            "phone": "000-000-00-00",
            "userStatus": 0
        },
   });
  expect(response.status).to.equal(200);
  expect(response.data.message).to.exist;
});

it('2. Verify that allows login as a User', async () => {
    const username="FurryPants";
    const password = 123;
    const response = await axios ({
        url:`https://petstore.swagger.io/v2/user/login?username=${username}&password=${password}`,
        method:"get",
    });
    expect(response.data.message).to.include('logged in user session');
    expect(response.status).to.equal(200);
});

it('3. Verify that allows creating the list of Users', async () => {
    const response = await axios ({
         url:"https://petstore.swagger.io/v2/user/createWithList",
         method: "post",
         headers: {
             'Content-type': 'application/json; charset=UTF-8'
         },
         data: [{
             "id": 2,
             "username": "User1",
             "firstName": "Ann",
             "lastName": "Cameron",
             "email": "a.cameron@test.com",
             "password": "Ge@r789",
             "phone": "000-000-00-01",
             "userStatus": 0
         },
         {
            "id": 1,
            "username": "User2",
            "firstName": "Ketrin",
            "lastName": "Snow",
            "email": "k.snow@test.com",
            "password": "Tes$t563",
            "phone": "000-000-00-02",
            "userStatus": 0
        }
        ],
    });
   expect(response.status).to.equal(200);
   expect(response.data.message).to.equal('ok');
 });

it('4. Verify that allows Log out User', async () => {
    const response = await axios ({
        url:"https://petstore.swagger.io/v2/user/logout",
        method:"get",
    });
    expect(response.status).to.equal(200);
});

it('5. Verify that allows adding a new Pet', async () => {
    const response = await axios ({
         url:"https://petstore.swagger.io/v2/pet",
         method: "post",
         headers: {
             'Content-type': 'application/json; charset=UTF-8'
         },
         data:{
                "id": petId,
                "category": {
                  "id": 1,
                  "name": "Dog"
                },
                "name": "Panda",
                "photoUrls": [
                  "https://petstore/photos/125"
                ],
                "tags": [
                  {
                    "id": 125,
                    "name": "sun"
                  }
                ],
                "status": "available"
              },
    });
   expect(response.status).to.equal(200);
   expect(response.data.status).to.equal('available');
 });

 it('6. Verify that allows uploading the image', async () => {
  const petId = 125;
  const fileToUpload = 'E:/Projects/API/helpers/images/panda.png'; 
  const apiUrl = `https://petstore.swagger.io/v2/pet/${petId}/uploadImage`; 
  const additionalMetadata = "new file";
  const formData = new FormData();
  formData.append('file', fileToUpload);
  formData.append('additionalMetadata', "newImage")
  const response = await axios.post(apiUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  expect(response.status).to.equal(200);
  expect(response.data.message).to.include("File uploaded");
  });

 it('7. Verify that allows updating Pet`s image information for existing Pet', async () => {
        const response = await axios ({
        url:"https://petstore.swagger.io/v2/pet",
        method: "put",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        data:{
               "id": petId,
               "category": {
                 "id": 12,
                 "name": "Dog"
               },
               "name": "Panda",
               "photoUrls": [
                 "https://petstore/photos/125/updated"
               ],
               "tags": [
                 {
                   "id": 11,
                   "name": "sun"
                 }
               ],
               "status": "available"
             },
   });
   expect(response.status).to.equal(200);
   expect(response.data.photoUrls).to.include("https://petstore/photos/125/updated");
 });

 it('8. Verify that allows updating Pet`s name and status', async () => {
    const response = await axios ({
         url:`https://petstore.swagger.io/v2/pet/${petId}`,
         method: "post",
         headers: {
             'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
         },
         data: 'name=Bars&status=pending',
    });         
   expect(response.status).to.equal(200);
   expect(response.data.message).to.equal(`${petId}`);
  });

 it('9. Verify that allows deleting Pet', async () => {
    const response = await axios ({
         url: `https://petstore.swagger.io/v2/pet/${petId}`,
         method: "delete",
         headers: {
             'Content-type': 'application/json; charset=UTF-8;',
             'api-key':'q'
         },
    });
   expect(response.status).to.equal(200);
   expect(response.data.message).to.equal(`${petId}`);
 }); 
});
