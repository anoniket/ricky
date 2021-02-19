import React,{useState,useEffect} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "../Styles/home.css"

import Card from "./Card";

function InfiScroll(props){
 
     console.log(props.smallArr);
     useEffect(()=>{
      setSmallArr(props.smallArr);
     },[props.smallArr])
    //states
    const [dataArr,setDataArr] = useState(props.dataArr);
    const [smallArr,setSmallArr] = useState(props.smallArr);
    const [count,setCount] = useState(1);
    const [hasmoreState,setHasmore] = useState(true);
    const [show,setShow] = useState(false);
    const [modalData,setModalData] = useState(props.modalData);
   
    

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

   


  
    return(
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


        {/* Modal */}
        <Card passedArr={modalData} show={show} hideit={()=>{setShow(false)}} />
      </div>
  
        
    
    )
}

export default InfiScroll;