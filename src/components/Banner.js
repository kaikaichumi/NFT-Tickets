import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle, QrCode } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { mintNFT, verifyNFT, nftused, tokenURI ,totalSupply} from "../utils/interact.js";
import QRCodeStyling from "qr-code-styling";
import qr_logo from "../assets/img/qr_logo.png";
import emailjs from "emailjs-com";
import React from 'react';
import { QrReader } from 'react-qr-reader';
import { Email } from "./smtp.js";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image:
  qr_logo,
  dotsOptions: {
    color: "#000000",
    type: "rounded"
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 5
  },
});


export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  // eslint-disable-next-line no-unused-vars
  const [index, setIndex] = useState(1);
  const toRotate = ["BlockChain", "NFT Developer", "Web3 Developer"];
  const period = 2000;

  //qrcode
  const [url, setUrl] = useState("");
  const [fileExt] = useState("png");
  const ref = useRef(null);

  const serviceID = 'default_service';
  const templateID = 'template_3j0swxb';
  const public_key = 'fimjnxCS0kCjv7IoW'

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url
    });
  }, [url]);
  //qrcode url setting
  const onUrlChange = (event) => {
    setUrl(event);
  };

  const onDownloadClick = () => {
    onUrlChange(totalSupplyOfcall());
    qrCode.download({
      extension: fileExt
    });
  };  
  //qrcode
   
  //email
    const email_send = () => {
      
    //   Email.send({
    //     SecureToken : "fcf8dd64-3f34-46cd-9a71-48e852d4c51c",
    //     To : 'karta2398980@gmail.com',
    //     From : "f110110132@nkust.edu.tw",
    //     Subject: "test email",
    //     Body: "123123",
    //     Attachments: 
    //         [{
    //             name: "qr_logo.png",
    //             path: "../assets/img/qr_logo.png"
    //         }]
    // })
    // .then(
    //   message => alert(message)
    // );

      //   emailjs.send(serviceID,templateID,{
      //   from_name: "kaikai",
      //   to_email: "karta2398980@gmail.com",
      //   qr_url: "https://i.imgur.com/KhxV27U.png",
      //   qr_html: '<img src=qr_logo />',
      //   attachments: 
      //       [{
      //           name: "qr_logo.png",
      //           path: "../assets/img/qr_logo.png"
      //       }]
      // },public_key
      //   )
      
   };

  
  //email


  //qrcode 掃描
  const [data, setData] = useState('No result');
  //qrcode 掃描
  

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };
  



  //mintNFT
  const [count, setcount] = useState(1);
  const onMint = async () => {
    setcount(1);
    console.log(count);
    const { status } = await mintNFT(count);
    console.log(status);
    alert(status);
  };

  //verify nft 
  const inputRef = useRef(null);
  var tokenId = "";
  
  const onVerify = async () => {
    // 👇 "inputRef.current.value" is input value
    tokenId = inputRef.current.value;
    if (tokenId < 0 || tokenId > 100) {
      console.log("Please input tokenId for the range 0~99.");
      alert("Please input tokenId for the range 0~99.");
    } else {
      const { status } = await verifyNFT(tokenId);
      console.log(status);
      alert(status);
    }
  };

  //nftused return(uint256)
  const OwnerOfcall = async()=>{
    tokenId = data;
    
    if (tokenId < 0 || tokenId > 100) {
      console.log("Please input tokenId for the range 0~99.");
      alert("Please input tokenId for the range 0~99.");
    } else {
      
      const { status } = await nftused(tokenId);
      console.log(status);
      alert(status);
    }
  
  }
  //totalSupply return(uint256)
  const totalSupplyOfcall = async()=>{
    const { status } = await totalSupply();
    console.log(status);
    alert(parseInt(status.toString())-1);
    return parseInt(status.toString())-1;
  }
  

  //tokenURI
  const tokenURICall = async()=>{
    tokenId = inputRef.current.value;
    if (tokenId < 0 || tokenId > 100) {
      console.log("Please input tokenId for the range 0~99.");
      alert("Please input tokenId for the range 0~99.");
    } else {
      const { status } = await tokenURI(tokenId);
      //console.log(status);
      //alert(status);
      
    fetch(status)
      .then((response) => response.json())
      .then((json) => alert(json.image));
    }
  }

    
  const styles = {
    inputWrapper: {
      margin: "100px 0",
      display: "flex",
      justifyContent: "space-between",
      width: "100%"
    },
    
  };
  




  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                                   
                  
                  <button onClick={onMint}>
                    Mint NFT! <ArrowRightCircle size={30} />
                  </button>
                  
                  <button onClick={OwnerOfcall}>
                    Check the remaining usage
                    <ArrowRightCircle size={30} />
                  </button>
                  <button onClick={onVerify}>
                    Verify NFT Ticket <ArrowRightCircle size={30} />
                  </button>
                  <button onClick={tokenURICall}>
                    View NFT Ticket
                    <ArrowRightCircle size={30} />
                  </button>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className="App">
                <div>
                                
                  
                </div>
                <div ref={ref} />
                <>
                <h4>{data}</h4>
                <QrReader
                  onResult={(result, error) => {
                    if (!!result) {
                      setData(result?.text);
                    }

                    if (!!error) {
                      console.info(error);
                    }
                  }}
                  scanDelay={100}
                  style={{ width: '100%' }}
                />
                
              </>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}


// <button onClick={email_send}>Send email</button> //276
// <div style={styles.inputWrapper}>
// <input value={url} onChange={onUrlChange} style={styles.inputBox} />
// <button onClick={onDownloadClick}>Download</button>
// </div>