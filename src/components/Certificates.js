import {useEffect,useState} from 'react'
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import {useJwttoken} from './useJwttoken';
import {getCookie} from './Cetificates.utils';

const API_URL='http://ec2-15-185-42-200.me-south-1.compute.amazonaws.com:8080/gigshack-api-0.0.1/profile/user/get?requestedUserId=b57cd2f4-069b-43c3-8259-72f9601e6e15'

const Certificates = () => {
    const [data,setData] = useState()
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('sm'));
    useJwttoken();

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

 
      console.log(data,'data..')

    return(
      <>
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static" sx={{backgroundColor:'#727a82'}}>
        <Toolbar>
            <Box display="flex" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Certificates
            </Box>
        </Toolbar>
      </AppBar>
      <Button variant="outlined" sx={{marginTop: 4, width: '50%'}} onClick={()=>{}}>
        <AddIcon fontSize="small"/>
          ADD NEW CERTIFICATE
      </Button>
      <Box display="flex"  ml={2} mb={6}  component="p">Certificates You have added</Box>

      {data?.length>0 && data?.map((certificate,id)=>{
          return(
            <Box ml={2} key={id} mt={2} display="flex" flexDirection="column">     
            <Box display="flex" mt={1}> <Chip label={certificate?.certificateType} variant="outlined" /></Box>
            <Box display="flex" mt={1}>{certificate?.comments}</Box>
            <Box display="flex" color="darkgray" mt={1}>{certificate?.instituteName} | {certificate?.website ?? 'www.udemy.com'}</Box>
            <Box display="flex" textAlign="initial" mt={1}>{certificate?.comments}</Box>
            <Box display="flex" textAlign="center" color="white" backgroundColor="#1a8897" mt={1} p={1} style={{width: 60, borderRadius: 12}}><Box ml={0.5}>{certificate?.score}/{certificate?.scoreOutOf}</Box></Box>
            <Box display="flex" color="darkgray" mt={1}>Year {certificate?.year}</Box>
            <Box display="flex" color="darkgray" mt={1}>Valid till {certificate?.validity}</Box>
            <Divider sx={{mb:2, mt:2}}/>
            </Box>
          )
          })}
     
     
    </Box> 
    </>
    )
}

export default Certificates;