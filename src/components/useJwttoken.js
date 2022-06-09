import axios from 'axios';

const TOKEN = 'http://ec2-15-185-42-200.me-south-1.compute.amazonaws.com:8080/gigshack-api-0.0.1/authenticate'

export const useJwttoken = () => {
    
        const fetchAuthToken = async () => {
          const result = await axios.post(
            TOKEN,
            {
                "password": "passmein",
                "username": "web"
            }
          );
          document.cookie = `jwttoken=${result.data.jwttoken}`;
        };
        return (
        fetchAuthToken()

        )
}
