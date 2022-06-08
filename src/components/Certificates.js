import {useEffect,useState} from 'react'
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

const API_URL='http://ec2-15-185-42-200.me-south-1.compute.amazonaws.com:8080/gigshack-api-0.0.1/profile/user/get?requestedUserId=b57cd2f4-069b-43c3-8259-72f9601e6e15'
const TOKEN = 'http://ec2-15-185-42-200.me-south-1.compute.amazonaws.com:8080/gigshack-api-0.0.1/authenticate'
const Certificates = () => {
    const [data,setData] = useState()
    useEffect(() => {
        const fetchAuthToken = async () => {
          const result = await axios.post(
            TOKEN,
            {
                "password": "passmein",
                "username": "web"
            }
          );
          //setData(result.data);
          document.cookie = `jwttoken=${result.data.jwttoken}`;
        };
    
        fetchAuthToken();
      }, []);


      useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `${API_URL}`,
              {
                  headers:{
                    userId: 'b57cd2f4-069b-43c3-8259-72f9601e6e15',
                    profileId:'b57cd2f4-069b-43c3-8259-72f9601e6e15',
                    Authorization: `Bearer ${getCookie('jwttoken')}`
                  }
              }
            );
            
            setData(result.data.certificates)
          };
      
          fetchData();
         
      }, [])

      const getCookie = (cname)=> {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
      console.log(data,'data..')

    return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'#727a82'}}>
        <Toolbar>
            <Box variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Certificates
            </Box>
        </Toolbar>
      </AppBar>
      <Button variant="contained" sx={{marginTop: 4}} onClick={()=>{}}>
          ADD NEW CERTIFICATE
      </Button>
      {data.map(cetificate=>{
          return(
            <Box>
            <Box display="flex"  ml={2} mt={10} component="p">Certificates You have added</Box>
            <Box  display="flex" ml={2}> <Chip label="Online Course" variant="outlined" /></Box>
            <Box display="flex" ml={2} component="p">{cetificate.comments}</Box>
            <Box display="flex" ml={2} component="p" color="darkgray">Udemy | www.udemy.com</Box>
            <Box display="flex" ml={2} component="p" textAlign="initial">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Box>
            <Box display="flex" ml={2} component="p" color="darkgray">Year</Box>
            <Box display="flex" ml={2} component="p" color="darkgray">Valid till</Box>
            <Divider />
            </Box>
          )
          })}
     
     
    </Box> 
    )
}

export default Certificates;