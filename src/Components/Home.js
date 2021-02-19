import React,{useState,useEffect} from "react";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "../Styles/home.css"
import $ from "jquery";
import Modal from 'react-bootstrap/Modal'
import Spinner from "react-bootstrap/Spinner";
import CloseIcon from '@material-ui/icons/Close';
import Card from "./Card";

function Home(){
 
    //states
    const [search,setSearch] = useState("");
    useEffect(()=>{
        getData();
    },[]);
    const [dataArr,setDataArr] = useState([]);
    const [smallArr,setSmallArr] = useState([]);
    const [count,setCount] = useState(1);
    const [hasmoreState,setHasmore] = useState(true);
    const [show,setShow] = useState(false);
    const [modalData,setModalData] = useState("");
    const [load,setLoad] = useState(false);
    function handleSearch(e){
        console.log(e.target.value);
        setSearch(e.target.value);
        getData(e.target.value);
    }


    //api call
    const getData = async (x) => {
        
        await Axios.get("https://rickandmortyapi.com/api/character/",{
            params:{
                name:x,
                page:"1"
            }
        })
        .then(function(res){
           

            console.log(res.data.results.slice(0,5)[0]);
            setDataArr(res.data.results);
            setSmallArr(res.data.results.slice(0,5));
            setModalData(res.data.results.slice(0,5)[0]);
            if(res.data.results.slice(0,5)[0].origin.name){
                setLoad(true);
            }
            
            setCount(1);
        })
        .catch(err=>{console.log("Nothing here")})
    }


    //infinite scroll

    function fetchData(){
        console.log("ff");
        console.log(count);
       

        setTimeout(() => {
            if(count === 1){
                setSmallArr(smallArr.concat(dataArr.slice(5,10)));
                setCount(2);
            }
            else if(count === 2){
                setSmallArr(smallArr.concat(dataArr.slice(10,15)));
                setCount(3);
            }
            else if(count === 3){
                setSmallArr(smallArr.concat(dataArr.slice(15,20)));
                setCount(4);
            }
            else{
              setHasmore(false);
            }
        }, 1000);

   
        
    
    }


    //show modal on click
    function showdetails(x){
     setShow(true);
     setModalData(dataArr[x]);
     console.log(dataArr[x].origin.name);
    }

   


  
    return(load ?
        <div className="mainH">
        <h1 className="head">Rick and Morty Search</h1>
        <div className="autoS" style={{width:"30%"}}>
            <input value={search} onChange={handleSearch} name="search" placeholder="Search for a contact" className="form-control" />
            <div>
        
        <InfiniteScroll
          dataLength={smallArr.length}
          next={fetchData}
          hasMore={hasmoreState}
          loader={<h4>Loading...</h4>}
          height={275}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {smallArr.map((i, index) => (
            <div className="suggestions" key={index} onClick={()=>{showdetails(index)}}>
          
            <img src={i.image} style={{width:30,height:30,borderRadius:100,marginRight:12}} />
              <p>{i.name}</p>
              <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",position:"absolute",left:280}}>
              
              <div style={i.status ==="Alive" ? {width:10,height:10,borderRadius:10,backgroundColor:"green",marginRight:8}: i.status ==="Dead" ? {width:10,height:10,borderRadius:10,backgroundColor:"red",marginRight:8}:{width:10,height:10,borderRadius:10,backgroundColor:"gray",marginRight:8}}></div>
              <p style={{marginRight:4}}>{i.status}</p>
              <p style={{marginRight:4}}>-</p>
              <p>{i.species}</p>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
        </div>

        {/* Modal */}
        <Card passedArr={modalData} show={show} hideit={()=>{setShow(false)}} />

        </div>:
        <div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Spinner animation="border" variant="danger" />
        </div>
        
    
    )
}

export default Home;