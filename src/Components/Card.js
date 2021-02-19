import React,{useState,useEffect} from "react";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "../Styles/home.css"
import $ from "jquery";
import Modal from 'react-bootstrap/Modal'
import Spinner from "react-bootstrap/Spinner";
import CloseIcon from '@material-ui/icons/Close';

function Card(props){

    const [show,setShow] = useState(false);
    const [load,setLoad] = useState(true);
    const [modalData,setModalData] = useState("");

    useEffect(()=>{
     setModalData(props.passedArr);
    
    },[])
   
    
   

    return(
      
     <Modal
      show={props.show}
      onHide={props.hideit}
      
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
     
      <Modal.Body className="modalBody">
      <CloseIcon
      style={{position:"absolute",top:"5%",right:"5%",cursor:"pointer"}}
      onClick={props.hideit}
       />
       {console.log(modalData)}
       <div style={{width:"100%",padding:20}}>
        <div className="sub1">
        <img src={modalData.image} />
        <div className="sub1p1">
        <h4>{modalData.name}</h4>
        <div style={{flexDirection:"row",display:"flex",alignItems:"center"}}>
              
              <div style={modalData.status ==="Alive" ? {width:10,height:10,borderRadius:10,backgroundColor:"green",marginRight:8}: modalData.status ==="Dead" ? {width:10,height:10,borderRadius:10,backgroundColor:"red",marginRight:8}:{width:10,height:10,borderRadius:10,backgroundColor:"gray",marginRight:8}}></div>
              <p style={{marginRight:4}}>{modalData.status}</p>
              <p style={{marginRight:4}}>-</p>
              <p>{modalData.species}</p>
              </div>
        </div>
        </div>
       

       <div className="sub2"></div>

     
        <div className="sub3" style={{marginBottom:20}}>
            <div>
             <p className="sub3subh">Gender</p>
             <p>{modalData.gender}</p>
            </div>
            <div style={{position:"absolute",left:"50%"}}>
             <p className="sub3subh">Location</p>
             {modalData.location ? <p>{modalData.location.name}</p>:null}
            </div>

        </div>

        <div className="sub3">
            <div>
             <p className="sub3subh">Species</p>
             <p>{modalData.species}</p>
            </div>
            <div style={{position:"absolute",left:"50%"}}>
             <p className="sub3subh">Origin</p>
             {modalData.origin ? <p>{modalData.origin.name}</p>:null}
            </div>

        </div>
          </div>
      </Modal.Body>
     
    </Modal>

    
    )
}

export default Card;