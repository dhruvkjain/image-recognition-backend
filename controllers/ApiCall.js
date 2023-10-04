// const fetch = require('node-fetch');

const handleApiCall = (req , res)=>{
    const PAT = process.env.API_CLARIFAI_PAT;
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    const MODEL_ID = 'general-image-detection';
    const IMAGE_URL = req.body.input;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    //   .then(response => response.json())
    //   .then(result =>{
    //     res.send(result);
    //   }).catch(err=>{res.status(400).json("API call failed")})

    const getAPI = async () => {
      const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          res.send(data);
        }
    };
    
    getAPI();
}

module.exports={
  handleApiCall: handleApiCall
} 
